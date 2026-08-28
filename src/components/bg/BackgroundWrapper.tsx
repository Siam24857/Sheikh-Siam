"use client";

import ThemeAwareLightRays from "./ThemeAwareLightRays";

export default function BackgroundWrapper() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
      {/* Light theme — subtle rays (separate from dark stack) */}
      <div className="absolute inset-0 block dark:hidden h-full w-full">
        <ThemeAwareLightRays className="h-full w-full theme-rays" />
      </div>

      {/* Dark theme — original layout unchanged */}
      <div className="absolute inset-0 opacity-100 dark:opacity-20 transition-opacity duration-1000">
        <div className="hidden dark:block h-full w-full">
          <ThemeAwareLightRays />
        </div>
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-blue-500/5 animate-pulse duration-5000" />
      </div>
    </div>
  );
}
