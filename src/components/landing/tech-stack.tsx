"use client";

import { useEffect, useRef, useState } from "react";
import { techStack } from "@/data/techStack";
import { BlurFade } from "@/components/animation-wrapper";
import { SectionHeader } from "../section-header";
import { cn } from "@/lib/utils";

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(techStack[0].id);
  const [isGridView, setIsGridView] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const skillsRef = useRef<HTMLDivElement>(null);

  const activeCategory = techStack.find((cat) => cat.id === activeTab) || techStack[0];

  useEffect(() => {
    setVisibleSkills([]);
    const timer = setTimeout(() => {
      setVisibleSkills(activeCategory.skills.map((s) => s.name));
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab, isGridView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSkills(activeCategory.skills.map((s) => s.name));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab, activeCategory]);

  return (
    <section className="mt-10 scroll-mt-28" id="tech-stack">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
            What I Know
          </p>
          <SectionHeader title="Skills & Technologies" />
          <p className="text-sm text-muted-foreground mt-2">
            30 skills across frontend, backend, DevOps, and tooling.
          </p>
        </div>
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
        >
          {isGridView ? "LIST VIEW" : "GRID VIEW"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6 max-w-6xl mx-auto">
        {/* Left: Category Tabs */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {techStack.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 whitespace-nowrap",
                activeTab === category.id
                  ? "bg-[rgba(108,99,255,0.10)] text-[#f0f0ff] border-l-[3px] border-[#6c63ff]"
                  : "text-[rgba(240,240,255,0.35)] hover:text-[rgba(240,240,255,0.6)] border-l-[3px] border-transparent"
              )}
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.06em] hidden lg:block"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
              >
                {category.label}
              </span>
              <span
                className="text-xs font-bold uppercase tracking-[0.06em] lg:hidden"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
              >
                {category.label.split(" ")[0]}
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 700,
                  backgroundColor: "rgba(108,99,255,0.15)",
                  color: "#6c63ff",
                }}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Skills Display */}
        <div ref={skillsRef} className="min-h-[300px]">
          {isGridView ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {activeCategory.skills.map((skill, index) => {
                const isVisible = visibleSkills.includes(skill.name);
                return (
                  <BlurFade key={skill.name} delay={0.04 * index} inView={isVisible}>
                    <div
                      className="group rounded-xl border border-[rgba(240,240,255,0.06)] bg-[rgba(240,240,255,0.03)] p-4 transition-all duration-300 hover:border-[rgba(108,99,255,0.35)]"
                      style={{ animationDelay: `${index * 0.04}s` }}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div
                          className="text-2xl transition-transform duration-300 group-hover:scale-110"
                          style={{ color: skill.accent }}
                        >
                          {skill.icon}
                        </div>
                        <span
                          className="text-sm font-semibold text-[#f0f0ff]"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {skill.name}
                        </span>
                        <div className="w-full h-1 bg-[rgba(240,240,255,0.07)] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${skill.percentage}%` : "0%",
                              background: `linear-gradient(to right, ${skill.accent}, ${skill.accent}40)`,
                            }}
                          />
                        </div>
                        <span
                          className="text-[10px] text-[rgba(240,240,255,0.22)]"
                          style={{ fontFamily: "JetBrains Mono, monospace" }}
                        >
                          + {skill.percentage * 10} XP
                        </span>
                      </div>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {activeCategory.skills.map((skill, index) => {
                const isVisible = visibleSkills.includes(skill.name);
                return (
                  <BlurFade key={skill.name} delay={0.04 * index} inView={isVisible}>
                    <div
                      className="group"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateX(0)" : "translateX(20px)",
                        transition: "opacity 0.25s ease, transform 0.25s ease",
                        transitionDelay: `${index * 0.04}s`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="text-base transition-transform duration-300 group-hover:scale-110"
                            style={{ color: skill.accent }}
                          >
                            {skill.icon}
                          </div>
                          <span
                            className="text-sm font-semibold text-[#f0f0ff]"
                            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                          >
                            {skill.name}
                          </span>
                        </div>
                        <span
                          className="text-xs font-bold"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontWeight: 700,
                            color: skill.accent,
                          }}
                        >
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-[3px] bg-[rgba(240,240,255,0.07)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: isVisible ? `${skill.percentage}%` : "0%",
                            background: `linear-gradient(to right, ${skill.accent}, ${skill.accent}40)`,
                            transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transitionDelay: `${index * 0.05}s`,
                          }}
                        />
                      </div>
                      <span
                        className="text-[10px] mt-1 block text-[rgba(240,240,255,0.22)]"
                        style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 400 }}
                      >
                        + {skill.percentage * 10} XP
                      </span>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
