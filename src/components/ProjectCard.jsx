import { ACCENT_THEMES } from "@/data/projectsData";
import ProjectPlaceholderGraphic from "./ProjectPlaceholderGraphic";

export default function ProjectCard({ project }) {
  const theme = ACCENT_THEMES[project.accentKey] || ACCENT_THEMES.emerald;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-white/[0.08] dark:bg-[#090d16] dark:shadow-none dark:hover:border-white/[0.16]"
    >
      {/* Top Graphic Placeholder */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-slate-200/80 bg-slate-100 dark:border-white/[0.06] dark:bg-[#05080e]">
        <ProjectPlaceholderGraphic
          type={project.graphicType}
          accentHex={theme.hex}
          title={project.title}
        />

        {/* Project number & Featured badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {project.isFeatured && (
            <span className="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              Flagship
            </span>
          )}
          <span
            className="rounded px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider dark:hidden"
            style={{
              backgroundColor: theme.tagBgLight,
              color: theme.tagTextLight,
            }}
          >
            #{project.projectNumber}
          </span>
          <span
            className="hidden rounded px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider dark:inline-block"
            style={{
              backgroundColor: theme.tagBgDark,
              color: theme.tagTextDark,
            }}
          >
            #{project.projectNumber}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Light category badge */}
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold dark:hidden"
            style={{
              backgroundColor: theme.tagBgLight,
              color: theme.tagTextLight,
            }}
          >
            {project.category}
          </span>
          {/* Dark category badge */}
          <span
            className="hidden rounded-full px-2.5 py-0.5 text-xs font-medium dark:inline-block"
            style={{
              backgroundColor: theme.tagBgDark,
              color: theme.tagTextDark,
            }}
          >
            {project.category}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-stone-400">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: theme.hex }}
            />
            {project.status.type || (project.status.isLiveDeployed ? "Deployed" : "In development")}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-stone-100">
          {project.title}
        </h3>

        {/* Tagline / Plain language overview */}
        <p className="mt-1.5 text-sm font-medium leading-snug text-slate-700 dark:text-stone-200">
          {project.tagline || project.shortDescription}
        </p>

        {/* What it solves & Functionality */}
        <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-stone-300">
          {project.keyFunctionality || project.overview}
        </p>

        {/* Engineering choices */}
        {(project.engineeringChoices || project.capabilities?.[0]) && (
          <div className="mt-3 rounded-md bg-slate-50 p-2.5 text-[11px] leading-relaxed text-slate-600 border border-slate-100 dark:border-white/[0.04] dark:bg-[#070b13] dark:text-stone-400">
            <span className="font-semibold text-slate-800 dark:text-stone-300">
              Key capability:{" "}
            </span>
            {project.engineeringChoices || project.capabilities?.[0]}
          </div>
        )}

        {/* Stack Highlights */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(project.technologies || project.stackHighlights || []).map((tech) => (
            <span
              key={tech}
              className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-stone-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Status & Verification Scope */}
        <div className="mt-5 rounded-lg border border-slate-200/80 bg-slate-50/70 p-3 text-xs dark:border-white/[0.06] dark:bg-[#05080e]/70">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-700 dark:text-stone-300">
              Deployment stage:
            </span>
            <span className="font-mono text-slate-600 dark:text-stone-300">
              {project.status.stage || (project.status.isLiveDeployed ? "Live demo" : "Work in progress")}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-normal dark:text-stone-400">
            {project.status.deployment || project.status.details || project.status.summary}
          </p>
        </div>

        {/* Real Links if configured */}
        <div className="mt-auto pt-4">
          {project.links.github || project.links.liveDemo ? (
            <div className="flex items-center gap-3">
              {project.links.liveDemo && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline dark:text-white"
                >
                  <span>Launch demo</span>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-stone-400 dark:hover:text-white"
                >
                  <span>Source code</span>
                </a>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-stone-400">
              <span>Public link not yet configured</span>
              <span className="font-mono text-[10px]">Local codebase</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
