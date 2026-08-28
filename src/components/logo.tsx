"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export default function Logo({ className = "", href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={`text-xl md:text-2xl cursor-pointer font-black tracking-tighter transition-all duration-300 group ${className}`}
    >
      <span className="bg-linear-to-r from-[#6c63ff] to-[#a855f7] bg-clip-text text-transparent group-hover:from-[#6c63ff] group-hover:to-[#00d4ff] group-hover:scale-105 inline-block transition-all duration-300 ease-out group-hover:drop-shadow-[0_0_8px_rgba(108,99,255,0.3)] relative overflow-hidden">
        SS
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      </span>
    </Link>
  );
}
