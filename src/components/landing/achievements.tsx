"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, Shield, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "../animation-wrapper";
import { achievements } from "@/data/achievements";
import { SectionHeader } from "../section-header";
import { Badge } from "../ui/badge";
import SecondaryButton from "../secondary-button";

const iconMap: Record<string, React.ElementType> = {
  Award: Award,
  Shield: Shield,
};

export default function Achievements() {
  return (
    <div className="mt-10 relative scroll-mt-28" id="achievements">
      {/* Background decorative blobs for glassmorphism effect */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <SectionHeader title="Achievements" className="mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {achievements.map((achievement, index) => {
          const Icon = iconMap[achievement.iconName] || Award;
          return (
            <BlurFade
              key={achievement.id}
              delay={0.1 * index}
              inView
              yOffset={8}
            >
              <Card className="group overflow-hidden flex flex-col h-full bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-primary/30 dark:hover:border-white/20 rounded-2xl">
                {/* Certificate Image Preview */}
                <div className="p-1.5 relative">
                  {achievement.status && achievement.status !== "completed" && (
                    <div className="absolute top-4 right-4 z-20">
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary border-primary/20 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider font-bold"
                      >
                        {achievement.status === "upcoming"
                          ? "Upcoming"
                          : "On-board"}
                      </Badge>
                    </div>
                  )}
                  <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/20">
                    <Link href={achievement.link} target="_blank">
                      <Image
                        className={cn(
                          "object-cover transition-transform duration-500 group-hover:scale-110",
                          achievement.status === "upcoming" &&
                          "opacity-60 grayscale-[0.5]",
                        )}
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <ExternalLink
                            className="w-4 h-4"
                            style={{ stroke: "#ffffff" }}
                          />
                        </div>
                      </div>
                    </Link>
                  </figure>
                </div>

                <CardContent className="flex flex-col flex-1 px-4 pb-4 pt-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon
                        size={18}
                        style={{
                          stroke:
                            achievement.iconName === "Award"
                              ? "#a855f7"
                              : "#3b82f6",
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-foreground/90 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {achievement.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                        {achievement.organization} • {achievement.date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-2">
                    <SecondaryButton
                      href={achievement.link}
                      target="_blank"
                      className="w-full"
                    >
                      {achievement.status === "upcoming"
                        ? "Onboarding Path"
                        : achievement.status === "on-board"
                          ? "Course Details"
                          : "View Certificate"}
                    </SecondaryButton>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
