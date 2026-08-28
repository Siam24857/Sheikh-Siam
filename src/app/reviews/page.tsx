import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReviewsContent } from "@/components/reviews-content";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read honest reviews and feedback from students and learners who have worked with Sheikh Siam.",
  alternates: {
    canonical: "https://portfolioin1597.vercel.app/reviews",
  },
  openGraph: {
    title: "Reviews | Sheikh Siam",
    description:
      "Read honest reviews and feedback from students and learners who have worked with Sheikh Siam.",
    url: "https://portfolioin1597.vercel.app/reviews",
    siteName: "Sheikh Siam",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://portfolioin1597.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sheikh Siam - Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews | Sheikh Siam",
    description:
      "Read honest reviews and feedback from students and learners who have worked with Sheikh Siam.",
    images: ["https://portfolioin1597.vercel.app/og-image.png"],
  },
  keywords: [
    "Sheikh Siam reviews",
    "web development feedback",
    "student reviews",
    "full-stack developer reviews",
  ],
};

export default function AllReviewsPage() {
  return (
    <main className="flex flex-col min-h-screen mx-auto px-4 max-w-6xl">
      <Navbar />
      <ReviewsContent />
      <Footer />
    </main>
  );
}
