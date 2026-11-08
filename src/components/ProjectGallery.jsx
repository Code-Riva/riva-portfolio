import Link from "next/link";
import { PROJECTS_DATA, ACCENT_THEMES } from "@/data/projectsData";
import ProjectMediaPreview from "./ProjectMediaPreview";

function ProjectTitle({ title, as: Tag = "h3", className = "" }) {
  return (
    <Tag className={`project-title-hover ${className}`}>
      <span className="project-title-base">{title}</span>
      <span aria-hidden="true" className="project-title-gradient">
        {title}
      </span>
    </Tag>
  );
}

export default function ProjectGallery() {
  const leadProject = PROJECTS_DATA.find((p) => p.isLead) || PROJECTS_DATA[0];
  const pairProjects = PROJECTS_DATA.filter((p) => p.isFeaturedPair);
  const moreProjects = PROJECTS_DATA.filter((p) => !p.isLead && !p.isFeaturedPair);

  const leadTheme = ACCENT_THEMES[leadProject.accentKey] || ACCENT_THEMES.crimson;

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-slate-200/70 py-24 sm:py-32 dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-slate-950 dark:text-[#DCE6F5]">
            Projects
          </h2>
          <p className="mt-3 text-base sm:text-lg lg:text-[18px] leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
            Wallets, dashboards, and smart-contract applications.
          </p>
        </div>

        {/* Featured Showcase: Lead Composition (Dragoon's Relics) */}
        <div className="mt-12 sm:mt-14">
          <Link
            href={`/projects/${leadProject.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none dark:hover:border-white/[0.18] motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF]"
          >
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Media Preview (7 columns on desktop) */}
              <div className="lg:col-span-7">
                <ProjectMediaPreview
                  project={leadProject}
                  accentHex={leadTheme.hex}
                />
              </div>

              {/* Lead Content (5 columns on desktop) */}
              <div className="flex flex-col justify-center lg:col-span-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] sm:text-[14px] font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                    {leadProject.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Work in progress
                  </span>
                </div>

                <ProjectTitle
                  title={leadProject.title}
                  as="h3"
                  className="mt-2 text-2xl sm:text-[28px] lg:text-[32px] font-semibold tracking-tight text-slate-950 dark:text-white"
                />

                <p className="mt-3 text-base sm:text-[16px] lg:text-[17px] leading-[1.6] text-slate-600 dark:text-slate-300 font-normal">
                  {leadProject.shortDescription}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                  <span>View project</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
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
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Featured Showcase: Balanced Pair (Dispatch & Vault) */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {pairProjects.map((project) => {
            const theme = ACCENT_THEMES[project.accentKey] || ACCENT_THEMES.blue;
            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06),0_2px_6px_-1px_rgba(15,23,42,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none dark:hover:border-white/[0.18] motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF]"
              >
                <div>
                  <ProjectMediaPreview
                    project={project}
                    accentHex={theme.hex}
                  />

                  <div className="mt-6 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] sm:text-[14px] font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                        {project.category}
                      </span>
                      {project.status.isLiveDeployed ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Live demo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Work in progress
                        </span>
                      )}
                    </div>

                    <ProjectTitle
                      title={project.title}
                      as="h3"
                      className="mt-1.5 text-2xl sm:text-[26px] font-semibold tracking-tight text-slate-950 dark:text-white"
                    />

                    <p className="mt-2.5 text-base sm:text-[16px] lg:text-[17px] leading-[1.6] text-slate-600 dark:text-slate-300 font-normal">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                  <span>View project</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
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
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quieter "More projects" Section */}
        <div className="mt-20 sm:mt-24">
          <div className="border-t border-slate-200/70 pt-10 dark:border-white/[0.06]">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-[#DCE6F5]">
              More projects
            </h3>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 font-normal">
              Explore more websites, dashboards, and Web3 applications.
            </p>
          </div>

          {/* Desktop 6-column grid: 3 cards row 1 (2 cols each), 2 cards row 2 (centered, 2 cols each) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-7">
            {moreProjects.map((project, idx) => {
              const theme = ACCENT_THEMES[project.accentKey] || ACCENT_THEMES.emerald;
              const isSecondRowFirst = idx === 3;
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none dark:hover:border-white/[0.18] motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245BDB] dark:focus-visible:outline-[#4F7CFF] lg:col-span-2 ${
                    isSecondRowFirst ? "lg:col-start-2" : ""
                  }`}
                >
                  <div>
                    <ProjectMediaPreview
                      project={project}
                      accentHex={theme.hex}
                    />

                    <div className="mt-5 flex flex-col">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400">
                          {project.category}
                        </span>
                        {project.status.isLiveDeployed ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                            <span className="h-1 w-1 rounded-full bg-emerald-500" />
                            Live demo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-300">
                            <span className="h-1 w-1 rounded-full bg-amber-500" />
                            Work in progress
                          </span>
                        )}
                      </div>
                      <ProjectTitle
                        title={project.title}
                        as="h4"
                        className="mt-1.5 sm:mt-2 text-xl sm:text-[21px] font-semibold tracking-tight text-slate-900 dark:text-white"
                      />
                      <p className="mt-2 text-sm sm:text-[15px] leading-[1.6] text-slate-600 dark:text-slate-300 font-normal">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-[14px] font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                    <span>View project</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
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
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
