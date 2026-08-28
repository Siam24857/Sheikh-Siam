"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Github,
  Linkedin,
  Link2,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";

import { BlurFade } from "../animation-wrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const aboutSummary =
  "I'm Sheikh Siam, a passionate Full-Stack Developer from Dhaka, Bangladesh. I specialize in building modern, responsive, and production-ready web applications using the latest technologies across the entire stack.";

const profile = {
  name: "Sheikh Siam",
  role: "Full-Stack Developer",
  location: "Dhaka, Bangladesh",
  image:
    "https://res.cloudinary.com/dynxnpj21/image/upload/v1779201470/smfpwyk2icoiljlxfq44.png",
  email: "siamtechofficial1597@gmail.com",
};

const aboutSections: {
  icon: typeof Rocket;
  title: string;
  text: string;
}[] = [
  {
    icon: Rocket,
    title: "What I Do",
    text: "I build modern, responsive, and production-ready web applications using React, Next.js, Node.js, and PostgreSQL. I focus on creating clean, scalable, and genuinely useful digital experiences.",
  },
  {
    icon: Code2,
    title: "My Expertise",
    text: "From crafting beautiful, animated frontends with React and Next.js to building robust backends with Node.js, NestJS, and PostgreSQL — I handle the full picture. I also work with DevOps tools like Docker, CI/CD pipelines, and Linux servers.",
  },
  {
    icon: Sparkles,
    title: "What I Believe",
    text: "I'm self-taught, continuously learning, and always building. My goal is to write code that is clean, scalable, and genuinely useful — and to work with teams that care about quality.",
  },
  {
    icon: Bot,
    title: "My Journey",
    text: "Everything I know came from building real things. I started with HTML and CSS, mastered JavaScript and React, then expanded into full-stack development with Node.js, databases, and DevOps tools.",
  },
];

const highlights = [
  "30+ Skills",
  "30+ Projects",
  "Self-Taught",
  "Remote Ready",
];

const socialLinks = [
  {
    label: "Email",
    icon: Mail,
    iconColor: "text-muted-foreground",
    hoverBg: "hover:bg-muted hover:text-foreground",
    href: `mailto:${profile.email}`,
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    iconColor: "text-[#0A66C2]",
    hoverBg: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
    href: "https://linkedin.com/in/sheikh-siam",
  },
  {
    label: "GitHub",
    icon: Github,
    iconColor: "text-foreground",
    hoverBg: "hover:bg-muted hover:text-foreground",
    href: "https://github.com/Siam24857",
  },
];

export default function About() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setOpen(window.location.hash === "#about");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      window.history.pushState(null, "", "#about");
    } else {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  };

  const copyAboutLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#about`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div>
      <BlurFade delay={0.25} inView>
        <p className="max-w-2xl lg:text-lg text-muted-foreground leading-relaxed md:text-justify">
          {aboutSummary}
        </p>

        <div className="mt-5 flex justify-center lg:justify-start">
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Show More
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-5 sm:p-8">
              <DialogHeader>
                <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                  <div className="space-y-1">
                    <DialogTitle className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">
                      About Me
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-base font-medium leading-snug">
                      Full-Stack Development · React · Next.js · Node.js
                    </DialogDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-blue-500/30 text-blue-500 hover:bg-blue-500/10 px-2.5 sm:px-4"
                    onClick={copyAboutLink}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Link2 className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">
                      {copied ? "Copied" : "Copy Link"}
                    </span>
                  </Button>
                </div>
              </DialogHeader>

              {/* Wide horizontal layout: profile card + details */}
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 sm:gap-6 mt-2">
                {/* Profile card */}
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-border/50 dark:border-white/10 bg-white/60 dark:bg-transparent p-5 sm:p-6 text-center">
                  {/* Photo */}
                  <div className="relative shrink-0 rounded-2xl border border-border/60 dark:border-white/10 shadow-sm">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={160}
                      height={160}
                      className="h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 rounded-2xl object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40" />
                      <span className="relative inline-flex h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-green-500 border-2 border-background" />
                    </span>
                  </div>

                  {/* Name & details */}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-foreground leading-tight">
                      {profile.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-primary">
                      {profile.role}
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      {profile.location}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-border/40 dark:border-white/5" />

                  {/* Social links */}
                  <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:flex-col lg:items-stretch">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={
                          link.href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className={`group inline-flex h-10 w-10 lg:h-auto lg:w-full items-center justify-center lg:justify-start gap-2.5 rounded-full lg:rounded-lg border border-border/60 dark:border-white/10 bg-white/50 dark:bg-white/5 px-0 lg:px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 lg:hover:translate-y-0 ${link.hoverBg}`}
                      >
                        <link.icon
                          className={`h-4 w-4 shrink-0 ${link.iconColor}`}
                        />
                        <span className="hidden lg:inline truncate">
                          {link.label}
                        </span>
                        <ArrowUpRight className="hidden lg:inline-flex h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aboutSections.map((section) => (
                      <div
                        key={section.title}
                        className="group rounded-2xl border border-border/50 dark:border-white/10 bg-white/60 dark:bg-transparent p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                      >
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                            <section.icon className="h-4 w-4" />
                          </span>
                          <h3 className="text-base font-bold text-foreground">
                            {section.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed md:text-justify">
                          {section.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap items-center gap-2">
                    {highlights.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 dark:border-white/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </BlurFade>
    </div>
  );
}
