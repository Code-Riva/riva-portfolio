"use client";

import { useState, useMemo } from "react";
import { CONTACT_CONFIG } from "@/data/contactConfig";

const PROJECT_TYPES = [
  "Website",
  "Web3 app",
  "Smart contract",
  "Other",
];

const SOCIAL_ICONS = {
  GitHub: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  Instagram: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  X: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Telegram: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  ),
  WhatsApp: (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 01-1.26-4.31c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zM9.21 7.2h2.77c1.52 0 2.61 0.92 2.61 2.25 0 0.97-0.56 1.74-1.43 2.06 1.07 0.34 1.74 1.25 1.74 2.39 0 1.49-1.2 2.5-2.85 2.5h-2.83V7.2zm2.44 4.04c0.47 0 0.79-0.27 0.79-0.68 0-0.39-0.33-0.67-0.79-0.67h-1.13v1.35h1.13zm0.23 4.26c0.51 0 0.88-0.3 0.88-0.76 0-0.43-0.37-0.75-0.88-0.75h-1.36v1.52h1.36z" />
    </svg>
  ),
};

const SOCIAL_BRAND_CONFIG = {
  GitHub: {
    card: "hover:border-slate-800 focus-visible:border-slate-800 hover:shadow-[0_4px_20px_-2px_rgba(15,23,42,0.18)] focus-visible:shadow-[0_4px_20px_-2px_rgba(15,23,42,0.18)] hover:bg-slate-50/90 focus-visible:bg-slate-50/90 dark:hover:border-white/35 dark:focus-visible:border-white/35 dark:hover:shadow-[0_4px_24px_-2px_rgba(255,255,255,0.12)] dark:focus-visible:shadow-[0_4px_24px_-2px_rgba(255,255,255,0.12)] dark:hover:bg-white/[0.05] dark:focus-visible:bg-white/[0.05] focus-visible:outline-slate-900 dark:focus-visible:outline-white",
    iconBox: "group-hover:bg-slate-900 group-hover:text-white group-focus-visible:bg-slate-900 group-focus-visible:text-white dark:group-hover:bg-white/20 dark:group-hover:text-white dark:group-focus-visible:bg-white/20 dark:group-focus-visible:text-white",
    title: "group-hover:text-slate-900 group-focus-visible:text-slate-900 dark:group-hover:text-white dark:group-focus-visible:text-white",
    arrow: "group-hover:text-slate-900 group-focus-visible:text-slate-900 dark:group-hover:text-white dark:group-focus-visible:text-white",
  },
  LinkedIn: {
    card: "hover:border-[#0A66C2]/60 focus-visible:border-[#0A66C2] hover:shadow-[0_4px_20px_-2px_rgba(10,102,194,0.22)] focus-visible:shadow-[0_4px_20px_-2px_rgba(10,102,194,0.22)] hover:bg-[#0A66C2]/[0.03] focus-visible:bg-[#0A66C2]/[0.03] dark:hover:border-[#0A66C2]/70 dark:focus-visible:border-[#0A66C2] dark:hover:shadow-[0_4px_24px_-2px_rgba(10,102,194,0.40)] dark:focus-visible:shadow-[0_4px_24px_-2px_rgba(10,102,194,0.40)] dark:hover:bg-[#0A66C2]/[0.08] dark:focus-visible:bg-[#0A66C2]/[0.08] focus-visible:outline-[#0A66C2] dark:focus-visible:outline-[#388FE5]",
    iconBox: "group-hover:bg-[#0A66C2]/10 group-hover:text-[#0A66C2] group-focus-visible:bg-[#0A66C2]/10 group-focus-visible:text-[#0A66C2] dark:group-hover:bg-[#0A66C2]/20 dark:group-hover:text-[#388FE5] dark:group-focus-visible:bg-[#0A66C2]/20 dark:group-focus-visible:text-[#388FE5]",
    title: "group-hover:text-[#0A66C2] group-focus-visible:text-[#0A66C2] dark:group-hover:text-[#388FE5] dark:group-focus-visible:text-[#388FE5]",
    arrow: "group-hover:text-[#0A66C2] group-focus-visible:text-[#0A66C2] dark:group-hover:text-[#388FE5] dark:group-focus-visible:text-[#388FE5]",
  },
  Instagram: {
    card: "hover:border-[#E1306C]/60 focus-visible:border-[#E1306C] hover:shadow-[0_4px_20px_-2px_rgba(225,48,108,0.25),0_0_18px_-3px_rgba(131,58,180,0.20),0_0_12px_-2px_rgba(245,133,41,0.18)] focus-visible:shadow-[0_4px_20px_-2px_rgba(225,48,108,0.25),0_0_18px_-3px_rgba(131,58,180,0.20),0_0_12px_-2px_rgba(245,133,41,0.18)] hover:bg-gradient-to-r hover:from-purple-500/[0.04] hover:via-pink-500/[0.04] hover:to-amber-500/[0.04] focus-visible:bg-gradient-to-r focus-visible:from-purple-500/[0.04] focus-visible:via-pink-500/[0.04] focus-visible:to-amber-500/[0.04] dark:hover:border-[#E1306C]/70 dark:focus-visible:border-[#E1306C] dark:hover:shadow-[0_4px_24px_-2px_rgba(225,48,108,0.40),0_0_20px_-2px_rgba(131,58,180,0.32),0_0_16px_-2px_rgba(245,133,41,0.25)] dark:focus-visible:shadow-[0_4px_24px_-2px_rgba(225,48,108,0.40),0_0_20px_-2px_rgba(131,58,180,0.32),0_0_16px_-2px_rgba(245,133,41,0.25)] dark:hover:from-purple-600/[0.09] dark:hover:via-pink-600/[0.08] dark:hover:to-amber-600/[0.07] dark:focus-visible:from-purple-600/[0.09] dark:focus-visible:via-pink-600/[0.08] dark:focus-visible:to-amber-600/[0.07] focus-visible:outline-[#E1306C] dark:focus-visible:outline-[#FD1D1D]",
    iconBox: "group-hover:bg-gradient-to-tr group-hover:from-[#F58529]/15 group-hover:via-[#DD2A7B]/15 group-hover:to-[#8134AF]/15 group-hover:text-[#E1306C] group-focus-visible:bg-gradient-to-tr group-focus-visible:from-[#F58529]/15 group-focus-visible:via-[#DD2A7B]/15 group-focus-visible:to-[#8134AF]/15 group-focus-visible:text-[#E1306C] dark:group-hover:from-[#F58529]/25 dark:group-hover:via-[#DD2A7B]/25 dark:group-hover:to-[#8134AF]/25 dark:group-hover:text-[#FD1D1D] dark:group-focus-visible:from-[#F58529]/25 dark:group-focus-visible:via-[#DD2A7B]/25 dark:group-focus-visible:to-[#8134AF]/25 dark:group-focus-visible:text-[#FD1D1D]",
    title: "group-hover:bg-gradient-to-r group-hover:from-[#833AB4] group-hover:via-[#FD1D1D] group-hover:to-[#F58529] group-hover:bg-clip-text group-hover:text-transparent group-focus-visible:bg-gradient-to-r group-focus-visible:from-[#833AB4] group-focus-visible:via-[#FD1D1D] group-focus-visible:to-[#F58529] group-focus-visible:bg-clip-text group-focus-visible:text-transparent dark:group-hover:from-[#C13584] dark:group-hover:via-[#E1306C] dark:group-hover:to-[#FCAF45] dark:group-focus-visible:from-[#C13584] dark:group-focus-visible:via-[#E1306C] dark:group-focus-visible:to-[#FCAF45]",
    arrow: "group-hover:text-[#E1306C] group-focus-visible:text-[#E1306C] dark:group-hover:text-[#FD1D1D] dark:group-focus-visible:text-[#FD1D1D]",
  },
  X: {
    card: "hover:border-slate-800 focus-visible:border-slate-800 hover:shadow-[0_4px_20px_-2px_rgba(15,23,42,0.18)] focus-visible:shadow-[0_4px_20px_-2px_rgba(15,23,42,0.18)] hover:bg-slate-50/90 focus-visible:bg-slate-50/90 dark:hover:border-white/35 dark:focus-visible:border-white/35 dark:hover:shadow-[0_4px_24px_-2px_rgba(255,255,255,0.12)] dark:focus-visible:shadow-[0_4px_24px_-2px_rgba(255,255,255,0.12)] dark:hover:bg-white/[0.05] dark:focus-visible:bg-white/[0.05] focus-visible:outline-slate-900 dark:focus-visible:outline-white",
    iconBox: "group-hover:bg-slate-900 group-hover:text-white group-focus-visible:bg-slate-900 group-focus-visible:text-white dark:group-hover:bg-white/20 dark:group-hover:text-white dark:group-focus-visible:bg-white/20 dark:group-focus-visible:text-white",
    title: "group-hover:text-slate-900 group-focus-visible:text-slate-900 dark:group-hover:text-white dark:group-focus-visible:text-white",
    arrow: "group-hover:text-slate-900 group-focus-visible:text-slate-900 dark:group-hover:text-white dark:group-focus-visible:text-white",
  },
  Telegram: {
    card: "hover:border-[#229ED9]/60 focus-visible:border-[#229ED9] hover:shadow-[0_4px_20px_-2px_rgba(34,158,217,0.22)] focus-visible:shadow-[0_4px_20px_-2px_rgba(34,158,217,0.22)] hover:bg-[#229ED9]/[0.03] focus-visible:bg-[#229ED9]/[0.03] dark:hover:border-[#229ED9]/70 dark:focus-visible:border-[#229ED9] dark:hover:shadow-[0_4px_24px_-2px_rgba(34,158,217,0.40)] dark:focus-visible:shadow-[0_4px_24px_-2px_rgba(34,158,217,0.40)] dark:hover:bg-[#229ED9]/[0.08] dark:focus-visible:bg-[#229ED9]/[0.08] focus-visible:outline-[#229ED9] dark:focus-visible:outline-[#38BDF8]",
    iconBox: "group-hover:bg-[#229ED9]/10 group-hover:text-[#229ED9] group-focus-visible:bg-[#229ED9]/10 group-focus-visible:text-[#229ED9] dark:group-hover:bg-[#229ED9]/20 dark:group-hover:text-[#38BDF8] dark:group-focus-visible:bg-[#229ED9]/20 dark:group-focus-visible:text-[#38BDF8]",
    title: "group-hover:text-[#229ED9] group-focus-visible:text-[#229ED9] dark:group-hover:text-[#38BDF8] dark:group-focus-visible:text-[#38BDF8]",
    arrow: "group-hover:text-[#229ED9] group-focus-visible:text-[#229ED9] dark:group-hover:text-[#38BDF8] dark:group-focus-visible:text-[#38BDF8]",
  },
  WhatsApp: {
    card: "hover:border-[#25D366]/60 focus-visible:border-[#25D366] hover:shadow-[0_4px_20px_-2px_rgba(37,211,102,0.22)] focus-visible:shadow-[0_4px_20px_-2px_rgba(37,211,102,0.22)] hover:bg-[#25D366]/[0.03] focus-visible:bg-[#25D366]/[0.03] dark:hover:border-[#25D366]/70 dark:focus-visible:border-[#25D366] dark:hover:shadow-[0_4px_24px_-2px_rgba(37,211,102,0.40)] dark:focus-visible:shadow-[0_4px_24px_-2px_rgba(37,211,102,0.40)] dark:hover:bg-[#25D366]/[0.08] dark:focus-visible:bg-[#25D366]/[0.08] focus-visible:outline-[#25D366] dark:focus-visible:outline-[#25D366]",
    iconBox: "group-hover:bg-[#25D366]/10 group-hover:text-[#1EBE5D] group-focus-visible:bg-[#25D366]/10 group-focus-visible:text-[#1EBE5D] dark:group-hover:bg-[#25D366]/20 dark:group-hover:text-[#25D366] dark:group-focus-visible:bg-[#25D366]/20 dark:group-focus-visible:text-[#25D366]",
    title: "group-hover:text-[#1EBE5D] group-focus-visible:text-[#1EBE5D] dark:group-hover:text-[#25D366] dark:group-focus-visible:text-[#25D366]",
    arrow: "group-hover:text-[#1EBE5D] group-focus-visible:text-[#1EBE5D] dark:group-hover:text-[#25D366] dark:group-focus-visible:text-[#25D366]",
  },
};

