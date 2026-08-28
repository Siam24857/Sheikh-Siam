"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiStripe,
  SiPrisma,
  SiMysql,
  SiFirebase,
  SiSocketdotio,
  SiFramer,
  SiMui,
  SiMongoose,
} from "react-icons/si";

import { projects } from "@/data/projects";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/animation-wrapper";
import PrimaryCtaButton from "@/components/primary-cta-button";
import SecondaryButton from "@/components/secondary-button";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id;

  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <main className="flex flex-col min-h-screen mx-auto px-4 max-w-6xl items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link href="/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </main>
    );
  }

  const getTechIcon = (tech: string) => {
    switch (tech) {
      case "Next.js":
        return <SiNextdotjs className="w-4 h-4" />;
      case "React.js":
        return <SiReact className="w-4 h-4 text-[#61DAFB]" />;
      case "TypeScript":
        return <SiTypescript className="w-4 h-4 text-[#3178C6]" />;
      case "JavaScript":
        return <SiJavascript className="w-4 h-4 text-[#F7DF1E]" />;
      case "HTML/CSS":
        return <SiHtml5 className="w-4 h-4 text-[#E34F26]" />;
      case "Tailwind CSS":
      case "Tailwind":
        return <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />;
      case "Shadcn/ui":
        return <SiShadcnui className="w-4 h-4" />;
      case "Node.js":
        return <SiNodedotjs className="w-4 h-4 text-[#339933]" />;
      case "Express.js":
        return <SiExpress className="w-4 h-4" />;
      case "MongoDB":
        return <SiMongodb className="w-4 h-4 text-[#47A248]" />;
      case "Mongoose":
        return <SiMongoose className="w-4 h-4 text-[#800020]" />;
      case "Firebase":
        return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />;
      case "Socket.io":
        return <SiSocketdotio className="w-4 h-4" />;
      case "Framer Motion":
        return <SiFramer className="w-4 h-4" />;
      case "Material UI":
        return <SiMui className="w-4 h-4 text-[#007FFF]" />;
      case "PostgreSQL":
        return <SiPostgresql className="w-4 h-4 text-[#336791]" />;
      case "Redis":
        return <SiRedis className="w-4 h-4 text-[#DC382D]" />;
      case "Docker":
        return <SiDocker className="w-4 h-4 text-[#2496ED]" />;
      case "CI/CD":
        return <SiGithubactions className="w-4 h-4 text-[#2088FF]" />;
      case "Stripe":
        return <SiStripe className="w-4 h-4 text-[#008CDD]" />;
      case "Prisma":
        return <SiPrisma className="w-4 h-4 text-[#2D3748]" />;
      case "MySQL":
        return <SiMysql className="w-4 h-4 text-[#336791]" />;
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col min-h-screen mx-auto px-4 max-w-6xl">
      <Navbar />

      <section className="mt-12 mb-20 relative px-4 sm:px-6 lg:px-8">
        {/* Decorative gradient removed for cleaner look */}

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Project Title */}
          <BlurFade delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-tight text-foreground">
              {project.name}
            </h1>
          </BlurFade>

          {/* Project Image Carousel Look */}
          <BlurFade delay={0.2}>
            <div className="relative w-full aspect-video md:aspect-21/9 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/5 dark:bg-white/5 mb-16 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </BlurFade>

          {/* Tech Stack Section */}
          <BlurFade delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Tech Stack
              </h2>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {project.tech.map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group"
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {getTechIcon(t)}
                    </span>
                    <span className="text-sm md:text-base font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Main Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
            {/* Overview & Features */}
            <div className="lg:col-span-2 space-y-12 text-left">
              <BlurFade delay={0.4}>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-500">
                    Project Overview
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.5}>
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-500">
                    Key Features
                  </h3>
                  <ul className="space-y-4">
                    {project.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>

            {/* Links and Actions */}
            <div className="space-y-8">
              <BlurFade delay={0.6}>
                <div className="p-8 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] space-y-6">
                  <h3 className="text-xl font-bold">Project Links</h3>
                  <div className="flex flex-col gap-4">
                    <PrimaryCtaButton
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                      icon={<ExternalLink className="w-5 h-5" />}
                    >
                      Live Demo
                    </PrimaryCtaButton>

                    {project.githubRepositoryBackend ? (
                      <div className="flex flex-col gap-3">
                        <SecondaryButton
                          href={project.githubRepository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                          icon={<Github className="w-5 h-5" />}
                        >
                          Frontend Code
                        </SecondaryButton>
                        <SecondaryButton
                          href={project.githubRepositoryBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                          icon={<Github className="w-5 h-5" />}
                        >
                          Backend Code
                        </SecondaryButton>
                      </div>
                    ) : (
                      <SecondaryButton
                        href={project.githubRepository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                        icon={<Github className="w-5 h-5" />}
                      >
                        Source Code
                      </SecondaryButton>
                    )}
                  </div>
                </div>
              </BlurFade>

              {/* Back Link */}
              <BlurFade delay={0.7}>
                <SecondaryButton
                  href="/projects"
                  className="w-full"
                  icon={<ArrowLeft className="w-5 h-5" />}
                >
                  All Projects
                </SecondaryButton>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
