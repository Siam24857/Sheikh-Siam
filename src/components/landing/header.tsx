"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  FileUser,
  ExternalLink,
} from "lucide-react";

import { BlurFade } from "@/components/animation-wrapper";
import About from "./about";
import { TechMarquee } from "./tech-marquee";
import PrimaryCtaButton from "@/components/primary-cta-button";
import SocialButton from "@/components/social-button";

const typewriterPhrases = [
  "Full-Stack Developer",
  "React & Next.js Engineer",
  "Node.js Backend Developer",
  "Open to Work 🚀",
];

export default function Header() {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentPhrase.length) {
            setDisplayedText(currentPhrase.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (charIndex > 0) {
            setDisplayedText(currentPhrase.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % typewriterPhrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section
      className="py-6 lg:py-10 min-h-[750px] lg:mt-10 scroll-mt-28"
      id="home"
    >
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 lg:gap-16">
        {/* Left Side: Name and Intro */}
        <div className="w-full lg:w-[60%] space-y-8 relative">
          <div className="space-y-3">
            <BlurFade delay={0} inView>
              <div className="flex justify-center lg:justify-start hidden md:flex">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-bold uppercase tracking-wider">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Open to Opportunities
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.05} inView>
              <h1 className="text-center lg:text-left text-5xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="text-foreground">SHEIKH</span>
                <br />
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 bg-size-[200%_auto] animate-gradient-x bg-clip-text text-transparent">
                  SIAM
                </span>
                <span className="text-[#6c63ff]">.</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <h2 className="text-center lg:text-left text-xl lg:text-2xl font-bold text-primary tracking-tight font-mono min-h-[2rem]">
                {displayedText}
                <span className="animate-pulse">|</span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              <p className="max-w-xl text-center lg:text-left text-muted-foreground leading-relaxed md:text-justify text-sm lg:text-base">
                I build fast, modern, production-ready web applications from
                pixel-perfect frontends to scalable backends. Proficient in 30+
                technologies across the full stack — React, Next.js, Node.js,
                PostgreSQL, Docker, and more. Based in Bangladesh, working with
                clients worldwide.
              </p>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="flex items-center gap-4 text-muted-foreground/80 font-mono text-xs lg:text-sm">
                <span>30+ Projects</span>
                <span className="text-border">·</span>
                <span>30 Skills</span>
                <span className="text-border">·</span>
                <span>Dhaka, BD</span>
              </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <PrimaryCtaButton
                  href="#projects"
                  icon={<ExternalLink className="h-5 w-5" />}
                >
                  View My Work
                </PrimaryCtaButton>
                <a
                  href="mailto:siamtechofficial1597@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-border/50 text-foreground/80 hover:text-foreground hover:border-primary/30 transition-all duration-300 text-sm font-bold uppercase tracking-wider"
                >
                  <Mail className="h-5 w-5" />
                  siamtechofficial1597@gmail.com →
                </a>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: <Linkedin className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />,
                    href: "https://linkedin.com/in/sheikh-siam",
                    label: "LinkedIn",
                    color: "from-blue-600 via-blue-500 to-blue-400",
                    shadowColor: "rgba(37,99,235,1)",
                  },
                  {
                    icon: <Github className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />,
                    href: "https://github.com/Siam24857",
                    label: "GitHub",
                    color: "from-gray-700 via-gray-600 to-gray-500",
                    shadowColor: "rgba(75,85,99,1)",
                  },
                  {
                    icon: <Mail className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" />,
                    href: "mailto:siamtechofficial1597@gmail.com",
                    label: "Email",
                    color: "from-red-500 via-red-400 to-red-300",
                    shadowColor: "rgba(239,68,68,1)",
                  },
                ].map((social, idx) => (
                  <BlurFade key={social.label} delay={0.35 + idx * 0.05} inView>
                    <SocialButton
                      href={social.href}
                      icon={social.icon}
                      label={social.label}
                      color={social.color}
                      shadowColor={social.shadowColor}
                      size="lg"
                    />
                  </BlurFade>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Right Side: Profile Photo and Socials */}
        <div className="w-full lg:w-[35%] flex flex-col items-center lg:items-end gap-10 relative z-10">
          <BlurFade delay={0.05} inView>
            <div className="relative p-1">
              {/* Profile Image Container */}
              <div className="group relative w-48 h-48 lg:w-60 lg:h-60 rounded-2xl lg:rounded-3xl overflow-hidden border border-primary/10 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/40 cursor-pointer">
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src="https://i.postimg.cc/g09QJhVR/Chat-GPT-Image-Jul-4-2026-08-47-29-PM.png"
                  alt="Sheikh Siam"
                  width={200}
                  height={200}
                  priority
                  {...({ fetchPriority: "high" } as any)}
                />
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 flex h-5 w-5 lg:h-6 lg:w-6 z-20">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 lg:h-6 lg:w-6 bg-green-500 border-2 border-background shadow-sm"></span>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Tech Marquee Bottom Section */}
      <div className="mt-8 md:mt-16 pt-4 md:pt-10">
        <BlurFade delay={0.6} inView>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 px-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary whitespace-nowrap">
                Core Technologies
              </span>
              <div className="h-px bg-linear-to-r from-primary/20 via-primary/10 to-transparent flex-1" />
            </div>
            <TechMarquee />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
