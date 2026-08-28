"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type SocialButtonProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
  shadowColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "w-10 h-10 rounded-lg",
  md: "w-12 h-12 rounded-xl",
  lg: "w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]",
};

export default function SocialButton({
  href,
  icon,
  label,
  color = "from-blue-600 via-blue-500 to-indigo-600",
  shadowColor = "rgba(37,99,235,1)",
  size = "md",
  className,
}: SocialButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group relative flex items-center justify-center overflow-hidden transition-all duration-300 hover:-translate-y-1",
        sizeClasses[size],
        className,
      )}
    >
      {/* 3D Background */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br transition-transform duration-300 group-hover:scale-105",
          color,
        )}
      />

      {/* 3D Shadow/Depth */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-300",
          size === "lg" ? "rounded-xl lg:rounded-2xl" : "rounded-lg",
        )}
        style={{
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 3px 0 0 ${shadowColor}, 0 6px 12px -3px ${shadowColor.replace("1)", "0.5)")}`,
        }}
      />

      {/* Hover shadow enhancement */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 4px 0 0 ${shadowColor}, 0 8px 16px -3px ${shadowColor.replace("1)", "0.6)")}`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>

      {/* Icon */}
      <div className={cn("relative text-white transition-transform duration-300 group-hover:scale-110", iconSizes[size])}>
        {icon}
      </div>
    </Link>
  );
}
