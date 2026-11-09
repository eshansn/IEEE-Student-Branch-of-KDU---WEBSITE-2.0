import { useEffect, useState, type ReactNode } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import AccordionGallery, { type AccordionGalleryItem } from '../../AccordionGallery';
import BorderGlow from '../../BorderGlow';
import SplitText from '../../SplitText';
import { getEventProject } from './eventProjects';
import ProjectPageLoader from './ProjectPageLoader';

const MINIMUM_LOADER_TIME = 1000;
const SETTLE_TIME = 280;
const IMAGE_TIMEOUT = 12000;

type ProjectLoadState = {
    eventId: string;
    phase: 'loading' | 'settling' | 'ready';
};

const waitForImage = (src?: string) => new Promise<void>((resolve) => {
    if (!src) {
        resolve();
        return;
    }

    const image = new Image();
    let finished = false;
    const timeout = window.setTimeout(finish, IMAGE_TIMEOUT);

    function finish() {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeout);
        image.onload = null;
        image.onerror = null;
        resolve();
    }

    image.onload = () => {
        if (typeof image.decode === 'function') {
            image.decode().catch(() => undefined).finally(finish);
            return;
        }
        finish();
    };
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
        image.onload?.(new Event('load'));
    }
});

const CAREERCAST_FACE_POSITIONS = [
    { x: 0.76, y: 0.34 },
    { x: 0.73, y: 0.3 },
    { x: 0.76, y: 0.28 },
    { x: 0.71, y: 0.29 },
    { x: 0.78, y: 0.3 },
] as const;

const CAREERCAST_EPISODES: AccordionGalleryItem[] = Array.from({ length: 5 }, (_, index) => {
    const episodeNumber = index + 1;
    const paddedEpisodeNumber = String(episodeNumber).padStart(2, '0');
    const focalPoint = CAREERCAST_FACE_POSITIONS[index];

    return {
        image: `/images/projects/events/IEEECareerCast/ep${paddedEpisodeNumber}webcover.png`,
        alt: `IEEE CareerCast episode ${episodeNumber} cover`,
        label: `Episode ${paddedEpisodeNumber}`,
        focalX: focalPoint.x,
        focalY: focalPoint.y,
    };
});

interface EventDetailsPageProps {
    eventSlug?: string;
    beforeProjectNavigation?: ReactNode;
}