export default function ContactSection() {
  const [copyState, setCopyState] = useState("idle"); // "idle" | "success" | "error"
  const [projectType, setProjectType] = useState("");
  const [description, setDescription] = useState("");

  async function handleCopyEmail() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CONTACT_CONFIG.email);
        setCopyState("success");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = CONTACT_CONFIG.email;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopyState(success ? "success" : "error");
      }
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 3000);
    }
  }

  function handleTypeToggle(type) {
    setProjectType((prev) => (prev === type ? "" : type));
  }

  const mailtoUrl = useMemo(() => {
    const subject = projectType
      ? `Project inquiry — ${projectType}`
      : "Project inquiry";

    const bodyParts = [];
    if (projectType) {
      bodyParts.push(`Project type: ${projectType}`);
    }
    if (description.trim()) {
      bodyParts.push(`Description:\n${description.trim()}`);
    }

    const body = bodyParts.join("\n\n");
    return `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}${
      body ? `&body=${encodeURIComponent(body)}` : ""
    }`;
  }, [projectType, description]);

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-b border-slate-200/70 py-24 sm:py-32 dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Heading & Copy */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-950 dark:text-[#DCE6F5]">
            Have a project in mind?
          </h2>
          <p className="mt-3 text-base sm:text-lg lg:text-[18px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Tell me what you’re building and where you need support.
          </p>
        </div>

        {/* Responsive Composition: ~55% Left / ~45% Right on Desktop */}
        <div className="mt-12 flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
          {/* Left Column: Direct Contact & Social Profiles (~55%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            {/* Direct Contact Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none">
              <p className="text-xl sm:text-[22px] lg:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white font-sans break-all sm:break-normal">
                {CONTACT_CONFIG.email}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT_CONFIG.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                  className="btn-primary h-[48px] px-6 text-[15px]"
                >
                  Email me
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  className="inline-flex h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-5 text-[15px] font-medium text-slate-800 shadow-sm transition-all duration-250 hover:bg-slate-50 hover:text-slate-950 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08] dark:hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF]"
                >
                  {copyState === "success" ? (
                    <>
                      <svg
                        className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Copied!
                      </span>
                    </>
                  ) : copyState === "error" ? (
                    <span className="text-rose-600 dark:text-rose-400 font-medium">
                      Copy failed (select text)
                    </span>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4 text-slate-500 dark:text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Accessible live status for screen readers */}
              <span className="sr-only" role="status" aria-live="polite">
                {copyState === "success"
                  ? "Email copied to clipboard"
                  : copyState === "error"
                  ? `Failed to copy email automatically. Please copy manually: ${CONTACT_CONFIG.email}`
                  : ""}
              </span>
            </div>

            {/* Social Profiles (2x2 Grid) */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-950 dark:text-[#DCE6F5]">
                Find me online
              </h3>

              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {CONTACT_CONFIG.socials.map((social) => {
                  const brand =
                    SOCIAL_BRAND_CONFIG[social.name] || SOCIAL_BRAND_CONFIG.GitHub;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] transition-all duration-250 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 motion-reduce:transform-none dark:border-white/[0.06] dark:bg-[#0A0F1A] dark:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${brand.card}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-all duration-250 dark:bg-white/[0.05] dark:text-slate-300 ${brand.iconBox}`}
                        >
                          {SOCIAL_ICONS[social.name]}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-base sm:text-[17px] font-medium text-slate-950 transition-colors duration-250 dark:text-white truncate ${brand.title}`}
                          >
                            {social.name}
                          </p>
                          <p className="text-sm font-normal text-slate-500 dark:text-slate-400 truncate">
                            {social.handle}
                          </p>
                        </div>
                      </div>

                      <svg
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-all duration-250 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transform-none ${brand.arrow}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: "Start a project" Inquiry Panel (~45%) */}
          <div className="w-full lg:w-[45%]">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-[#DCE6F5]">
                Start a project
              </h3>

              {/* A. Project Type Selection */}
              <fieldset className="mt-5">
                <legend className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Project type <span className="font-normal normal-case text-slate-400 dark:text-slate-500">(Optional)</span>
                </legend>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = projectType === type;
                    return (
                      <label
                        key={type}
                        className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 cursor-pointer border text-sm font-medium transition-all duration-250 ease-out select-none focus-within:ring-2 focus-within:ring-[#245BDB] dark:focus-within:ring-[#4F7CFF] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#245BDB] dark:has-[:focus-visible]:ring-[#4F7CFF] ${
                          isSelected
                            ? "border-[#245BDB] bg-[#245BDB]/5 text-[#245BDB] shadow-xs dark:border-[#4F7CFF] dark:bg-[#4F7CFF]/10 dark:text-[#4F7CFF]"
                            : "border-slate-200/80 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.05]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="projectType"
                          value={type}
                          checked={isSelected}
                          onChange={() => setProjectType(type)}
                          onClick={() => handleTypeToggle(type)}
                          className="sr-only"
                        />
                        <span>{type}</span>
                        <span
                          className={`h-2 w-2 rounded-full transition-all duration-200 ${
                            isSelected
                              ? "bg-[#245BDB] scale-100 dark:bg-[#4F7CFF]"
                              : "bg-transparent scale-0"
                          }`}
                          aria-hidden="true"
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* B. Short Description */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="project-description"
                    className="text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    What would you like to build?{" "}
                    <span className="font-normal text-xs text-slate-400 dark:text-slate-500">
                      (Optional)
                    </span>
                  </label>
                  <span
                    className="text-xs text-slate-400 dark:text-slate-500 font-mono"
                    aria-live="polite"
                  >
                    {description.length}/1000
                  </span>
                </div>
                <textarea
                  id="project-description"
                  name="description"
                  rows={4}
                  maxLength={1000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe your idea and the help you need."
                  className="mt-2 w-full rounded-xl border border-slate-200/90 bg-slate-50/50 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-250 focus:border-[#245BDB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#245BDB]/20 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#4F7CFF] dark:focus:bg-[#070A12] dark:focus:ring-[#4F7CFF]/20 resize-y"
                />
              </div>

              {/* C. Primary Action */}
              <div className="mt-6">
                <a
                  href={mailtoUrl}
                  className="btn-primary w-full h-[48px] text-[15px]"
                >
                  Continue via email
                </a>
                <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 font-normal">
                  Opens your email app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
