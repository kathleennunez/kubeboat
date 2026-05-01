import RegistrationForm from "./_components/RegistrationForm";
import ScrollRevealObserver from "./_components/ScrollRevealObserver";

export default function Home() {
  return (
    <div className="overflow-x-hidden font-body text-on-surface selection:bg-primary selection:text-white" data-mode="kubeboat-final">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b-4 border-outline-variant bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
        <div className="font-headline text-xl font-black italic tracking-tighter text-primary sm:text-2xl">KubeBoat</div>
        <div className="hidden items-center gap-8 font-headline text-sm uppercase tracking-widest md:flex">
          <a className="border-b-2 border-dashed border-primary text-primary transition-all duration-75 steps-4 hover:-translate-y-1 hover:text-white" href="#log">
            LOG
          </a>
          <a className="text-on-surface opacity-80 transition-all duration-75 steps-4 hover:-translate-y-1 hover:text-primary" href="#map">
            MAP
          </a>
          <a className="text-on-surface opacity-80 transition-all duration-75 steps-4 hover:-translate-y-1 hover:text-primary" href="#crew">
            CREW
          </a>
          <a className="text-on-surface opacity-80 transition-all duration-75 steps-4 hover:-translate-y-1 hover:text-primary" href="#supporters">
            SUPPORTERS
          </a>
        </div>
        <a
          className="whitespace-nowrap bg-primary px-4 py-2 text-xs font-headline font-bold tracking-wide text-white transition-all duration-75 steps-4 hover:-translate-y-1 hover:bg-white hover:text-background active:translate-y-0.5 sm:px-6 sm:text-sm sm:tracking-widest"
          href="#crew"
        >
          REGISTER
        </a>
      </nav>

      <main className="relative overflow-hidden pb-14 pt-[70px] sm:pb-16 sm:pt-16">
        <div className="retro-grid pointer-events-none absolute inset-0 opacity-40" />

        <section className="relative flex min-h-[calc(100svh-70px)] flex-col items-center justify-center overflow-hidden pb-8 text-center sm:min-h-[100svh] sm:pb-0">
          <div className="pointer-events-none absolute inset-0 z-10 dither-bg opacity-30" />
          <div className="absolute inset-0 h-full w-full">
            <img
              alt="Cinematic pixel art pirate ship"
              className="h-full w-full object-cover object-center opacity-60 grayscale transition-all duration-700 hover:grayscale-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Bceiaol_7gg4rc-z-nuSQ0s9kctXU5ULt1_pjX-b8NmIBAu0JUcDSYtduFJA0un4wENetLNptbtKY9n5n3K_3p_LEdXp9kNnqXUO2lNkgAk2kdPalWemf8ofBI4Gk44OfrP9gno4bwDb7VONxJl1KFs3Qnu65poK_DDFqjBjqUeOG8Bf6AHzGViC7X0J_8htbUw6NrPp4XTWV9LV8dFopwCImDsBwMy-zda7inCNZvodGZsq9VpUp7FPsB2SrqqBiUXSHDJ1oSY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />
          </div>
          <div className="reveal-on-scroll z-20 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 sm:gap-8 sm:py-20" data-reveal>
            <h1 className="pixel-shadow font-headline text-5xl font-black uppercase italic leading-none tracking-tighter text-primary sm:text-6xl md:text-9xl">
              KUBEBOAT
            </h1>
            <p className="mx-auto max-w-2xl px-2 font-headline text-lg font-bold uppercase tracking-wide text-on-surface drop-shadow-lg sm:text-xl sm:tracking-widest md:text-2xl">
              THE UNOFFICIAL KUBECON EU 2027 BOAT PARTY.
            </p>
            <p className="mx-auto max-w-2xl px-2 font-headline text-base font-bold uppercase tracking-wide text-primary drop-shadow-lg sm:text-lg sm:tracking-widest md:text-xl">
              Save the Date 14th March 2027
            </p>
            <div className="flex justify-center gap-4">
              <a
                className="pixel-shadow bg-primary px-6 py-3 font-headline text-base font-black uppercase italic tracking-wide text-white transition-all duration-75 steps-4 hover:-translate-y-1 hover:bg-white hover:text-background sm:px-8 sm:py-4 sm:text-lg sm:tracking-widest"
                href="#crew"
              >
                SECURE YOUR SPOT
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-4xl text-primary">expand_more</span>
          </div>
        </section>

        <section id="log" className="relative z-20 mx-auto mb-16 max-w-5xl scroll-mt-28 px-4 sm:mb-24 sm:px-6">
          <div className="reveal-on-scroll relative border-4 border-outline-variant bg-surface-container-highest p-1" data-reveal>
            <div className="dither-bg border-2 border-primary bg-surface-container-low p-5 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="font-headline text-lg font-bold tracking-widest text-primary">COMMUNITY_LOG</span>
                <div className="h-1 flex-grow bg-outline-variant opacity-30" />
                <span className="text-xs font-bold uppercase text-on-surface opacity-70">V2.027.BARCELONA</span>
              </div>
              <div className="scumm-text font-headline text-xl leading-relaxed sm:text-2xl md:text-3xl">
                "Ahoy, Cloud Navigators! After a day of YAML wrestling and cluster crunching, we&apos;re taking the fleet to the Balearic Sea. No egress fees, just party under the Mediterranean moon."
              </div>
              <div className="mt-8 flex justify-end">
                <a className="flex items-center gap-2 font-headline uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-primary" href="#map">
                  <span>Continue Dialogue</span>
                  <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="map" className="relative z-10 mx-auto mb-20 max-w-6xl scroll-mt-28 px-4 sm:mb-32 sm:px-6">
          <h2 className="reveal-on-scroll mb-8 font-headline text-3xl font-black uppercase italic tracking-tight text-primary sm:mb-12 sm:text-4xl" data-reveal>
            MANIFEST_DETAILS
          </h2>
          <div className="reveal-stagger grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["calendar_today", "DATE", "March 14th 2027"],
              ["schedule", "DURATION", "4 Hours (18:30–22:30)"],
              ["directions_boat", "VESSEL", "Large Catamaran Barcelona Coastline"],
              ["restaurant", "CATERING", "Mediterranean Snacks"],
              ["local_bar", "DRINKS", "Open Bar with soft drinks, cava, wine & beer"],
              ["album", "ENTERTAINMENT", "DJ — House & Lounge Vibes"],
            ].map(([icon, title, value]) => (
              <div
                key={title}
                className="reveal-on-scroll group border-b-4 border-r-4 border-outline-variant bg-surface-container p-4 transition-all duration-75 steps-4 hover:bg-surface-container-highest sm:p-6"
                data-reveal
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-primary transition-transform group-hover:scale-110">
                  {icon}
                </span>
                <h3 className="mb-2 font-headline text-lg font-bold text-primary sm:text-xl">{title}</h3>
                <p className="text-base font-bold uppercase text-on-surface sm:text-lg">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="crew" className="relative z-10 mx-auto mb-20 max-w-4xl scroll-mt-28 px-4 sm:mb-32 sm:px-6">
          <div className="reveal-on-scroll border-4 border-outline-variant bg-surface-container-low p-5 sm:p-8 lg:p-10" data-reveal>
            <h2 className="mb-10 text-center font-headline text-2xl font-black uppercase italic tracking-[0.14em] text-primary sm:text-3xl sm:tracking-[0.3em]">
              ENLIST_on_BOard
            </h2>
            <RegistrationForm />
          </div>
        </section>

        <section id="supporters" className="relative z-10 mx-auto mb-20 max-w-6xl scroll-mt-28 px-4 sm:mb-32 sm:px-6">
          <div className="reveal-on-scroll mb-10 text-center sm:mb-16" data-reveal>
            <h2 className="font-headline text-2xl font-black uppercase italic tracking-wide text-on-surface sm:text-3xl sm:tracking-widest">Sponsors_OF_THE_FLEET</h2>
          </div>
          <div className="reveal-stagger grid grid-cols-2 gap-4 md:grid-cols-4">
            {new Array(4).fill(0).map((_, i) => (
              <div
                key={i}
                className="reveal-on-scroll group flex aspect-video items-center justify-center border-2 border-dashed border-outline-variant bg-surface-container-low transition-all hover:border-primary"
                data-reveal
              >
                <span className="font-headline text-xs tracking-tighter text-on-surface-variant group-hover:text-primary">YOUR_LOGO_HERE</span>
              </div>
            ))}
          </div>
          <div className="reveal-on-scroll mt-10 text-center sm:mt-12" data-reveal>
            <a
              className="inline-block border-2 border-primary px-6 py-3 font-headline text-xs font-bold tracking-wide text-primary transition-colors hover:bg-primary hover:text-white sm:px-8 sm:text-sm sm:tracking-widest"
              href="mailto:phil@thegogrow.ch"
            >
              CONTACT THE CAPTAIN FOR SPONSORSHIP
            </a>
          </div>
        </section>

      </main>

      <footer className="relative z-10 flex w-full flex-col items-center justify-center gap-6 border-t-4 border-outline-variant bg-background px-4 py-10 text-center sm:py-12">
        <div className="mb-4 flex flex-col items-center gap-4">
          <span className="font-headline text-[10px] uppercase tracking-[0.4em] text-on-surface-variant opacity-70">PRESENTED_BY</span>
          <div className="group transition-transform duration-75 hover:scale-105">
            <img
              alt="Rocket Engineers Logo"
              className="h-10 w-auto object-contain brightness-0 invert"
              src="/images/rocket-engineer-logo.png"
            />
          </div>
          <div className="font-headline text-xs font-bold uppercase tracking-[0.2em] text-primary">ROCKET_ENGINEERS</div>
        </div>
        <div className="mt-2 font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">
          KubeBoat is presented by Rocket Engineers
        </div>
        <div className="flex gap-8 font-body text-xs uppercase tracking-tight text-on-surface">
          <a
            className="font-headline text-sm font-bold tracking-[0.16em] text-primary underline decoration-2 underline-offset-4 transition-colors hover:text-white"
            href="/privacy-policy"
          >
            PRIVACY POLICY
          </a>
        </div>
        <div className="font-body text-xs uppercase tracking-tight text-on-surface-variant opacity-40">
          © 1991 NAUTICAL SOFTWORKS - ALL RIGHTS RESERVED
        </div>
      </footer>

      <ScrollRevealObserver />
    </div>
  );
}
