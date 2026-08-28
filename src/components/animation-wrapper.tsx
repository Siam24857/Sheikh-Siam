"use client";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, {
    once: true,
    margin: inViewMargin as any,
  });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}

export function BlurFadeText({
  text,
  className,
  variant,
  duration = 0.3,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  // Use a ref and useInView to trigger animation only when visible
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {/* If animating by character, we need to split twice or handle spaces carefully. 
          Simplest for "by character" is just split string. 
          For "by word" (default usually better for long text) split by space. 
      */}
      {animateByCharacter
        ? text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={combinedVariants}
              transition={{
                duration,
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className="inline-block"
              style={{ width: char === " " ? "0.2em" : "auto" }} // Preserve space width
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))
        : // Animate by word
          text.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={combinedVariants}
              transition={{
                duration,
                delay: delay + i * (characterDelay * 2), // words need more delay spacing
                ease: "easeOut",
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
    </div>
  );
}
