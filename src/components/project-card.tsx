"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PrimaryCtaButton from "@/components/primary-cta-button";
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

const getTechIcon = (tech: string) => {
  switch (tech) {
    case "Next.js":
      return <SiNextdotjs className="w-3 h-3" />;
    case "React.js":
      return <SiReact className="w-3 h-3 text-[#61DAFB]" />;
    case "TypeScript":
      return <SiTypescript className="w-3 h-3 text-[#3178C6]" />;
    case "JavaScript":
      return <SiJavascript className="w-3 h-3 text-[#F7DF1E]" />;
    case "HTML/CSS":
      return <SiHtml5 className="w-3 h-3 text-[#E34F26]" />;
    case "Tailwind CSS":
    case "Tailwind":
      return <SiTailwindcss className="w-3 h-3 text-[#06B6D4]" />;
    case "Shadcn/ui":
      return <SiShadcnui className="w-3 h-3" />;
    case "Node.js":
      return <SiNodedotjs className="w-3 h-3 text-[#339933]" />;
    case "Express.js":
      return <SiExpress className="w-3 h-3" />;
    case "MongoDB":
      return <SiMongodb className="w-3 h-3 text-[#47A248]" />;
    case "Mongoose":
      return <SiMongoose className="w-3 h-3 text-[#800020]" />;
    case "Firebase":
      return <SiFirebase className="w-3 h-3 text-[#FFCA28]" />;
    case "Socket.io":
      return <SiSocketdotio className="w-3 h-3" />;
    case "Framer Motion":
      return <SiFramer className="w-3 h-3" />;
    case "Material UI":
      return <SiMui className="w-3 h-3 text-[#007FFF]" />;
    case "PostgreSQL":
      return <SiPostgresql className="w-3 h-3 text-[#336791]" />;
    case "Redis":
      return <SiRedis className="w-3 h-3 text-[#DC382D]" />;
    case "Docker":
      return <SiDocker className="w-3 h-3 text-[#2496ED]" />;
    case "CI/CD":
      return <SiGithubactions className="w-3 h-3 text-[#2088FF]" />;
    case "Stripe":
      return <SiStripe className="w-3 h-3 text-[#008CDD]" />;
    case "Prisma":
      return <SiPrisma className="w-3 h-3 text-[#2D3748]" />;
    case "MySQL":
      return <SiMysql className="w-3 h-3 text-[#336791]" />;
    default:
      return null;
  }
};

interface ProjectCardProps {
  project: any;
}

export function ProjectCard({ project: p }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="overflow-hidden flex flex-col gap-3 h-full bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-0 transition-all duration-300 rounded-2xl group">
        {/* Project Image Container */}
        <div className="p-3">
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted/20">
            <Link
              href={p.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${p.name}`}
            >
              <Image
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ExternalLink
                    className="w-5 h-5"
                    style={{ stroke: "#ffffff" }}
                  />
                </div>
              </div>
            </Link>
          </figure>
        </div>

        <CardContent className="flex flex-col flex-1 px-5 pb-6">
          {/* Title and Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {p.name}
            </h3>

            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {p.tech.slice(0, 3).map((t: string) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="bg-primary/5 border-primary/10 text-muted-foreground px-2.5 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm"
                >
                  <span className="flex items-center gap-1">
                    {getTechIcon(t)}
                    {t}
                  </span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-5">
            <div className="border-t border-border/40 dark:border-white/5 mb-4" />

            {/* Repo + Live links row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {p.githubRepositoryBackend ? (
                <>
                  <Link
                    href={p.githubRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary/5 border border-primary/10 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
                    aria-label={`${p.name} frontend repository`}
                  >
                    <Github className="w-3 h-3" />
                    <span>Frontend</span>
                  </Link>
                  <Link
                    href={p.githubRepositoryBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary/5 border border-primary/10 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
                    aria-label={`${p.name} backend repository`}
                  >
                    <Github className="w-3 h-3" />
                    <span>Backend</span>
                  </Link>
                </>
              ) : (
                <Link
                  href={p.githubRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary/5 border border-primary/10 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
                  aria-label={`View ${p.name} on GitHub`}
                >
                  <Github className="w-3 h-3" />
                  <span>Code</span>
                </Link>
              )}

              <Link
                href={p.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 hover:text-green-700 dark:hover:text-green-300 transition-all"
                aria-label={`Live demo of ${p.name}`}
              >
                <ExternalLink className="w-3 h-3" />
                <span>Live Demo</span>
              </Link>
            </div>

            {/* View Details */}
            <PrimaryCtaButton
              href={`/projects/${p.id}`}
              size="sm"
              className="w-full justify-center"
              icon={<ChevronRight className="w-4 h-4" />}
            >
              View Details
            </PrimaryCtaButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
