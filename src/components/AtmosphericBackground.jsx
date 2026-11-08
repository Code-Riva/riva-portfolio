export default function AtmosphericBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* Light Mode Composed Atmospheric Background (Crossfades smoothly with dark layer) */}
      <div className="absolute inset-0 animate-ambient-drift opacity-100 dark:opacity-0 transition-opacity duration-[420ms] ease-in-out pointer-events-none">
        {/* Broad pale blue glow on left */}
        <div
          className="absolute -top-[8%] -left-[5%] h-[750px] w-[750px] rounded-full sm:h-[950px] sm:w-[950px] lg:h-[1100px] lg:w-[1100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 197, 253, 0.10) 45%, rgba(219, 234, 254, 0.04) 65%, transparent 80%)",
          }}
        />

        {/* Soft lilac glow on right */}
        <div
          className="absolute -top-[4%] -right-[5%] h-[750px] w-[750px] rounded-full sm:h-[950px] sm:w-[950px] lg:h-[1100px] lg:w-[1100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(192, 132, 252, 0.16) 0%, rgba(216, 180, 254, 0.10) 45%, rgba(243, 232, 255, 0.04) 65%, transparent 80%)",
          }}
        />

        {/* Subtle pale lilac transition aura across middle */}
        <div
          className="absolute top-[38%] left-[15%] h-[650px] w-[650px] rounded-full sm:h-[850px] sm:w-[850px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224, 231, 255, 0.45) 0%, rgba(238, 242, 255, 0.18) 50%, transparent 75%)",
          }}
        />
      </div>

      {/* Dark Mode Ambient Lighting (Crossfades smoothly with light layer) */}
      <div className="absolute inset-0 animate-ambient-drift opacity-0 dark:opacity-100 transition-opacity duration-[420ms] ease-in-out pointer-events-none">
        {/* Electric blue glow at upper left with smooth broad falloff */}
        <div
          className="absolute -top-[12%] left-[8%] h-[650px] w-[650px] rounded-full sm:h-[850px] sm:w-[850px]"
          style={{
            background:
              "radial-gradient(circle, rgba(79, 124, 255, 0.08) 0%, rgba(79, 124, 255, 0.02) 55%, transparent 75%)",
          }}
        />

        {/* Soft cyan aura at upper right */}
        <div
          className="absolute top-[0%] right-[5%] h-[550px] w-[550px] rounded-full sm:h-[750px] sm:w-[750px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.01) 55%, transparent 75%)",
          }}
        />

        {/* Restrained indigo aura with very low opacity */}
        <div
          className="absolute top-[38%] left-[15%] h-[500px] w-[500px] rounded-full sm:h-[650px] sm:w-[650px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, rgba(99, 102, 241, 0.01) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Sparse, fine structural depth lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] transition-opacity duration-[420ms] ease-in-out">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <line
            x1="0"
            y1="120"
            x2="100%"
            y2="120"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="520"
            x2="100%"
            y2="520"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <line
            x1="25%"
            y1="0"
            x2="25%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 12"
          />
          <line
            x1="75%"
            y1="0"
            x2="75%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 12"
          />
        </svg>
      </div>

      {/* Soft vignette along viewport edges for studio depth (Crossfading) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(245,247,252,0.3)_100%)] opacity-100 dark:opacity-0 transition-opacity duration-[420ms] ease-in-out pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,10,18,0.6)_100%)] opacity-0 dark:opacity-100 transition-opacity duration-[420ms] ease-in-out pointer-events-none" />
    </div>
  );
}
