import { useEffect, useState, type KeyboardEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

import LightRays from '../LightRays';
import BorderGlow from '../BorderGlow';
import BlurText from '../BlurText';
import { eventProjects, type EventProject } from './Projects/eventProjects';

type Project = EventProject;

const projectsData = eventProjects;

const glowSettings = {
    edgeSensitivity: 30,
    glowColor: '10 40 180',
    borderRadius: 16,
    glowRadius: 40,
    glowIntensity: 1,
    coneSpread: 25,
    animated: false,
    colors: ['#000833', '#001a80', '#0033cc'],
};

const ProjectCard = ({ project }: { project: Project }) => (
    <BorderGlow {...glowSettings} backgroundColor="#030712" className="h-full min-w-0">
        <NavLink to={project.route} className="relative z-50 block h-full cursor-pointer">
            <article className="group flex h-full w-full min-w-0 flex-col gap-6 p-5">
                <div className="relative block aspect-video w-full overflow-hidden rounded-[12px] bg-[#111]">
                    {project.cardImage ? (
                        <img
                            src={project.cardImage}
                            alt={project.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div
                            className="relative flex h-full w-full flex-col justify-end overflow-hidden p-5 transition-transform duration-500 group-hover:scale-105"
                            style={{ background: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]} 55%, ${project.colors[2]})` }}
                        >
                            <div className="absolute -right-10 -top-10 size-36 rounded-full border border-white/15" aria-hidden="true" />
                            <div className="absolute right-12 top-8 size-16 rounded-full border border-white/10" aria-hidden="true" />
                            <span className="relative mb-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/60">IEEE SB KDU</span>
                            <strong className="relative max-w-[90%] text-2xl font-black leading-tight text-white">{project.title}</strong>
                        </div>
                    )}
                    <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/65 px-3 py-1 font-mono text-xs text-white backdrop-blur">
                        {project.year}
                    </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 px-1">
                    <div className="group/link relative flex w-fit items-center gap-3">
                        <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">{project.title}</h3>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 shrink-0 text-white transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                            aria-hidden="true"
                        >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </div>

                    <p className="line-clamp-3 max-w-full break-words text-base leading-relaxed text-gray-400 [overflow-wrap:anywhere] sm:text-lg">
                        {project.description}
                    </p>
                </div>
            </article>
        </NavLink>
    </BorderGlow>
);

const CompletedProjectSearch = ({ projects }: { projects: Project[] }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const normalizedQuery = query.trim().toLowerCase();
    const suggestions = projects
        .filter((project) => (
            !normalizedQuery
            || project.title.toLowerCase().includes(normalizedQuery)
            || project.category.toLowerCase().includes(normalizedQuery)
            || project.year.includes(normalizedQuery)
        ))
        .slice(0, 6);

    const selectProject = (project: Project) => {
        setIsOpen(false);
        setQuery(project.title);
        navigate(project.route);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
            return;
        }

        if (!isOpen || suggestions.length === 0) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((current) => (current + 1) % suggestions.length);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((current) => (current <= 0 ? suggestions.length - 1 : current - 1));
        } else if (event.key === 'Enter') {
            event.preventDefault();
            selectProject(suggestions[activeIndex] ?? suggestions[0]);
        }
    };

    return (
        <div className="relative z-[70] w-full sm:w-80">
            <label htmlFor="completed-project-search" className="sr-only">Search completed projects</label>
            <div className="flex h-11 items-center gap-3 rounded-2xl border border-blue-500/30 bg-[#030712]/95 px-4 shadow-[0_0_30px_rgba(0,51,204,0.16)] backdrop-blur-xl transition focus-within:border-blue-400/70 focus-within:shadow-[0_0_35px_rgba(37,99,235,0.25)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-blue-400" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                    id="completed-project-search"
                    type="search"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setActiveIndex(0);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search completed events"
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-controls="completed-project-suggestions"
                    aria-autocomplete="list"
                    aria-activedescendant={isOpen && suggestions[activeIndex] ? `completed-project-option-${suggestions[activeIndex].id}` : undefined}
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500 [&::-webkit-search-cancel-button]:hidden"
                />
            </div>

            {isOpen && (
                <div
                    id="completed-project-suggestions"
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+0.65rem)] max-h-80 w-full min-w-[18rem] overflow-y-auto rounded-2xl border border-blue-500/25 bg-[#030712]/98 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(0,51,204,0.12)] backdrop-blur-2xl"
                >
                    {suggestions.length > 0 ? suggestions.map((project, index) => (
                        <button
                            id={`completed-project-option-${project.id}`}
                            key={project.id}
                            type="button"
                            role="option"
                            aria-selected={activeIndex === index}
                            onMouseDown={(event) => event.preventDefault()}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => selectProject(project)}
                            className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left transition ${
                                activeIndex === index ? 'bg-blue-600/20 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className="min-w-0">
                                <span className="block truncate text-sm font-semibold">{project.title}</span>
                                <span className="mt-1 block truncate font-mono text-[0.65rem] uppercase tracking-wider text-slate-500">
                                    {project.category} · {project.year}
                                </span>
                            </span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-blue-400" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    )) : (
                        <p className="px-3 py-5 text-center text-sm text-slate-500">No completed events found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const ProjectSection = ({ title, projects }: { title: string; projects: Project[] }) => {
    const visibleCards = 3;
    const lastSlide = Math.max(0, projects.length - visibleCards);
    const hasCarousel = projects.length > visibleCards;
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionTitleId = `${title.toLowerCase().replace(/\s+/g, '-')}-title`;
    const isCompletedSection = title === 'Completed Projects';

    useEffect(() => {
        if (!hasCarousel) {
            setCurrentSlide(0);
            return undefined;
        }

        const timer = window.setInterval(() => {
            setCurrentSlide((current) => (current >= lastSlide ? 0 : current + 1));
        }, 4500);

        return () => window.clearInterval(timer);
    }, [hasCarousel, lastSlide]);

    const previousSlide = () => {
        setCurrentSlide((current) => (current <= 0 ? lastSlide : current - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((current) => (current >= lastSlide ? 0 : current + 1));
    };

    return (
        <section className={title === 'Ongoing Projects' ? 'mt-10' : 'mt-24'} aria-labelledby={sectionTitleId}>
            <div className="mb-8 flex flex-wrap items-center gap-4">
                <h3 id={sectionTitleId} className="shrink-0 text-xl font-bold tracking-tight">
                    {title}
                </h3>
                <div className="h-px flex-grow bg-white/10" />

                {isCompletedSection ? (
                    <CompletedProjectSearch projects={projects} />
                ) : hasCarousel && (
                    <div className="hidden gap-2 md:flex" aria-label={`${title} carousel controls`}>
                        <button
                            type="button"
                            onClick={previousSlide}
                            className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
                            aria-label={`Previous ${title.toLowerCase()}`}
                        >
                            <span aria-hidden="true">&#8592;</span>
                        </button>
                        <button
                            type="button"
                            onClick={nextSlide}
                            className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
                            aria-label={`Next ${title.toLowerCase()}`}
                        >
                            <span aria-hidden="true">&#8594;</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:hidden">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className="min-w-0"
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>

            <div className="hidden overflow-hidden md:block">
                <div
                    className="flex w-full gap-6 transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(calc(-${currentSlide} * (((100% - 3rem) / 3) + 1.5rem)))` }}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="min-w-0 shrink-0 basis-[calc((100%_-_3rem)/3)]">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>

            {hasCarousel && (
                <div className="mt-7 hidden items-center justify-center gap-2 md:flex" aria-label={`${title} slides`}>
                    {Array.from({ length: lastSlide + 1 }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Show ${title.toLowerCase()} slide ${index + 1}`}
                            aria-current={currentSlide === index ? 'true' : undefined}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentSlide === index ? 'w-7 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

const Projects = () => {
    const ongoingProjects = projectsData.filter((project) => project.status === 'ongoing');
    const completedProjects = projectsData.filter((project) => project.status === 'completed');

    return (
        <section id="projects" className="relative min-h-screen w-full max-w-full scroll-mt-20 overflow-hidden bg-[#00040a] pb-24 text-white">
            <div className="pointer-events-none absolute inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse
                    mouseInfluence={0.05}
                    className="opacity-20"
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
                    <div className="mb-8">
                        <BorderGlow {...glowSettings} backgroundColor="#030712" borderRadius={999}>
                            <div className="px-6 py-2">
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-blue-500">Projects</span>
                            </div>
                        </BorderGlow>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <BlurText
                            text="WHAT WE HAVE DONE"
                            delay={200}
                            animateBy="words"
                            direction="bottom"
                            className="w-full justify-center text-center text-5xl font-bold tracking-tighter text-white drop-shadow-2xl sm:text-6xl md:text-8xl"
                        />
                    </div>

                    <p className="mx-auto mt-2 max-w-2xl text-lg font-light leading-relaxed text-gray-400">
                        Showcasing our commitment to innovation, collaboration, and technological advancement through impactful projects.
                    </p>
                </div>

                <ProjectSection title="Ongoing Projects" projects={ongoingProjects} />
                <ProjectSection title="Completed Projects" projects={completedProjects} />
            </div>
        </section>
    );
};

export default Projects;
