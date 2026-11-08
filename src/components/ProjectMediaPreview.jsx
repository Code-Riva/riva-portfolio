import ProjectPlaceholderGraphic from "./ProjectPlaceholderGraphic";

export default function ProjectMediaPreview({
  project,
  accentHex,
  className = "aspect-[16/10]",
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-[#070b14] ${className}`}
    >
      {/* Illustrative Graphic Fallback (Clean preview surface without nested borders) */}
      <div className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none">
        <ProjectPlaceholderGraphic
          type={project.graphicType}
          accentHex={accentHex}
          title={project.title}
        />
      </div>

      {/* Subtle ambient gradient overlay on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentHex}10 0%, transparent 75%)`,
        }}
      />
    </div>
  );
}
