"use client";

import React, { useState, useMemo } from "react";
import { Play, Clock, Calendar, ArrowLeft, Search, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/section-header";
import { BlurFade } from "@/components/animation-wrapper";
import SecondaryButton from "@/components/secondary-button";
import { Input } from "@/components/ui/input";
import { tutorials } from "@/data/tutorials";

export function TutorialsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const displayVideos = useMemo(() => tutorials.slice(0, 10), []);

  const filteredTutorials = useMemo(() => {
    return displayVideos.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery, displayVideos]);

  return (
    <section className="mt-12 mb-20 relative">
      <div className="relative z-10">
        <SectionHeader title="All My Tutorials" className="mb-12" />

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tutorials by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 rounded-2xl bg-white/40 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 focus-visible:ring-blue-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((video, index) => (
              <BlurFade
                key={video.id}
                delay={0.05 * index}
                inView
                className="h-full"
              >
                <Card
                  className="group overflow-hidden flex flex-col h-full bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-blue-500/30 dark:hover:border-white/20 rounded-2xl cursor-pointer"
                  onClick={() => setActiveVideoId(video.youtubeId)}
                >
                  <div className="p-1.5 relative">
                    <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/20">
                      <Image
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                        <div className="bg-blue-600/90 text-white rounded-full p-4 transform scale-90 group-hover:scale-100 opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    </figure>
                  </div>

                  <CardContent className="flex flex-col flex-1 px-5 pb-5 pt-2">
                    <div className="flex items-center gap-2 mb-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      <span>{video.date}</span>
                      {video.category && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                          <span className="text-blue-500 dark:text-blue-400">{video.category}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-foreground/90 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-3">
                      {video.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/20 dark:bg-white/5 border border-border/50 dark:border-white/10 rounded-2xl backdrop-blur-md">
            <p className="text-muted-foreground">No tutorials found matching your search criteria.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-blue-500 hover:text-blue-600 font-semibold text-sm underline underline-offset-4"
            >
              Reset search
            </button>
          </div>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <SecondaryButton href="/" icon={<ArrowLeft className="w-4 h-4" />}>
            Return Home
          </SecondaryButton>
          <SecondaryButton
            href="https://github.com/Siam24857"
            target="_blank"
            rel="noopener noreferrer"
            icon={<Github className="w-4 h-4" />}
          >
            GitHub Profile
          </SecondaryButton>
        </div>
      </div>

      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/90 text-white hover:text-blue-500 rounded-full border border-white/10 transition-colors focus:outline-none"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
