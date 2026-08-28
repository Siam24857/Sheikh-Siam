"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  className,
  align = "left",
}: SectionHeaderProps) {
  const letters = title.split("");

  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-1",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <div className="relative group">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground/90 font-mono flex overflow-hidden">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h2>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
          className="h-1 bg-linear-to-r from-primary via-primary/50 to-transparent rounded-full mt-1.5 opacity-80"
        />
      </div>
    </div>
  );
}
