import HeroOrbitalVisual from "./HeroOrbitalVisual";

export default function Hero() {
  return (
    <section
      id="hero"
      className="scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32"
    >
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Identity, Offer & Actions (~580px max-width) */}
          <div className="lg:col-span-7 max-w-[580px]">
            {/* Eyebrow: Sentence case, medium weight, normal tracking */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#245BDB] dark:bg-[#4F7CFF]" />
              <p className="text-sm font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                Riva · Web3 Developer
              </p>
            </div>

            {/* Heading: Weight 600, responsive sizing with second line scaled to ~81% */}
            <h1 className="mt-5">
              <span className="block text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-[-0.02em] leading-[1.1] text-slate-950 dark:text-[#DCE6F5]">
                Turning{" "}
                <span className="bg-gradient-to-r from-[#1E40AF] via-[#0284C7] to-[#0F766E] bg-clip-text text-transparent dark:from-[#4F7CFF] dark:via-[#22D3EE] dark:to-[#06B6D4]">
                  Web3
                </span>{" "}
                ideas
              </span>
              <span className="block mt-1 sm:mt-2 text-[30px] sm:text-[40px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.15] bg-gradient-to-r from-[#3B82F6] via-[#0284C7] to-[#0EA5E9] bg-clip-text text-transparent dark:from-[#93C5FD] dark:via-[#7DD3FC] dark:to-[#A5F3FC]">
                into usable products.
              </span>
            </h1>

            {/* Description: 18px body, 1.65 line height */}
            <p className="mt-6 text-base sm:text-[18px] leading-[1.65] font-normal text-slate-600 dark:text-slate-300 max-w-[540px]">
              I build wallet-connected apps, smart-contract interfaces, and integrations with blockchain infrastructure.
            </p>

            {/* Actions: 50px height, medium weight */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="btn-primary h-[50px] px-7 text-[15px]"
              >
                Discuss your project
              </a>

              <a
                href="#projects"
                className="inline-flex h-[50px] items-center justify-center rounded-xl border border-slate-200/90 bg-white px-7 text-[15px] font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:shadow-none dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                Explore my work
              </a>
            </div>

            {/* Understated Status Line */}
            <div className="mt-7 flex items-center gap-2.5 text-[14px] font-normal text-slate-500 dark:text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span>Available for freelance projects</span>
            </div>
          </div>

          {/* Right Column: Abstract Orbital Composition */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <HeroOrbitalVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
