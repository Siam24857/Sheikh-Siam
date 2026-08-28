import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { TutorialsContent } from "@/components/tutorials-content";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Full-stack development tutorials and guides by Sheikh Siam — covering React, Next.js, Node.js, TypeScript, Docker, and more.",
  alternates: {
    canonical: "https://portfolioin1597.vercel.app/tutorials",
  },
  openGraph: {
    title: "Tutorials | Sheikh Siam",
    description:
      "Full-stack development tutorials and guides by Sheikh Siam — covering React, Next.js, Node.js, TypeScript, Docker, and more.",
    url: "https://portfolioin1597.vercel.app/tutorials",
    siteName: "Sheikh Siam",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://portfolioin1597.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sheikh Siam - Tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tutorials | Sheikh Siam",
    description:
      "Full-stack development tutorials and guides by Sheikh Siam — covering React, Next.js, Node.js, TypeScript, Docker, and more.",
    images: ["https://portfolioin1597.vercel.app/og-image.png"],
  },
  keywords: [
    "Sheikh Siam tutorials",
    "React tutorial",
    "Next.js tutorial",
    "Node.js tutorial",
    "TypeScript tutorial",
    "Docker tutorial",
    "full stack tutorial",
    "web development tutorials",
  ],
};

export default function AllTutorialsPage() {
  return (
    <main className="flex flex-col min-h-screen mx-auto px-4 max-w-6xl">
      <Navbar />
      <TutorialsContent />
      <Footer />
    </main>
  );
}
