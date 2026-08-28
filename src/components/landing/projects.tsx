"use client";

import { ChevronRight } from "lucide-react";
import SecondaryButton from "../secondary-button";
import { BlurFade } from "../animation-wrapper";
import { projects } from "@/data/projects";
import { SectionHeader } from "../section-header";

import { ProjectCard } from "../project-card";

export default function Projects() {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="mt-10 relative scroll-mt-28" id="projects">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between gap-4">
        <SectionHeader
          title="Projects"
          className="mb-0"
        />
        <SecondaryButton
          href="/projects"
          className="px-5 py-2 text-sm shrink-0 max-sm:hidden"
          icon={<ChevronRight className="w-4 h-4" />}
        >
          <span className="text-sm tracking-wide">View All Projects</span>
        </SecondaryButton>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((p: any, index: number) => (
            <BlurFade key={p.id} delay={0.1 * index} inView className="h-full">
              <ProjectCard project={p} />
            </BlurFade>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <SecondaryButton
            href="/projects"
            icon={<ChevronRight className="w-4 h-4" />}
          >
            <span className="text-sm tracking-wide">View All Projects</span>
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