const EventDetailsPage = ({ eventSlug, beforeProjectNavigation }: EventDetailsPageProps) => {
    const navigate = useNavigate();
    const { eventSlug: routeSlug } = useParams();
    const event = getEventProject(eventSlug ?? routeSlug ?? '');
    const [loadState, setLoadState] = useState<ProjectLoadState>(() => ({
        eventId: event?.id ?? '',
        phase: 'loading',
    }));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eventSlug, routeSlug]);

    useEffect(() => {
        if (!event) return undefined;

        let active = true;
        let settleTimer: number | undefined;
        const minimumDelay = new Promise<void>((resolve) => {
            window.setTimeout(resolve, MINIMUM_LOADER_TIME);
        });

        setLoadState({ eventId: event.id, phase: 'loading' });

        Promise.all([minimumDelay, waitForImage(event.heroImage)]).then(() => {
            if (!active) return;
            setLoadState({ eventId: event.id, phase: 'settling' });
            settleTimer = window.setTimeout(() => {
                if (active) setLoadState({ eventId: event.id, phase: 'ready' });
            }, SETTLE_TIME);
        });

        return () => {
            active = false;
            if (settleTimer !== undefined) window.clearTimeout(settleTimer);
        };
    }, [event]);

    if (!event) {
        return <Navigate to="/#projects" replace />;
    }

    const isCurrentEvent = loadState.eventId === event.id;
    const pageIsReady = isCurrentEvent && loadState.phase === 'ready';

    if (!pageIsReady) {
        return (
            <ProjectPageLoader
                title={event.title}
                hasCoverImage={Boolean(event.heroImage)}
                working={!isCurrentEvent || loadState.phase === 'loading'}
                phase="resources"
            />
        );
    }

    const isCareerCast = event.id === 'ieee-careercast';
    const isLongTitle = event.title.length > 27;
    const heroBackground = `radial-gradient(circle at 25% 20%, ${event.colors[0]}99 0%, transparent 35%), radial-gradient(circle at 80% 75%, ${event.colors[1]}77 0%, transparent 38%), linear-gradient(135deg, ${event.colors[2]} 0%, #020202 100%)`;
    const highlightBackground = `radial-gradient(circle at top left, rgb(${event.accentRgb} / 0.2), rgb(255 255 255 / 0.04) 45%)`;

    return (
        <div className="min-h-screen bg-black px-6 pb-24 pt-12 text-white sm:px-12 md:px-24">
            <header className="mx-auto mb-12 flex max-w-7xl items-center justify-between gap-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="group relative z-50 flex cursor-pointer items-center gap-2 text-gray-400 transition-colors hover:text-white"
                    aria-label="Go back to the previous page"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:-translate-x-1"
                        aria-hidden="true"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <span className="font-medium">Go Back</span>
                </button>
                <span className="text-right font-mono text-xs uppercase tracking-widest text-gray-500 sm:text-sm">
                    {event.category} / {event.year}
                </span>
            </header>

            <main>
                <section className="mx-auto mb-16 max-w-7xl">
                    <SplitText
                        text={event.title}
                        className={`mb-6 pb-6 text-left font-bold leading-[1.1] text-white ${
                            isLongTitle
                                ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl'
                                : 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl'
                        }`}
                    />
                    <p className="max-w-5xl text-xl leading-relaxed text-gray-400 md:text-2xl">
                        {event.description}
                    </p>
                </section>

                <section className="mx-auto mb-24 max-w-7xl" aria-label={`${event.title} event identity`}>
                    <BorderGlow
                        edgeSensitivity={30}
                        glowColor={event.accentRgb}
                        backgroundColor="#060010"
                        borderRadius={32}
                        glowRadius={50}
                        glowIntensity={0.8}
                        animated
                        colors={event.colors}
                    >
                        <div
                            className="relative z-50 flex aspect-video w-full items-center justify-center overflow-hidden rounded-[28px]"
                            style={{ background: heroBackground }}
                        >
                            {event.heroImage ? (
                                <img
                                    src={event.heroImage}
                                    alt={event.title}
                                    className={`h-full w-full transition-transform duration-700 hover:scale-105 ${
                                        event.heroImageFit === 'cover' ? 'object-cover' : 'object-contain p-8 sm:p-12'
                                    }`}
                                />
                            ) : (
                                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
                                    <div className="absolute -left-24 top-1/2 size-72 -translate-y-1/2 rounded-full border border-white/10" aria-hidden="true" />
                                    <div className="absolute -right-20 top-10 size-60 rounded-full border border-white/10" aria-hidden="true" />
                                    <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-white/55 sm:text-sm">IEEE Student Branch KDU</p>
                                    <h2 className="max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-8xl">
                                        {event.title}
                                    </h2>
                                    <span className="mt-7 rounded-full border border-white/15 bg-white/10 px-5 py-2 font-mono text-sm tracking-widest text-white/80 backdrop-blur">
                                        {event.year}
                                    </span>
                                </div>
                            )}
                        </div>
                    </BorderGlow>
                </section>

                <section className={`mx-auto grid max-w-7xl grid-cols-1 gap-12 border-t border-white/10 pt-12 md:grid-cols-3 ${isCareerCast ? 'mb-20' : 'mb-32'}`}>
                    <div>
                        <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-gray-500">Organized by</h2>
                        <p className="text-xl md:text-2xl">{event.organizer}</p>
                    </div>
                    <div>
                        <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-gray-500">Focus</h2>
                        <p className="text-lg text-gray-400">{event.focus}</p>
                    </div>
                    <div>
                        <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-gray-500">Experience</h2>
                        <p className="text-lg text-gray-400">{event.experience}</p>
                    </div>
                </section>

                {isCareerCast && (
                    <section className="mx-auto mb-32 max-w-7xl" aria-labelledby="careercast-episodes-title">
                        <div className="mb-8 sm:mb-10">
                            <div>
                                <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-purple-300 sm:text-sm">
                                    Conversations that shape careers
                                </p>
                                <h2 id="careercast-episodes-title" className="text-4xl font-bold sm:text-5xl">
                                    Explore the episodes
                                </h2>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-2 shadow-[0_28px_90px_rgba(88,28,135,0.16)] sm:p-3">
                            <AccordionGallery
                                items={CAREERCAST_EPISODES}
                                defaultIndex={0}
                                accentColor="#a855f7"
                                overlayColor="#060010"
                                textColor="#ffffff"
                                height={520}
                                gap={10}
                                radius={22}
                                expandRatio={0.58}
                                orientation="horizontal"
                                duration={0.65}
                                ease="power3.out"
                                tilt={4}
                                stagger={0.05}
                                trigger="hover"
                                showLabels
                                grayscale={false}
                                autoplay
                                interval={4}
                                imageAspectRatio={16 / 9}
                                className="bg-black/20"
                            />
                        </div>
                    </section>
                )}

                <section className="mx-auto mb-32 max-w-7xl">
                    <h2 className="mb-12 text-4xl font-bold">Event Highlights</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {event.highlights.map((highlight) => (
                            <article
                                key={highlight.title}
                                className="rounded-[32px] border border-white/10 p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
                                style={{ background: highlightBackground }}
                            >
                                <h3 className="mb-4 text-2xl font-semibold text-white md:text-3xl">{highlight.title}</h3>
                                <p className="text-lg leading-relaxed text-gray-400">{highlight.desc}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {event.galleryImages && event.galleryImages.length > 0 && (
                    <section className="mx-auto mb-32 max-w-7xl" aria-labelledby="event-gallery-title">
                        <div className="mb-10 max-w-2xl">
                            <p className="mb-3 font-mono text-sm uppercase tracking-[0.24em]" style={{ color: `rgb(${event.accentRgb})` }}>
                                {event.title}
                            </p>
                            <h2 id="event-gallery-title" className="mb-4 text-4xl font-bold sm:text-5xl">Gallery</h2>
                            <p className="text-lg leading-relaxed text-gray-400">Explore the visual story behind the event.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:auto-rows-[18rem] lg:grid-cols-12">
                            {event.galleryImages.map((image) => (
                                <figure
                                    key={image.src}
                                    className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#10071f] shadow-2xl ${image.className}`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 opacity-70" aria-hidden="true" />
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {beforeProjectNavigation && (
                    <div className="-mx-6 sm:-mx-12 md:-mx-24">
                        {beforeProjectNavigation}
                    </div>
                )}

                <nav className="mx-auto mt-16 flex max-w-7xl justify-center border-t border-white/10 pt-12" aria-label="Project navigation">
                    <button
                        type="button"
                        onClick={() => navigate('/#projects')}
                        className="group flex items-center gap-4 text-xl font-medium text-gray-400 transition-all hover:text-white"
                    >
                        View All Projects
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="transition-transform group-hover:translate-x-2"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </nav>
            </main>
        </div>
    );
};

export default EventDetailsPage;
