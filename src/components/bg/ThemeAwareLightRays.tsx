"use client";

import { useTheme } from "next-themes";
import LightRays from "./LightRays";
import { useMounted } from "@/hooks/use-mounted";

interface ThemeAwareLightRaysProps {
  raysOrigin?:
    | "top-center"
    | "top-left"
    | "top-right"
    | "right"
    | "left"
    | "bottom-center"
    | "bottom-right"
    | "bottom-left";
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

export default function ThemeAwareLightRays({
  raysOrigin = "top-center",
  raysSpeed = 1.2,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.1,
  distortion = 0.03,
  className = "",
}: ThemeAwareLightRaysProps) {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  // Determine the current theme
  const currentTheme = resolvedTheme || theme;

  // Theme-specific configurations
  const themeConfig = {
    light: {
      raysColor: "#2a2a2a",
      fadeDistance: 0.5,
      saturation: 0.3,
    },
    dark: {
      raysColor: "#ffffff", // White rays for dark background
      fadeDistance: 0.8, // Medium fade for balancec effect
      saturation: 0.7, // Higher saturation for more impact
    },
  };

  const config =
    currentTheme === "light" ? themeConfig.light : themeConfig.dark;

  return (
    <div className={className}>
      <LightRays
        raysOrigin={raysOrigin}
        raysColor={config.raysColor}
        raysSpeed={raysSpeed}
        lightSpread={lightSpread}
        rayLength={rayLength}
        followMouse={followMouse}
        mouseInfluence={mouseInfluence}
        noiseAmount={noiseAmount}
        distortion={distortion}
        fadeDistance={config.fadeDistance}
        saturation={config.saturation}
        pulsating={false}
      />
    </div>
  );
}
