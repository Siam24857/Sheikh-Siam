"use client";

import ThemeAwareLightRays from "./ThemeAwareLightRays";
import InteractiveHeroCanvas from "./WaveArcs";
import ScrollWaveField from "./ScrollWaveField";

export default function BackgroundWrapper() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
      {/* Scroll Wave Field background animation */}
      <div className="absolute inset-0 h-full w-full">
        <ScrollWaveField
          background="#0A0A0A"
          colors={["#5A4AE0", "#F2D98A"]}
          density={145}
          dotSize={2}
          scatter={108}
          cameraHeight={50}
          wave={{ waveSpeed: 250, waveHeight: 200, waveLength: 2070 }}
          tilt={{ rollStart: 0, tiltStart: 12 }}
          cursor={{ cursorLift: 45, cursorRadius: 25 }}
          transition={{ mass: 1, type: "spring", delay: 0, damping: 60, stiffness: 800 }}
        />
      </div>

      {/* Wave Arcs background animation */}
      <div className="absolute inset-0 h-full w-full">
        <InteractiveHeroCanvas
          backgroundColor="#0A0A0A"
          lineColor="rgba(255, 255, 255, 0.08)"
          lineWidth={1.2}
          lineCount={60}
          speed={4}
          glow={12}
          interactive={true}
        />
      </div>

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
