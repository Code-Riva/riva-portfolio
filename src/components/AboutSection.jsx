"use client";

import { useState } from "react";
import { CONTACT_CONFIG } from "@/data/contactConfig";
import CvModal from "./CvModal";

export default function AboutSection() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  function handleCvClick() {
    if (CONTACT_CONFIG.cv.url) {
      window.open(CONTACT_CONFIG.cv.url, "_blank", "noopener,noreferrer");
    } else {
      setCvModalOpen(true);
    }
  }

  return (
    <>
      <section
        id="about"
        className="scroll-mt-24 border-t border-b border-[#CBD8EC] border-b-slate-200/70 py-24 sm:py-32 dark:border-t-white/[0.06] dark:border-b-white/[0.06]"
      >
        <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
          {/* Desktop 65/35 Split Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] lg:grid-rows-[auto_1fr] gap-x-10 lg:gap-x-14 items-start">
            {/* Row 1 Left: Section Heading */}
            <div className="lg:col-span-1 lg:row-span-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-slate-950 dark:text-white">
                A little about me
              </h2>
            </div>

            {/* Row 2 Left: Bio and Freelance Availability */}
            <div className="mt-8 flex flex-col justify-between lg:col-span-1 lg:row-start-2">
              <p className="text-xl sm:text-2xl leading-[1.65] text-slate-800 dark:text-slate-200 font-normal">
                I’m Qamra Ariva—Riva for short. I build Web3 interfaces and smart-contract applications with a focus on clarity, usability, and thoughtful implementation.
              </p>

              <div className="mt-8 border-t border-slate-200/80 pt-6 dark:border-white/[0.08]">
                <p className="text-base sm:text-[17px] leading-[1.65] text-slate-600 dark:text-slate-400 font-normal">
                  Available for Web3 development, frontend engineering, and AI/coding freelance inquiries.
                </p>
              </div>
            </div>

            {/* Row 2 Right: Compact Education Card (Aligned with the start of the bio on desktop; stacked on mobile) */}
            <div className="mt-8 lg:mt-8 lg:col-start-2 lg:row-start-2">
              <div className="rounded-2xl border border-[#BCCEE8] bg-[#F4F7FB]/90 p-6 sm:p-7 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.04)] dark:border-white/[0.12] dark:bg-[#0A0F1A] dark:shadow-none">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#245BDB]/10 text-[#245BDB] dark:bg-[#4F7CFF]/15 dark:text-[#4F7CFF]">
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
                        d="M4.26 10.147a60.438 60.438 0 0 1-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-5.25 6.557c0 1.25.97 2.25 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-3.675"
                      />
                    </svg>
                  </span>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Education
                  </h3>
                </div>

                <div className="mt-4">
                  <p className="text-base sm:text-[17px] font-semibold text-slate-950 dark:text-white leading-snug">
                    Computer Science undergraduate
                  </p>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 font-normal">
                    Universitas Padjadjaran · 2021–present
                  </p>
                </div>

                <div className="mt-6 border-t border-[#CBD8EC]/70 pt-5 dark:border-white/[0.08]">
                  <button
                    type="button"
                    onClick={handleCvClick}
                    className="inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08] dark:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF]"
                  >
                    <span>{CONTACT_CONFIG.cv.label}</span>
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Unavailable State Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </>
  );
}
