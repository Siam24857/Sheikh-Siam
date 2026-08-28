import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/sheikh-siam",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-500",
      iconColor: "text-blue-600",
    },
    {
      icon: Github,
      href: "https://github.com/Siam24857",
      label: "GitHub",
      color: "from-gray-700 to-gray-600",
      iconColor: "text-gray-700",
    },
    {
      icon: Mail,
      href: "mailto:siamtechofficial1597@gmail.com",
      label: "Email",
      color: "from-red-500 to-red-400",
      iconColor: "text-red-500",
    },
  ];

  return (
    <footer className="relative mt-4 md:mt-6 border-t border-white/30 dark:border-white/10 bg-transparent overflow-hidden -mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-full max-w-[100vw]">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright and Attribution */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-2xl font-black"
                style={{ fontFamily: "Syne, sans-serif", color: "#6c63ff" }}
              >
                SS
              </span>
              <span className="text-sm text-muted-foreground font-medium">
                Sheikh Siam — Full-Stack Developer
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Dhaka, Bangladesh 🇧🇩
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              © {currentYear}{" "}
              <span className="text-foreground font-bold">Sheikh Siam</span>.
              All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built by Sheikh Siam · siamtechofficial1597@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Quick Links</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl bg-gradient-to-br ${link.color} hover:shadow-lg hover:scale-110 transition-all duration-300 border border-transparent backdrop-blur-sm text-white`}
                aria-label={link.label}
              >
                <link.icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
