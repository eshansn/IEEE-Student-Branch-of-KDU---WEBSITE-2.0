import ThoughtLine from '../../ThoughtLine';

interface ProjectPageLoaderProps {
    title?: string;
    hasCoverImage?: boolean;
    working?: boolean;
    phase?: 'route' | 'resources';
}

const ProjectPageLoader = ({
    title,
    hasCoverImage = false,
    working = true,
    phase = 'route',
}: ProjectPageLoaderProps) => {
    const loadingLabel = phase === 'route'
        ? 'Opening project…'
        : hasCoverImage
            ? 'Loading cover image…'
            : 'Preparing project page…';
    const steps = phase === 'route'
        ? ['Opening project page', 'Loading project information']
        : hasCoverImage
            ? ['Project information ready', working ? 'Loading cover image' : 'Cover image ready']
            : ['Project information ready', working ? 'Preparing page layout' : 'Page layout ready'];

    return (
        <div
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#00040a] px-6 text-white"
            aria-busy={working}
            aria-label={working ? `Loading ${title ?? 'project'}` : `${title ?? 'Project'} ready`}
        >
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.16),transparent_38%)]"
                aria-hidden="true"
            />
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] px-7 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-9">
                <p className="mb-5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue-400">
                    IEEE Student Branch KDU
                </p>
                <ThoughtLine
                    label={loadingLabel}
                    doneLabel="Project ready"
                    steps={steps}
                    working={working}
                    collapseOnSettle={false}
                    color="#f8fafc"
                    glyphColor="#60a5fa"
                    fontSize={17}
                    breathPeriod={1.35}
                    shimmerDuration={1.45}
                    settleDuration={240}
                    settleBlur={1.5}
                    showTimer
                    className="max-w-full"
                />
            </div>
        </div>
    );
};

export default ProjectPageLoader;
