"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X, ChevronRight } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { BlurFade } from "../animation-wrapper";
import { SectionHeader } from "../section-header";
import SecondaryButton from "../secondary-button";
import { videoReviews, type VideoReview } from "@/data/videoReviews";

const TRUNCATE_LENGTH = 180;

/* ------------------------------------------------------------------ */
/*  Source badge                                                        */
/* ------------------------------------------------------------------ */
export function SourceBadge({ review }: { review: VideoReview }) {
  if (review.source === "linkedin") {
    const href = review.linkedinId
      ? `https://www.linkedin.com/in/${review.linkedinId}`
      : "#";
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/25 text-[#0A66C2] dark:text-[#60a5fa] text-[10px] font-bold uppercase tracking-wider hover:bg-[#0A66C2]/20 transition-colors duration-200 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <FaLinkedinIn className="w-3 h-3" />
        {review.linkedinId ? `@${review.linkedinId}` : "LinkedIn"}
      </Link>
    );
  }

  const href = review.youtubeProfileUrl ?? "#";
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/25 text-[#FF0000] dark:text-[#f87171] text-[10px] font-bold uppercase tracking-wider hover:bg-[#FF0000]/20 transition-colors duration-200 shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <SiYoutube className="w-3.5 h-3.5" />
      {review.youtubeUsername ?? "YouTube"}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-review overlay (Framer Motion — no Radix, no layout shift)    */
/* ------------------------------------------------------------------ */
function ReviewOverlay({
  review,
  open,
  onClose,
}: {
  review: VideoReview;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.18 }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-border/60 dark:border-white/10 shadow-2xl bg-white dark:bg-[oklch(18%_0.02_245)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-muted/60 dark:bg-white/10 hover:bg-muted dark:hover:bg-white/20 text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-border/60 dark:ring-white/15">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[oklch(18%_0.02_245)] ${
                      review.source === "linkedin"
                        ? "bg-[#0A66C2]"
                        : "bg-[#FF0000]"
                    }`}
                  >
                    {review.source === "linkedin" ? (
                      <FaLinkedinIn className="w-2.5 h-2.5 text-white" />
                    ) : (
                      <SiYoutube className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {review.name}
                  </p>
                  <div className="mt-1">
                    <SourceBadge review={review} />
                  </div>
                </div>
              </div>

              {/* Full review */}
              <div className="relative pl-2">
                <p className="text-sm text-foreground/80 dark:text-foreground/75 leading-relaxed pt-3">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual review card                                              */
/* ------------------------------------------------------------------ */
export function ReviewCard({
  review,
  index,
}: {
  review: VideoReview;
  index: number;
}) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const isLong = review.reviewText.length > TRUNCATE_LENGTH;
  const displayText = isLong
    ? review.reviewText.slice(0, TRUNCATE_LENGTH).trimEnd() + "…"
    : review.reviewText;

  return (
    <>
      <BlurFade delay={0.08 * index} inView yOffset={12} className="h-full">
        <div className="group relative flex flex-col h-full p-6 rounded-2xl bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.18)] hover:border-blue-500/30 dark:hover:border-white/20 hover:shadow-[0_12px_48px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_12px_48px_rgba(255,255,255,0.03)] transition-all duration-300">
          {/* Gradient hover orb */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Decorative quote */}
          <div className="absolute top-4 right-5 text-primary/5 dark:text-white/5 pointer-events-none select-none">
            <Quote className="w-12 h-12 rotate-180 fill-current" />
          </div>

          {/* Avatar + Name + Badge */}
          <div className="flex items-start gap-3 mb-4 relative z-10">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-border/60 dark:ring-white/15 group-hover:ring-blue-500/40 transition-all duration-300">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-background ${
                  review.source === "linkedin" ? "bg-[#0A66C2]" : "bg-[#FF0000]"
                }`}
              >
                {review.source === "linkedin" ? (
                  <FaLinkedinIn className="w-2.5 h-2.5 text-white" />
                ) : (
                  <SiYoutube className="w-2.5 h-2.5 text-white" />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground/90 truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {review.name}
              </h3>
              <div className="mt-1">
                <SourceBadge review={review} />
              </div>
            </div>
          </div>

          {/* Review text */}
          <div className="flex-1 relative z-10">
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
              &ldquo;{displayText}&rdquo;
            </p>
            {isLong && (
              <button
                onClick={() => setOverlayOpen(true)}
                className="mt-2 text-[11px] font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors underline underline-offset-2"
              >
                See more
              </button>
            )}
          </div>
        </div>
      </BlurFade>

      <ReviewOverlay
        review={review}
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section (homepage widget)                                      */
/* ------------------------------------------------------------------ */
export default function VideoReviews() {
  const displayed = videoReviews.slice(0, 6);

  return (
    <section className="mt-10 relative scroll-mt-28" id="reviews">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-5 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/4 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between gap-4">
        <SectionHeader title="What Learners Say" className="mb-0" />
        <SecondaryButton
          href="/reviews"
          className="px-5 py-2 text-sm shrink-0 max-sm:hidden"
          icon={<ChevronRight className="w-4 h-4" />}
        >
          <span className="text-sm tracking-wide">Explore All Reviews</span>
        </SecondaryButton>
      </div>

      {/* Description */}
      <div className="max-w-6xl mx-auto mb-10">
        <p className="text-sm text-muted-foreground max-w-xl">
          Real feedback from students — shared on{" "}
          <span className="text-[#0A66C2] dark:text-[#60a5fa] font-semibold">
            LinkedIn
          </span>{" "}
          and{" "}
          <span className="text-[#FF0000] dark:text-[#f87171] font-semibold">
            YouTube
          </span>
          .
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false}>
            {displayed.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
