import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Header from "@/components/landing/header";
import SectionToolbox from "@/components/section-toolbox";

// Lazy load components below the fold
const Experience = dynamic(() => import("@/components/landing/experience"));
// const Services = dynamic(() => import("@/components/landing/services"));
const TechStack = dynamic(() => import("@/components/landing/tech-stack"));
const Projects = dynamic(() => import("@/components/landing/projects"));
const Tutorials = dynamic(() => import("@/components/landing/tutorials"));
const VideoReviews = dynamic(() => import("@/components/landing/video-reviews"));
// const Achievements = dynamic(() => import("@/components/landing/achievements"));
const Contact = dynamic(() => import("@/components/landing/contact"));
const Footer = dynamic(() => import("@/components/footer"));

function SectionDivider() {
  return (
    <div className="w-full flex items-center gap-4 mt-16 mb-2 opacity-30">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent dark:via-white/10" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen mx-auto px-4 max-w-6xl relative">
      {/* Background decorative blobs for glassmorphism effect */}
      {/* <div className="fixed top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" /> */}

      <SectionToolbox />
      <Navbar />
      <Header />

      <SectionDivider />
      <Experience />

      {/*<SectionDivider />
      <Services />*/}

      <SectionDivider />
      <TechStack />

      <SectionDivider />
      <Projects />

      <SectionDivider />
      <Tutorials />

      <SectionDivider />
      <VideoReviews />

      {/* <SectionDivider /> */}
      {/* <Achievements /> */}

      <SectionDivider />
      <Contact />

      <Footer />
    </main>
  );
}
