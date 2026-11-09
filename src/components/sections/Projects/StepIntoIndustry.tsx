import EventDetailsPage from './EventDetailsPage';

const partnerLogos = [
	'/images/projects/Step into industry/1.png',
	'/images/projects/Step into industry/image 2.png',
	'/images/projects/Step into industry/Greentel mobile .JPG 2.png',
	'/images/projects/Step into industry/UMIDIGI logo new 2.png',
	'/images/projects/Step into industry/image 2-1.png',
	'/images/projects/Step into industry/OIP 2.png',
	'/images/projects/Step into industry/image 2-2.png',
	'/images/projects/Step into industry/Perl-Bay-3D-Logo-Vertical (4) 2.png',
	'/images/projects/Step into industry/lseg_strapline_logo_blue_rgb (1) 3.png',
	'/images/projects/Step into industry/ESlankalogo 3.png',
	'/images/projects/Step into industry/IMG_0294-removebg-preview 3.png',
	'/images/projects/Step into industry/WhatsApp Image 2026-01-24 at 8.35.52 AM 2.png',
	'/images/projects/Step into industry/Group 275.png',
	'/images/projects/Step into industry/Vector-scaled 3.png',
	'/images/projects/Step into industry/images (1) 2.png',
	'/images/projects/Step into industry/main logo blue 1.png',
	'/images/projects/Step into industry/Nagarro Vertical Light_page-0001 1 1.png',
	'/images/projects/Step into industry/asyncdot-logo-black 1.png',
	'/images/projects/Step into industry/Copy of GDG Sri Lanka Logo 3.png',
	'/images/projects/Step into industry/Official Logo 2.png',
] as const;

const StepIntoIndustryPartners = () => (
	<section className="overflow-hidden border-t border-white/10 bg-[#050505] py-20 text-white" aria-labelledby="step-into-industry-partners">
		<style>{`
			@keyframes step-into-industry-logo-loop {
				from { transform: translateX(0); }
				to { transform: translateX(-50%); }
			}

			.step-into-industry-logo-track {
				animation: step-into-industry-logo-loop 32s linear infinite;
			}

			.step-into-industry-logo-track:hover,
			.step-into-industry-logo-track:focus-within {
				animation-play-state: paused;
			}

			@media (prefers-reduced-motion: reduce) {
				.step-into-industry-logo-track {
					animation: none;
				}
			}
		`}</style>

		<div className="mx-auto mb-10 max-w-7xl px-6 sm:px-12 md:px-24">
			<p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-sky-400">Step Into Industry</p>
			<h2 id="step-into-industry-partners" className="text-4xl font-bold sm:text-5xl">Our Partners</h2>
			<p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
				The organisations and communities helping connect students with industry.
			</p>
		</div>

		<div className="relative w-full overflow-hidden" aria-label="Step Into Industry partners">
			<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050505] to-transparent sm:w-40" aria-hidden="true" />
			<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050505] to-transparent sm:w-40" aria-hidden="true" />
			<div className="step-into-industry-logo-track flex w-max focus-within:outline-none" tabIndex={0}>
				{[...partnerLogos, ...partnerLogos].map((logo, index) => (
					<div
						key={`${logo}-${index}`}
						className="mx-3 flex h-32 w-52 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white px-5 transition-colors hover:border-sky-400 sm:mx-4 sm:h-36 sm:w-60 sm:px-6"
					>
						<img src={logo} alt={`Step Into Industry partner ${(index % partnerLogos.length) + 1} logo`} className="h-auto w-auto max-h-20 max-w-full object-contain" loading="lazy" />
					</div>
				))}
			</div>
		</div>
	</section>
);

const StepIntoIndustry = () => (
	<EventDetailsPage
		eventSlug="step-into-industry"
		beforeProjectNavigation={<StepIntoIndustryPartners />}
	/>
);

export default StepIntoIndustry;
