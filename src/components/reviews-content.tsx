"use client";

import React, { useState, useMemo } from "react";
import { Github, ArrowLeft, SlidersHorizontal, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { BlurFade } from "@/components/animation-wrapper";
import SecondaryButton from "@/components/secondary-button";
import { ReviewCard } from "@/components/landing/video-reviews";
import { videoReviews } from "@/data/videoReviews";
import { FaLinkedinIn } from "react-icons/fa";

type Filter = "all" | "linkedin" | "youtube";

export function ReviewsContent() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return videoReviews.filter((r) => {
      return filter === "all" || r.source === filter;
    });
  }, [filter]);

  const filterButtons: { label: string; value: Filter; icon: React.ReactNode }[] =
    [
      { label: "All", value: "all", icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
      {
        label: "LinkedIn",
        value: "linkedin",
        icon: <FaLinkedinIn className="w-3.5 h-3.5" />,
      },
      {
        label: "YouTube",
        value: "youtube",
        icon: <Play className="w-3.5 h-3.5" />,
      },
    ];

  return (
    <section className="mt-12 mb-20 relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-10">
        <SectionHeader title="What Learners Say" className="mb-4" />

        <BlurFade delay={0.1} inView yOffset={6}>
          <p className="text-sm text-muted-foreground mb-10 max-w-xl">
            Honest feedback from students who leveled up through my tutorials —
            collected from{" "}
            <span className="text-[#0A66C2] dark:text-[#60a5fa] font-semibold">
              LinkedIn
            </span>{" "}
            and{" "}
            <span className="text-[#FF0000] dark:text-[#f87171] font-semibold">
              YouTube
            </span>
            .
          </p>
        </BlurFade>

        <BlurFade delay={0.15} inView yOffset={6}>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                  filter === btn.value
                    ? btn.value === "linkedin"
                      ? "bg-[#0A66C2] border-[#0A66C2] text-white"
                      : btn.value === "youtube"
                      ? "bg-[#FF0000] border-[#FF0000] text-white"
                      : "bg-foreground border-foreground text-background"
                    : "bg-white/40 dark:bg-white/[0.03] border-border/60 dark:border-white/10 text-muted-foreground hover:border-border dark:hover:border-white/20 hover:text-foreground"
                }`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}

            <span className="text-xs text-muted-foreground ml-2">
              <span className="font-semibold text-foreground/90">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "review" : "reviews"}
              {filter !== "all" && (
                <span>
                  {" "}
                  from{" "}
                  <span
                    className={
                      filter === "linkedin"
                        ? "text-[#0A66C2] dark:text-[#60a5fa] font-semibold"
                        : "text-[#FF0000] dark:text-[#f87171] font-semibold"
                    }
                  >
                    {filter === "linkedin" ? "LinkedIn" : "YouTube"}
                  </span>
                </span>
              )}
            </span>
          </div>
        </BlurFade>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/20 dark:bg-white/[0.03] border border-border/50 dark:border-white/10 rounded-2xl backdrop-blur-md"
          >
            <p className="text-muted-foreground mb-4">
              No reviews found for this filter.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="text-blue-500 hover:text-blue-600 font-semibold text-sm underline underline-offset-4"
            >
              Show all reviews
            </button>
          </motion.div>
        )}

        <BlurFade delay={0.25} inView yOffset={8}>
          <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
            <h3 className="text-sm font-bold text-foreground mb-2">
              Want to share your learning experience?
            </h3>
            <p className="text-xs text-muted-foreground mb-5 max-w-md">
              Your feedback helps other learners and keeps me motivated to
              create more content. Leave a review on YouTube or connect with
              me on LinkedIn!
            </p>
            <div className="flex flex-wrap items-center gap-3">
               <Link
                 href="https://github.com/Siam24857"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold transition-all duration-200 hover:shadow-[0_4px_16px_rgba(75,85,99,0.3)] hover:scale-[1.03]"
               >
                 <Github className="w-4 h-4" />
                 View GitHub Profile
                 <ExternalLink className="w-3 h-3 opacity-70" />
               </Link>
               <Link
                 href="https://linkedin.com/in/sheikh-siam/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold transition-all duration-200 hover:shadow-[0_4px_16px_rgba(10,102,194,0.3)] hover:scale-[1.03]"
               >
                 <FaLinkedinIn className="w-4 h-4" />
                 Connect on LinkedIn
                 <ExternalLink className="w-3 h-3 opacity-70" />
               </Link>
             </div>
          </div>
        </BlurFade>

        <div className="mt-12 flex justify-center">
          <SecondaryButton href="/#reviews" icon={<ArrowLeft className="w-5 h-5" />}>
            Back to Home
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
