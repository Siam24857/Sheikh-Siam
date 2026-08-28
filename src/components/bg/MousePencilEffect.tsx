"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

interface Point {
  x: number;
  y: number;
  age: number;
}

const MAX_POINTS = 80;
const FADE_FRAMES = 40;

export default function MousePencilEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current.shift();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = resolvedTheme === "dark";
      const color = dark ? "200, 200, 200" : "15, 15, 20";
      const strokeAlpha = dark ? 0.55 : 0.88;
      const lineScale = dark ? 1.5 : 2;

      pointsRef.current = pointsRef.current
        .map((p) => ({ ...p, age: p.age + 1 }))
        .filter((p) => p.age < FADE_FRAMES);

      if (pointsRef.current.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pointsRef.current.length; i++) {
        const p1 = pointsRef.current[i - 1];
        const p2 = pointsRef.current[i];
        const opacity = 1 - p2.age / FADE_FRAMES;

        if (opacity <= 0) continue;

        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (dist > 60) continue;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${color}, ${opacity * strokeAlpha})`;
        ctx.lineWidth = lineScale * opacity;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        mixBlendMode: resolvedTheme === "dark" ? "plus-lighter" : "normal",
      }}
      aria-hidden
    />
  );
}
