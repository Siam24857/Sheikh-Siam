"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type SecondaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
};

export default function SecondaryButton({
  href,
  children,
  className,
  target,
  rel,
  showIcon = true,
  icon,
}: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 px-5 py-3",
        "text-sm font-semibold",
        "transition-all duration-300 ease-out",
        "rounded-xl overflow-hidden",
        "border border-white/20 dark:border-white/10",
        "bg-white/40 dark:bg-white/5",
        "backdrop-blur-md",
        "text-foreground/80 dark:text-foreground/70",
        "hover:bg-white/60 dark:hover:bg-white/10",
        "hover:border-primary/30 dark:hover:border-primary/20",
        "hover:text-foreground dark:hover:text-foreground",
        "hover:-translate-y-0.5",
        "active:translate-y-0",
        "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]",
        "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]",
        "hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)]",
        "dark:hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <span className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shimmer effect */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-2">
        {children}
        {showIcon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon || <ChevronRight className="w-4 h-4" />}
          </span>
        )}
      </span>
    </Link>
  );
}
