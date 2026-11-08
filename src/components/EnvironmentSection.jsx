"use client";

import { useState, useRef } from "react";

// Crisp inline SVG icons for each demonstrated technology
function NextJsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" className="fill-slate-900 dark:fill-white" />
      <path
        d="M15.5 16.5L8.5 7.5H7v9h1.75V10.2l6.2 8.1c.18-.08.36-.17.55-.26v-1.54z"
        className="fill-white dark:fill-slate-950"
      />
      <rect x="14.75" y="7.5" width="1.75" height="4.5" className="fill-white dark:fill-slate-950" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#0284C7] dark:text-[#38BDF8]" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" />
      <g stroke="currentColor" strokeWidth="1.25" fill="none">
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#0284C7] dark:text-[#38BDF8]" fill="currentColor" aria-hidden="true">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  );
}

function SolidityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-slate-800 dark:text-slate-200" fill="currentColor" aria-hidden="true">
      <path opacity="0.65" d="M12 2L6 8h6l6-6h-6z" />
      <path opacity="0.85" d="M6 8l6 6 6-6H6z" />
      <path opacity="0.45" d="M12 14l-6 6h12l-6-6z" />
      <path opacity="0.95" d="M12 14l6-6v12l-6-6z" />
    </svg>
  );
}

function ViemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#245BDB] dark:text-[#4F7CFF]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l8 12 8-12" />
      <path d="M8.5 6l3.5 5.5 3.5-5.5" strokeOpacity="0.55" />
    </svg>
  );
}

function WagmiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#0284C7] dark:text-[#22D3EE]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8l3.5 9L10 10l3.5 7L17 8l3.5 9" />
    </svg>
  );
}

function EthereumIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#627EEA]" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5L4.5 12.33 12 16.5l7.5-4.17L12 1.5z" opacity="0.65" />
      <path d="M12 1.5v15l7.5-4.17L12 1.5z" />
      <path d="M12 17.75l-7.5-4.25L12 22.5l7.5-9L12 17.75z" opacity="0.65" />
      <path d="M12 17.75v4.75l7.5-9-7.5 4.25z" />
    </svg>
  );
}

function OpenZeppelinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#4E5EE4] dark:text-[#818CF8]" fill="currentColor" aria-hidden="true">
      <path d="M4.5 4.5h15l-3.5 6.5h-8l-3.5-6.5z" opacity="0.8" />
      <path d="M4.5 19.5h15l-3.5-6.5h-8l-3.5 6.5z" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}

function HardhatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#F59E0B]" fill="currentColor" aria-hidden="true">
      <path d="M12 4a8 8 0 0 0-8 8v2h16v-2a8 8 0 0 0-8-8z" />
      <rect x="2" y="14" width="20" height="2.5" rx="1" />
      <path d="M10.5 4.2A8.04 8.04 0 0 0 4 12h3.5c.3-3.2 1.3-5.8 3-7.8z" opacity="0.4" />
      <rect x="11" y="4" width="2" height="10" opacity="0.6" />
    </svg>
  );
}

function PlaywrightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#16A34A] dark:text-[#22C55E]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="10" r="6" />
      <circle cx="7.5" cy="9" r=".8" fill="currentColor" />
      <circle cx="10.5" cy="9" r=".8" fill="currentColor" />
      <path d="M7.5 12a2 2 0 0 0 3 0" />
      <path d="M14 6.5a6 6 0 0 1 1 11.5" />
      <circle cx="16.5" cy="11.5" r=".8" fill="currentColor" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 text-[#F05032]" fill="currentColor" aria-hidden="true">
      <path d="M21.6 10.9L13.1 2.4a1.8 1.8 0 0 0-2.5 0L8.2 4.8l3.1 3.1a2.1 2.1 0 0 1 2.7 2.7l3 3a2.1 2.1 0 0 1 2.6 2.6l4-4a1.8 1.8 0 0 0 0-2.5zM6.9 6.1L2.4 10.6a1.8 1.8 0 0 0 0 2.5l8.5 8.5a1.8 1.8 0 0 0 2.5 0l2.4-2.4-3.1-3.1a2.1 2.1 0 0 1-2.7-2.7L6.9 6.1z" />
    </svg>
  );
}

const CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend",
    sentence: "Responsive websites and interfaces built for clear, usable experiences.",
    tools: [
      { name: "Next.js", Icon: NextJsIcon },
      { name: "React", Icon: ReactIcon },
      { name: "Tailwind CSS", Icon: TailwindIcon },
      { name: "Three.js" },
    ],
  },
  {
    id: "web3",
    name: "Web3",
    sentence: "Wallet connections, on-chain data, and smart-contract interactions.",
    tools: [
      { name: "Solidity", Icon: SolidityIcon },
      { name: "viem", Icon: ViemIcon },
      { name: "wagmi", Icon: WagmiIcon },
      { name: "Ethereum", Icon: EthereumIcon },
      { name: "OpenZeppelin", Icon: OpenZeppelinIcon },
    ],
  },
  {
    id: "testing",
    name: "Testing & Tooling",
    sentence: "Contract tests, browser checks, version control, and local development environments.",
    tools: [
      { name: "Hardhat", Icon: HardhatIcon },
      { name: "Playwright", Icon: PlaywrightIcon },
      { name: "Git", Icon: GitIcon },
      { name: "Docker" },
    ],
  },
];

export default function EnvironmentSection() {
  const [activeTabId, setActiveTabId] = useState("frontend");
  const tabRefs = useRef([]);

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeTabId) || CATEGORIES[0];

  function handleKeyDown(e, currentIndex) {
    let targetIndex = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      targetIndex = (currentIndex + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      targetIndex = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = CATEGORIES.length - 1;
    }

    if (targetIndex !== null) {
      setActiveTabId(CATEGORIES[targetIndex].id);
      if (tabRefs.current[targetIndex]) {
        tabRefs.current[targetIndex].focus();
      }
    }
  }

  return (
    <section
      id="stack"
      className="scroll-mt-20 sm:scroll-mt-24 border-b border-slate-200/70 py-20 sm:py-28 dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold tracking-tight text-slate-950 dark:text-[#DCE6F5]">
            Built with the right tools.
          </h2>
          <p className="mt-2.5 text-base sm:text-[17px] lg:text-[18px] leading-[1.65] font-normal text-slate-600 dark:text-slate-300">
            The technologies behind my Web3 projects.
          </p>
        </div>

        {/* Compact Interactive Category Selector (Tabs) */}
        <div className="mt-8 sm:mt-10">
          <div
            role="tablist"
            aria-label="Technology stack categories"
            aria-orientation="horizontal"
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {CATEGORIES.map((cat, idx) => {
              const isSelected = cat.id === activeTabId;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={`tab-${cat.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTabId(cat.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 text-[15px] sm:text-[16px] font-medium transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF] ${
                    isSelected
                      ? "border border-[#245BDB] bg-[#245BDB] text-white shadow-sm shadow-[#245BDB]/20 dark:border-[#4F7CFF] dark:bg-[#4F7CFF] dark:text-slate-950 dark:shadow-none"
                      : "border border-slate-200/90 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.08] dark:hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Shared Content Panel */}
          <div
            key={activeCategory.id}
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            tabIndex={0}
            className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05)] transition-opacity duration-300 ease-out motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none dark:focus-visible:outline-[#4F7CFF] min-h-[190px] sm:min-h-[175px] lg:min-h-[160px]"
          >
            {/* Short Capability Sentence */}
            <p className="text-base sm:text-[17px] leading-[1.65] font-normal text-slate-700 dark:text-slate-200">
              {activeCategory.sentence}
            </p>

            {/* Tidy Grid of Tool Tiles (Informational tiles, consistent size, naturally bounded) */}
            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {activeCategory.tools.map((tool) => {
                const Icon = tool.Icon;
                return (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 sm:p-4 select-none dark:border-white/[0.06] dark:bg-white/[0.03] min-h-[52px] sm:min-h-[60px]"
                  >
                    {Icon ? <Icon /> : null}
                    <span className="text-[15px] sm:text-[16px] font-medium text-slate-900 dark:text-slate-100">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
