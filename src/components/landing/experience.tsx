"use client";

import { BlurFade } from "@/components/animation-wrapper";
import { SectionHeader } from "../section-header";
import {
  Calendar,
  MapPin,
  Briefcase,
  Milestone,
  Code2,
  Zap,
  Sparkles,
} from "lucide-react";

type ExperienceType = "milestone" | "skill" | "project" | "current";

interface Experience {
  title: string;
  subtitle: string;
  description: string;
  type: ExperienceType;
  period: string;
}

const experiences: Experience[] = [
  {
    title: "Started My Coding Journey",
    subtitle: "Milestone",
    description:
      "Began with HTML and CSS. Built my first webpage and fell in love with creating things for the web.",
    type: "milestone",
    period: "Jan 2024",
  },
  {
    title: "JavaScript & React",
    subtitle: "Skill",
    description:
      "Mastered JavaScript fundamentals and React. Learned component architecture, hooks, and state management.",
    type: "skill",
    period: "Feb – Apr 2024",
  },
  {
    title: "Full-Stack Development",
    subtitle: "Project",
    description:
      "Added Node.js, Express, MongoDB, and PostgreSQL to my stack. Built my first full-stack applications end-to-end.",
    type: "project",
    period: "May – Jul 2024",
  },
  {
    title: "Advanced Technologies",
    subtitle: "Skill",
    description:
      "Expanded into Next.js, TypeScript, NestJS, Docker, Redis, Socket.io, Prisma, GitHub Actions, and n8n automation.",
    type: "skill",
    period: "Aug – Oct 2024",
  },
  {
    title: "30+ Projects & Growing",
    subtitle: "Current",
    description:
      "Actively building, shipping, and improving. Currently seeking full-time or freelance opportunities worldwide.",
    type: "current",
    period: "Nov 2024 – Present",
  },
];

const typeConfig: Record<ExperienceType, { icon: typeof Milestone; color: string; bg: string; border: string }> = {
  milestone: {
    icon: Milestone,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  skill: {
    icon: Code2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  project: {
    icon: Briefcase,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  current: {
    icon: Zap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
};

export default function Experience() {
  return (
    <section className="mt-10 scroll-mt-28" id="experience">
      <SectionHeader title="Experience" />

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {experiences.map((exp, index) => {
          const config = typeConfig[exp.type];
          const Icon = config.icon;

          return (
            <BlurFade key={index} delay={0.15} inView yOffset={8}>
              <div className="group relative p-6 sm:p-7 rounded-2xl bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-blue-500/20 dark:hover:border-white/15">
                {/* Timeline dot */}
                <div className="absolute -left-3 top-8 hidden sm:block">
                  <div className={`w-3 h-3 rounded-full ${config.bg} border-2 ${config.border} ${config.color}`} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
                        <Icon className="w-3 h-3" />
                        {exp.subtitle}
                      </span>
                      {exp.type === "current" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                          NOW
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {exp.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/40 dark:border-white/5 mb-4" />

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
