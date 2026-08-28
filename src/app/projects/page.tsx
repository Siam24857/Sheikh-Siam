import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { BlurFade } from "@/components/animation-wrapper";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import SecondaryButton from "@/components/secondary-button";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore full-stack projects by Sheikh Siam — built with Next.js, React, TypeScript, Node.js, PostgreSQL, Redis, Docker, and more.",
  alternates: {
    canonical: "https://portfolioin1597.vercel.app/projects",
  },
  openGraph: {
    title: "Projects | Sheikh Siam",
    description:
      "Explore full-stack projects by Sheikh Siam — built with Next.js, React, TypeScript, Node.js, PostgreSQL, Redis, Docker, and more.",
    url: "https://portfolioin1597.vercel.app/projects",
    siteName: "Sheikh Siam",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://portfolioin1597.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sheikh Siam - Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Sheikh Siam",
    description:
      "Explore full-stack projects by Sheikh Siam — built with Next.js, React, TypeScript, Node.js, PostgreSQL, Redis, Docker, and more.",
    images: ["https://portfolioin1597.vercel.app/og-image.png"],
  },
  keywords: [
    "Sheikh Siam projects",
    "Next.js projects",
    "full stack projects",
    "React projects",
    "TypeScript projects",
    "web developer portfolio",
  ],
};

export default function AllProjectsPage() {
  return (
    <main className="flex flex-col min-h-screen mx-auto px-4 max-w-6xl">
      <Navbar />

      <section className="mt-12 mb-20 relative">
        <div className="relative z-10">
          <SectionHeader title="All My Projects" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p: any, index: number) => (
              <BlurFade
                key={p.id}
                delay={0.05 * index}
                inView
                className="h-full"
              >
                <ProjectCard project={p} />
              </BlurFade>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <SecondaryButton href="/" icon={<ArrowLeft className="w-5 h-5" />}>
              Return Home
            </SecondaryButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
