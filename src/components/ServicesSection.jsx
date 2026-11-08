"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { PROJECTS_DATA, ACCENT_THEMES } from "@/data/projectsData";
import ProjectMediaPreview from "./ProjectMediaPreview";

const SERVICES = [
  {
    id: "websites-dashboards",
    title: "Websites & dashboards",
    benefit: "Make your product clear with responsive websites and interactive dashboards.",
    projectSlug: "market-dashboard",
    projectTitle: "Dragoon Market",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zm3 0h.008v.008H8.25V6zm3 0h.008v.008h-.008V6z"
        />
      </svg>
    ),
  },
  {
    id: "wallet-integration",
    title: "Wallet integration",
    benefit: "Let users connect their wallets and view on-chain balances.",
    projectSlug: "violet-wallet",
    projectTitle: "Dragoon’s Wallet",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        />
      </svg>
    ),
  },
  {
    id: "wallet-sign-in",
    title: "Wallet sign-in",
    benefit: "Let users sign in with their Ethereum wallet instead of a password.",
    projectSlug: "dragoons-gate",
    projectTitle: "Dragoon’s Gate",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
    ),
  },
  {
    id: "token-creation",
    title: "Token creation",
    benefit: "Give users a guided interface to configure and deploy ERC-20 tokens.",
    projectSlug: "dragoons-blacksmith",
    projectTitle: "Dragoon’s Blacksmith",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m6-6H6"
        />
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "nft-minting-experiences",
    title: "NFT minting experiences",
    benefit: "Showcase your NFT collection and let visitors mint with their wallets.",
    projectSlug: "dragoons-relics",
    projectTitle: "Dragoon’s Relics",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
  },
  {
    id: "batch-token-distribution",
    title: "Batch token distribution",
    benefit: "Send tokens to multiple recipients in one transaction.",
    projectSlug: "dragoons-dispatch",
    projectTitle: "Dragoon’s Dispatch",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    ),
  },
  {
    id: "token-vesting",
    title: "Token vesting",
    benefit: "Show when tokens unlock and let beneficiaries claim them.",
    projectSlug: "dragoons-vault",
    projectTitle: "Dragoon’s Vault",
    icon: (
      <svg
        className="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef([]);

  const currentService = SERVICES[selectedIndex];
  const project =
    PROJECTS_DATA.find((p) => p.slug === currentService.projectSlug) ||
    PROJECTS_DATA[0];
  const theme = ACCENT_THEMES[project.accentKey] || ACCENT_THEMES.blue;

  function handleKeyDown(e, index) {
    let nextIndex = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % SERVICES.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + SERVICES.length) % SERVICES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = SERVICES.length - 1;
    }

    if (nextIndex !== null) {
      setSelectedIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  const displayProjectTitle = currentService.projectTitle || project.title;

  return (
    <section
      id="services"
      className="scroll-mt-24 border-b border-slate-200/70 py-20 sm:py-28 dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-slate-950 dark:text-white">
            What I can build for you
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-[1.65] text-slate-600 dark:text-slate-400 font-normal">
            Choose a service. See it in action.
          </p>
        </div>

        {/* Interactive Service Selector Composition (Desktop: ~38% Left / ~62% Right in single stretched grid row) */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] items-stretch gap-8 lg:gap-10">
          {/* Left Column: 7 Distinct Service Selectors */}
          <div
            role="tablist"
            aria-label="Service options"
            aria-orientation="vertical"
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-7 gap-2 sm:gap-2.5 lg:gap-2.5 h-full"
          >
            {SERVICES.map((svc, idx) => {
              const isSelected = selectedIndex === idx;
              const isLastTab = idx === 6;
              return (
                <button
                  key={svc.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`service-tab-${svc.id}`}
                  aria-selected={isSelected}
                  aria-controls="service-preview-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`group relative flex items-center justify-between gap-3.5 rounded-xl px-4 py-2.5 sm:px-4.5 sm:py-2.5 lg:px-5 lg:py-2.5 min-h-[58px] sm:min-h-[60px] lg:min-h-0 h-full text-left transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245BDB] dark:focus-visible:ring-[#4F7CFF] ${
                    isLastTab ? "sm:col-span-2 lg:col-span-1" : ""
                  } ${
                    isSelected
                      ? "border border-[#245BDB]/50 bg-white shadow-sm dark:border-[#4F7CFF]/50 dark:bg-[#0D1424]"
                      : "border border-slate-200/80 bg-white/40 hover:border-slate-300 hover:bg-white/80 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <span
                      className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected
                          ? "bg-[#245BDB]/10 text-[#245BDB] dark:bg-[#4F7CFF]/15 dark:text-[#4F7CFF]"
                          : "bg-slate-100 text-slate-500 group-hover:text-slate-700 dark:bg-white/[0.04] dark:text-slate-400 dark:group-hover:text-slate-200"
                      }`}
                    >
                      {svc.icon}
                    </span>
                    <span
                      className={`text-base sm:text-[17px] lg:text-[17px] leading-[1.3] transition-colors break-words ${
                        isSelected
                          ? "text-slate-950 dark:text-white font-semibold"
                          : "text-slate-700 group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white font-medium"
                      }`}
                    >
                      {svc.title}
                    </span>
                  </div>

                  {/* Restrained Selected Indicator */}
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full transition-all duration-200 ${
                      isSelected
                        ? "bg-[#245BDB] scale-100 dark:bg-[#4F7CFF]"
                        : "bg-transparent scale-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Shared Project-Preview Panel */}
          <div
            role="tabpanel"
            id="service-preview-panel"
            aria-labelledby={`service-tab-${currentService.id}`}
            className="service-preview-card w-full min-w-0 flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] transition-all duration-200 motion-reduce:transition-none dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none h-full"
          >
            <div
              key={currentService.id}
              className="service-preview-fade flex flex-1 flex-col justify-between min-h-0"
            >
              {/* Project Visual */}
              <ProjectMediaPreview
                project={project}
                accentHex={theme.hex}
                className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:flex-1 lg:min-h-0"
              />

              {/* Project Name, Benefit, & Actions */}
              <div className="mt-5 shrink-0 flex flex-col gap-3.5 sm:gap-4 border-t border-slate-100 pt-4 sm:pt-5 dark:border-white/[0.05]">
                <div>
                  <h3 className="project-title-hover text-xl sm:text-[22px] lg:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    <span className="project-title-base">{displayProjectTitle}</span>
                    <span aria-hidden="true" className="project-title-gradient">
                      {displayProjectTitle}
                    </span>
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-base sm:text-[17px] leading-[1.6] text-slate-600 dark:text-slate-300 font-normal">
                    {currentService.benefit}
                  </p>
                </div>

                <div className="flex items-center pt-1 sm:pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="service-explore-link inline-flex items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-[14px] sm:text-[15px] font-medium text-slate-900 transition-all duration-200 hover:bg-slate-200/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.14] dark:focus-visible:outline-[#4F7CFF]"
                  >
                    <span>Explore project</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
