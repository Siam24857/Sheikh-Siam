"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Clock, Calendar, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "../animation-wrapper";
import { SectionHeader } from "../section-header";
import SecondaryButton from "../secondary-button";
import { tutorials } from "@/data/tutorials";

export default function Tutorials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // We only show the latest 3 videos on the homepage
  const showcaseVideos = tutorials.slice(0, 3);

  return (
    <section className="mt-10 relative scroll-mt-28" id="tutorials">
      {/* Decorative glassmorphic background elements */}
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-blue-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-96 h-96 bg-purple-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-between gap-4">
        <SectionHeader title="Learn From Me" className="mb-0" />
        <SecondaryButton
          href="/tutorials"
          className="px-5 py-2 text-sm shrink-0 max-sm:hidden"
          icon={<ChevronRight className="w-4 h-4" />}
        >
          <span className="text-sm tracking-wide">Explore All Tutorials</span>
        </SecondaryButton>
      </div>

      <div className="max-w-6xl mx-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseVideos.map((video, index) => (
            <BlurFade key={video.id} delay={0.1 * index} inView yOffset={8} className="h-full">
              <Card 
                className="group overflow-hidden flex flex-col h-full bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-blue-500/30 dark:hover:border-white/20 rounded-2xl cursor-pointer"
                onClick={() => setActiveVideoId(video.youtubeId)}
              >
                {/* Video Thumbnail Container */}
                <div className="p-1.5 relative">
                  <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/20">
                    <Image
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Dark overlay & Play button on hover */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-blue-600/90 text-white rounded-full p-4 transform scale-90 group-hover:scale-100 opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>
                  </figure>
                </div>

                {/* Content details */}
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

        <div className="mt-10 flex justify-center sm:hidden">
          <SecondaryButton
            href="/tutorials"
            icon={<ChevronRight className="w-4 h-4" />}
          >
            <span className="text-sm tracking-wide">Explore All Tutorials</span>
          </SecondaryButton>
        </div>
      </div>

      {/* Lightbox Video Modal */}
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
              {/* Close Button */}
              <button
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/90 text-white hover:text-blue-500 rounded-full border border-white/10 transition-colors focus:outline-none"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* YouTube Iframe */}
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
