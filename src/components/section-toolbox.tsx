"use client";

import * as React from "react";
import Link from "next/link";
import {
  House,
  Cpu,
  Briefcase,
  Clock3,
  Video,
  Star,
  Mail,
} from "lucide-react";

type SectionItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  gradient: string;
  shadow: string;
};

const sections: SectionItem[] = [
  {
    id: "home",
    label: "Home",
    icon: House,
    gradient: "from-purple-600 via-violet-500 to-fuchsia-500",
    shadow: "shadow-purple-500/40",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Clock3,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    shadow: "shadow-green-500/40",
  },
  {
    id: "tech-stack",
    label: "Skills",
    icon: Cpu,
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    shadow: "shadow-cyan-500/40",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Briefcase,
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    shadow: "shadow-orange-500/40",
  },
  {
    id: "tutorials",
    label: "Tutorials",
    icon: Video,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    shadow: "shadow-rose-500/40",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    shadow: "shadow-amber-500/40",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    shadow: "shadow-indigo-500/40",
  },
];

export default function SectionToolbox() {
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.3;
      let current = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          current = section.id;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <aside className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="flex flex-col gap-2 p-2 rounded-2xl bg-transparent backdrop-blur-md border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-white/50 dark:hover:border-white/20">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => handleNavigate(event, section.id)}
              aria-label={`Go to ${section.label}`}
              title={section.label}
              className={`group relative h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                isActive
                  ? `bg-linear-to-br ${section.gradient} text-white`
                  : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${isActive ? "text-white" : "text-current"}`}
              />
              <span className="pointer-events-none absolute left-full ml-2 px-2 py-1 rounded-md bg-zinc-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 dark:bg-black/80">
                {section.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
