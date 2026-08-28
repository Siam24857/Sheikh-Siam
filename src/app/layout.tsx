import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
// import ChatWidget from "@/components/chat/ChatWidgetWrapper";
import Script from "next/script";
import BackgroundWrapper from "@/components/bg/BackgroundWrapper";
import MousePencilEffect from "@/components/bg/MousePencilEffect";
import N8nChat from "@/components/n8nChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolioin1597.vercel.app"),

  title: {
    default: "Sheikh Siam | Full-Stack Developer",
    template: "%s | Sheikh Siam",
  },

  description:
    "Sheikh Siam is a Full-Stack Developer from Dhaka, Bangladesh specializing in React, Next.js, Node.js, and PostgreSQL. 30+ projects shipped. Open to full-time and freelance work.",

  keywords: [
    "Sheikh Siam",
    "Full-Stack Developer Bangladesh",
    "React Developer Bangladesh",
    "Next.js Developer Bangladesh",
    "Node.js Developer Bangladesh",
    "Hire Developer Bangladesh",
    "Remote Developer Bangladesh",
    "siamtechofficial1597@gmail.com",
    "Sheikh Siam Portfolio",
  ],

  authors: [
    {
      name: "Sheikh Siam",
      url: "https://portfolioin1597.vercel.app",
    },
  ],

  creator: "Sheikh Siam",
  publisher: "Sheikh Siam",
  applicationName: "Sheikh Siam",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://portfolioin1597.vercel.app",
  },

  openGraph: {
    title: "Sheikh Siam | Full-Stack Developer",
    description:
      "Sheikh Siam is a Full-Stack Developer from Bangladesh specializing in React, Next.js, Node.js, and PostgreSQL. 30+ projects shipped.",
    url: "https://portfolioin1597.vercel.app",
    siteName: "Sheikh Siam",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://portfolioin1597.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sheikh Siam - Full-Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Siam | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, Node.js, and PostgreSQL. 30+ projects shipped.",
    creator: "@siam24857",
    images: ["https://portfolioin1597.vercel.app/og-image.png"],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Sheikh Siam",
            url: "https://portfolioin1597.vercel.app",
          }),
        }}
      />

      {/* Person Structured Data - Helps ranking for your name */}
      <Script
        id="person-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sheikh Siam",
            url: "https://portfolioin1597.vercel.app",
            jobTitle: "Full-Stack Developer",
            worksFor: {
              "@type": "Organization",
              name: "Freelance",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dhaka",
              addressCountry: "Bangladesh",
            },
            sameAs: [
              "https://github.com/Siam24857",
              "https://linkedin.com/in/sheikh-siam",
            ],
            description:
              "Sheikh Siam is a Full-Stack Developer specializing in React, Next.js, Node.js, and PostgreSQL.",
          }),
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundWrapper />
          <MousePencilEffect />
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
          {/*<ChatWidget />*/}
          <N8nChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
