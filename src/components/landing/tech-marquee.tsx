"use client";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiRedux,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiSocketdotio,
  SiPrisma,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiGithub,
  SiLinux,
  SiVercel,
  SiFigma,
  SiN8N,
  SiPostman,
  SiJsonwebtokens,
} from "react-icons/si";

const techIcons = [
  { icon: <SiNextdotjs />, name: "NEXT.JS", color: "#000000" },
  { icon: <SiReact />, name: "REACT.JS", color: "#61DAFB" },
  { icon: <SiTypescript />, name: "TYPESCRIPT", color: "#3178C6" },
  { icon: <SiJavascript />, name: "JAVASCRIPT", color: "#F7DF1E" },
  { icon: <SiTailwindcss />, name: "TAILWIND CSS", color: "#06B6D4" },
  { icon: <SiShadcnui />, name: "SHADCN UI", color: "#000000" },
  { icon: <SiRedux />, name: "REDUX", color: "#764ABC" },
  { icon: <SiHtml5 />, name: "HTML", color: "#E34F26" },
  { icon: <SiCss />, name: "CSS", color: "#1572B6" },
  { icon: <SiNodedotjs />, name: "NODE.JS", color: "#339933" },
  { icon: <SiExpress />, name: "EXPRESS.JS", color: "#000000" },
  { icon: <SiNestjs />, name: "NESTJS", color: "#E0234E" },
  { icon: <SiPython />, name: "PYTHON", color: "#3776AB" },
  { icon: <SiMongodb />, name: "MONGODB", color: "#47A248" },
  { icon: <SiPostgresql />, name: "POSTGRESQL", color: "#336791" },
  { icon: <SiRedis />, name: "REDIS", color: "#DC382D" },
  { icon: <SiSocketdotio />, name: "SOCKET.IO", color: "#000000" },
  { icon: <SiPrisma />, name: "PRISMA", color: "#2D3748" },
  { icon: <SiDocker />, name: "DOCKER", color: "#2496ED" },
  { icon: <SiGithubactions />, name: "CI/CD", color: "#2088FF" },
  { icon: <SiGit />, name: "GIT", color: "#F05032" },
  { icon: <SiGithub />, name: "GITHUB", color: "#000000" },
  { icon: <SiLinux />, name: "LINUX", color: "#FCC624" },
  { icon: <SiVercel />, name: "VERCEL", color: "#000000" },
  { icon: <SiFigma />, name: "FIGMA", color: "#F24E1E" },
  { icon: <SiN8N />, name: "N8N", color: "#EA4B71" },
  { icon: <SiGithubactions />, name: "GITHUB ACTIONS", color: "#2088FF" },
  { icon: <SiPostman />, name: "POSTMAN", color: "#FF6C37" },
  { icon: <SiJsonwebtokens />, name: "JWT", color: "#000000" },
  { icon: <span className="text-xs font-bold">SEO</span>, name: "SEO", color: "#22c55e" },
];

export function TechMarquee() {
  const repeatedIcons = [...techIcons, ...techIcons, ...techIcons];

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const contentWidthRef = useRef(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateWidth = () => {
      contentWidthRef.current = Math.round(track.scrollWidth / 3) || 1;
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    let raf: number;
    const tick = (time: number) => {
      if (!draggingRef.current) {
        const dt = lastTimeRef.current
          ? (time - lastTimeRef.current) / 1000
          : 0;
        lastTimeRef.current = time;
        const third = contentWidthRef.current;
        offsetRef.current -= (third / 40) * dt;
        offsetRef.current = ((offsetRef.current % third) - third) % third;
        track.style.transform = `translateX(${offsetRef.current}px)`;
      } else {
        lastTimeRef.current = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    setIsDragging(true);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const third = contentWidthRef.current;
    const dx = e.clientX - dragStartXRef.current;
    let next = dragStartOffsetRef.current + dx;
    next = ((next % third) - third) % third;
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${next}px)`;
    }
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
    lastTimeRef.current = 0;
    setIsDragging(false);
  };

  return (
    <div className="w-[calc(100%+2rem)] md:w-full -mx-4 md:mx-0 overflow-hidden py-4 relative max-w-[100vw]">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={trackRef}
        className={`flex w-max whitespace-nowrap select-none will-change-transform ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ transform: "translateX(0px)" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {repeatedIcons.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-3 mx-3 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-all duration-300 group/item"
            draggable={false}
          >
            <div
              className="text-2xl transition-all duration-300 group-hover/item:scale-110 flex-shrink-0"
              style={{
                color:
                  tech.color &&
                    tech.color !== "#000000" &&
                    tech.color !== "#181717"
                    ? tech.color
                    : "var(--foreground)",
              }}
            >
              {tech.icon}
            </div>
            <span className="text-xs font-semibold text-foreground/70 group-hover/item:text-foreground transition-colors duration-300 uppercase tracking-widest">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
