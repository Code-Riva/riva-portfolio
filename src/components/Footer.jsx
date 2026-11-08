import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/70 bg-white/40 py-10 transition-colors dark:border-white/[0.06] dark:bg-[#070A12]/40">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-6 text-center sm:flex-row sm:px-8 sm:text-left">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Independent Portfolio Demo — by Qamra Ariva.
        </p>

        <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
          <Link
            href="/#projects"
            className="transition hover:text-slate-950 dark:hover:text-white"
          >
            Work
          </Link>
          <Link
            href="/#services"
            className="transition hover:text-slate-950 dark:hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/#stack"
            className="transition hover:text-slate-950 dark:hover:text-white"
          >
            Stack
          </Link>
          <Link
            href="/#about"
            className="transition hover:text-slate-950 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            href="/#hero"
            className="inline-flex items-center gap-1 font-medium text-[#245BDB] transition hover:underline dark:text-[#4F7CFF]"
          >
            <span>Back to top</span>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
