import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS_DATA, ACCENT_THEMES } from "@/data/projectsData";
import ProjectPlaceholderGraphic from "@/components/ProjectPlaceholderGraphic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtmosphericBackground from "@/components/AtmosphericBackground";

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found · Riva",
    };
  }

  return {
    title: `${project.title} · Qamra Ariva (Riva)`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const theme = ACCENT_THEMES[project.accentKey] || ACCENT_THEMES.emerald;

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Ambient background */}
      <AtmosphericBackground />

      {/* Foreground Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1 py-12 sm:py-20">
          <div className="mx-auto max-w-[1040px] px-6 sm:px-8">
            {/* Return Link */}
            <div>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#245BDB] dark:text-slate-400 dark:hover:text-[#4F7CFF]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                <span>Back to selected work</span>
              </Link>
            </div>

            {/* Project Header */}
            <header className="mt-8">
              <span className="text-xs font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                {project.category}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {project.title}
              </h1>
              <p className="mt-4 text-lg sm:text-[19px] leading-[1.65] text-slate-600 dark:text-slate-300 font-normal max-w-3xl">
                {project.shortDescription}
              </p>
            </header>

            {/* Large Preview */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-2 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-[#0A0F1A] dark:shadow-none">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 dark:border-white/[0.06] dark:bg-[#070b14]">
                <ProjectPlaceholderGraphic
                  type={project.graphicType}
                  accentHex={theme.hex}
                  title={project.title}
                />
              </div>
            </div>

            {/* Editorial Overview Block */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                Overview
              </h2>
              <p className="mt-3 text-base sm:text-[17px] leading-[1.65] text-slate-600 dark:text-slate-300 font-normal">
                {project.overview}
              </p>
            </div>

            {/* Up to Three Capabilities */}
            <div className="mt-12 border-t border-slate-200/70 pt-10 dark:border-white/[0.06]">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                Key capabilities
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {project.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.04)] dark:border-white/[0.06] dark:bg-[#0A0F1A] dark:shadow-none"
                  >
                    <span className="font-mono text-xs font-medium text-[#245BDB] dark:text-[#4F7CFF]">
                      0{idx + 1}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
                      {cap}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Technologies */}
            <div className="mt-12 border-t border-slate-200/70 pt-10 dark:border-white/[0.06]">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                Technologies
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:shadow-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation & Deployment Status */}
            <div className="mt-12 border-t border-slate-200/70 pt-10 dark:border-white/[0.06]">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                Status & verification
              </h2>
              <div className="mt-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-white/[0.06] dark:bg-[#0A0F1A] dark:shadow-none">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.hex }}
                  />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {project.status.summary}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {project.status.deployment}
                </p>
              </div>

              {/* Show repository/demo links only when real URLs exist */}
              {project.links.github || project.links.liveDemo ? (
                <div className="mt-6 flex flex-wrap gap-4">
                  {project.links.liveDemo && (
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary gap-2 px-6 py-2.5 text-sm"
                    >
                      <span>Launch live demo</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-slate-200"
                    >
                      <span>View source code</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>Work in progress — public repository and deployment pending final verification.</span>
                </div>
              )}
            </div>

            {/* Bottom Actions: Return to work + Discuss a similar project / Go to Project */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/70 pt-8 dark:border-white/[0.06]">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#245BDB] dark:text-slate-400 dark:hover:text-[#4F7CFF]"
              >
                ← Back to selected work
              </Link>

              {project.status.isLiveDeployed && project.links.liveDemo ? (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary h-[46px] px-6 text-sm"
                >
                  Go to Project →
                </a>
              ) : (
                <Link
                  href="/#contact"
                  className="btn-primary h-[46px] px-6 text-sm"
                >
                  Discuss a similar project
                </Link>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
