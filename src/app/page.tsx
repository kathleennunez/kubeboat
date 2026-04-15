import RegistrationForm from "./_components/RegistrationForm";

export default function Home() {
  return (
    <div className="font-body text-on-surface selection:bg-primary selection:text-white" data-mode="connect">
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b-4 border-outline-variant bg-background/95 px-6 py-4 backdrop-blur-sm">
        <div className="font-headline text-2xl font-black italic tracking-tighter text-primary">KubeBoat</div>
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
          <a className="text-on-surface opacity-80 transition-all duration-75 steps-4 hover:-translate-y-1 hover:text-primary" href="#gear">
            GEAR
          </a>
        </div>
        <a className="bg-primary px-6 py-2 font-headline text-sm font-bold tracking-widest text-white transition-all duration-75 steps-4 hover:-translate-y-1 hover:bg-white hover:text-background active:translate-y-0.5" href="#crew">
          REGISTER
        </a>
      </nav>

      <main className="relative overflow-hidden pt-16">
        <div className="retro-grid pointer-events-none absolute inset-0 opacity-40" />

        <section className="relative flex min-h-[1024px] flex-col items-center justify-center overflow-hidden text-center">
          <div className="pointer-events-none absolute inset-0 z-10 dither-bg opacity-30" />
          <div className="absolute inset-0 h-full w-full">
            <img
              alt="Cinematic pixel art pirate ship"
              className="h-full w-full object-cover object-center opacity-60 grayscale transition-all duration-700 hover:grayscale-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8Bceiaol_7gg4rc-z-nuSQ0s9kctXU5ULt1_pjX-b8NmIBAu0JUcDSYtduFJA0un4wENetLNptbtKY9n5n3K_3p_LEdXp9kNnqXUO2lNkgAk2kdPalWemf8ofBI4Gk44OfrP9gno4bwDb7VONxJl1KFs3Qnu65poK_DDFqjBjqUeOG8Bf6AHzGViC7X0J_8htbUw6NrPp4XTWV9LV8dFopwCImDsBwMy-zda7inCNZvodGZsq9VpUp7FPsB2SrqqBiUXSHDJ1oSY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />
          </div>
          <div className="z-20 mx-auto max-w-4xl px-4 py-20">
            <h1 className="pixel-shadow mb-4 font-headline text-7xl font-black uppercase italic leading-none tracking-tighter text-primary md:text-9xl">
              KUBEBOAT
            </h1>
            <p className="mx-auto mb-12 max-w-2xl font-headline text-xl font-bold uppercase tracking-widest text-on-surface drop-shadow-lg md:text-2xl">
              The unofficial KubeCon EU 2027 boat party.
            </p>
            <div className="flex justify-center gap-4">
              <a className="pixel-shadow bg-primary px-8 py-4 font-headline text-lg font-black uppercase italic tracking-widest text-white transition-all duration-75 steps-4 hover:-translate-y-1 hover:bg-white hover:text-background" href="#crew">
                SECURE YOUR spot
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-4xl text-primary">expand_more</span>
          </div>
        </section>

        <section id="log" className="relative z-20 mx-auto mb-24 max-w-5xl scroll-mt-28 px-6">
          <div className="relative border-4 border-outline-variant bg-surface-container-highest p-1">
            <div className="dither-bg border-2 border-primary bg-surface-container-low p-8">
              <div className="mb-6 flex items-center gap-4">
                <span className="font-headline text-lg font-bold tracking-widest text-primary">COMMUNITY_LOG</span>
                <div className="h-1 flex-grow bg-outline-variant opacity-30" />
                <span className="text-xs font-bold uppercase text-on-surface opacity-70">V2.027.BARCELONA</span>
              </div>
              <div className="scumm-text font-headline text-2xl leading-relaxed md:text-3xl">
                "Ahoy, Cloud Navigators! After a day of YAML wrestling and cluster crunching, we&apos;re taking the fleet to the Balearic Sea. No egress fees, just high-bandwidth party under the Mediterranean moon."
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

        <section id="map" className="relative z-10 mx-auto mb-32 max-w-6xl scroll-mt-28 px-6">
          <h2 className="mb-12 font-headline text-4xl font-black uppercase italic tracking-tight text-primary">MANIFEST_DETAILS</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["calendar_today", "DATE", "March 14th 2027"],
              ["schedule", "DURATION", "4 Hours (18:30–22:30)"],
              ["directions_boat", "VESSEL", "Large Catamaran Barcelona Coast"],
              ["restaurant", "CATERING", "Mediterranean Snacks"],
              ["local_bar", "DRINKS", "Open Bar with soft drinks, cava, wine & beer"],
              ["album", "ENTERTAINMENT", "DJ — House & Lounge Vibes"],
            ].map(([icon, title, value]) => (
              <div
                key={title}
                className="group border-b-4 border-r-4 border-outline-variant bg-surface-container p-6 transition-all duration-75 steps-4 hover:bg-surface-container-highest"
              >
                <span className="material-symbols-outlined mb-4 text-4xl text-primary transition-transform group-hover:scale-110">
                  {icon}
                </span>
                <h3 className="mb-2 font-headline text-xl font-bold text-primary">{title}</h3>
                <p className="text-lg font-bold uppercase text-on-surface">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mb-32 max-w-6xl px-6">
          <div className="relative overflow-hidden border-4 border-dashed border-primary bg-surface-container p-12">
            <div className="pointer-events-none absolute inset-0 opacity-10 grayscale brightness-200 invert">
              <img
                alt="Treasure Map Background"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXTrryjg5OB2jDoc3l63sZplcXu4nJHatijBa_eT4GNu8F3B9WfE5WeVewmjoORTcLN0yEMSNqjMM_E6ReIEQtB0ZGaW5ZEQMXG9FX3513iyzIjjAFAZgwwbUCfLg4BVknio71QooY8jwME1n4jppd2BpMsTbhNBhUo2s6SlvzeQV5DPVRzUtHy4aO02CDRL2zpEeNy8uZqc9eybbOGicD9QpEmwKAoJk0k_CsOMH45aSvoHk9iUSQB7sjXoBrMU6ZEixgrvi0PYU"
              />
            </div>
            <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 font-headline text-4xl font-black uppercase italic text-primary">THE_NO_SHOW_TAX</h2>
                <div className="space-y-4 text-lg leading-relaxed text-on-surface">
                  <p>A small commitment DEPOSIT fee is required to secure your slot. This fee is fully refunded once you cross the gangplank or if you cancel 48 hours prior.</p>
                  <p className="font-bold text-primary">Ghost ships help no one. Pay the tax, join the crew.</p>
                </div>
              </div>
              <div className="border-4 border-primary bg-surface-container-highest p-8 shadow-[8px_8px_0px_rgba(255,51,51,0.2)]">
                <div className="mb-2 text-6xl font-black text-primary">€25</div>
                <div className="text-sm font-bold uppercase tracking-widest text-on-surface">Fully Refundable Deposit</div>
                <div className="mt-8 border-t border-dashed border-primary/30 pt-8">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      <span className="text-xs uppercase text-on-surface-variant">Instant Confirmation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      <span className="text-xs uppercase text-on-surface-variant">Auto-Refund Post-Party</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="crew" className="relative z-10 mx-auto mb-32 max-w-4xl scroll-mt-28 px-6">
          <div className="border-4 border-outline-variant bg-surface-container-low p-10">
            <h2 className="mb-10 text-center font-headline text-3xl font-black uppercase italic tracking-[0.3em] text-primary">ENLIST_on_BOard</h2>
            <RegistrationForm />
          </div>
        </section>

        <section id="gear" className="relative z-10 mx-auto mb-32 max-w-6xl scroll-mt-28 px-6">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-3xl font-black uppercase italic tracking-widest text-on-surface">Sponsors_OF_THE_FLEET</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {new Array(4).fill(0).map((_, i) => (
              <div key={i} className="group flex aspect-video items-center justify-center border-2 border-dashed border-outline-variant bg-surface-container-low transition-all hover:border-primary">
                <span className="font-headline text-xs tracking-tighter text-on-surface-variant group-hover:text-primary">YOUR_LOGO_HERE</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a className="inline-block border-2 border-primary px-8 py-3 font-headline text-sm font-bold tracking-widest text-primary transition-colors hover:bg-primary hover:text-white" href="#">
              CONTACT THE CAPTAIN FOR SPONSORSHIP
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 flex w-full flex-col items-center justify-center gap-6 border-t-4 border-outline-variant bg-background py-12 text-center">
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
          <a className="opacity-60 transition-none hover:text-primary hover:opacity-100" href="#">
            CREDITS
          </a>
          <a className="opacity-60 transition-none hover:text-primary hover:opacity-100" href="#">
            SUPPORT
          </a>
          <a className="opacity-60 transition-none hover:text-primary hover:opacity-100" href="#">
            LEGAL
          </a>
        </div>
        <div className="font-body text-xs uppercase tracking-tight text-on-surface-variant opacity-40">
          © 1991 NAUTICAL SOFTWORKS - ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
}
