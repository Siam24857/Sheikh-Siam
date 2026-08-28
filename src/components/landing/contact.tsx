"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ExternalLink,
  User,
  Briefcase,
  Users,
  GraduationCap,
  Globe,
  Clock,
} from "lucide-react";
import { BlurFade } from "@/components/animation-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "../section-header";
import PrimaryCtaButton from "@/components/primary-cta-button";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  type: string;
  subject: string;
  budget: string;
  message: string;
};

const FORMSPREE_FORM_ID = "YOUR_FORM_ID";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    type: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Invalid email address";
        return undefined;
      case "type":
        if (!value) return "Please select your type";
        return undefined;
      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 5) return "Subject must be at least 5 characters";
        return undefined;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 20) return "Message must be at least 20 characters";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "message") {
      setCharCount(value.length);
    }
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("siamtechofficial1597@gmail.com");
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormData] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Record<string, boolean>)
    );

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("_subject", "New Portfolio Contact — Sheikh Siam");
      formPayload.append("_replyto", "siamtechofficial1597@gmail.com");
      formPayload.append("_gotcha", "");
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("type", formData.type);
      formPayload.append("subject", formData.subject);
      formPayload.append("budget", formData.budget || "Not applicable");
      formPayload.append("message", formData.message);

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        body: formPayload,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", type: "", subject: "", budget: "", message: "" });
        setCharCount(0);
        setErrors({});
        setTouched({});
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      toast.error("Something went wrong. Please email me directly at siamtechofficial1597@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({ name: "", email: "", type: "", subject: "", budget: "", message: "" });
    setCharCount(0);
    setErrors({});
    setTouched({});
  };

  return (
    <section
      className="pt-20 pb-6 scroll-mt-28 relative overflow-hidden"
      id="contact"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <BlurFade delay={0} inView className="text-center mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
            Let&apos;s Work
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ WebkitTextStroke: "1px #6c63ff", color: "transparent" }}>
            Together.
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Whether you&apos;re a recruiter, client, or collaborator —
            I reply to every email within 24 hours.
          </p>
        </BlurFade>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Left Side: Contact Form - Takes 3 columns */}
          <BlurFade delay={0.1} inView className="lg:col-span-3 flex flex-col">
            <div className="flex-1 p-8 rounded-2xl bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-6">
                  Send Message
                </h3>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <svg className="w-20 h-20 mb-6" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" className="animate-check-circle" />
                      <path d="M8 12l2.5 2.5L16 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" strokeDashoffset="20" className="animate-check-mark" />
                    </svg>
                    <h3 className="text-2xl font-bold text-green-500 mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      Message Sent! ✓
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      I&apos;ll reply to {formData.email} within 24 hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name & Email Row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder=" "
                          className={`peer bg-transparent border-0 border-b ${errors.name ? "border-red-500" : touched.name && !errors.name ? "border-green-500" : "border-[rgba(240,240,255,0.10)]"} focus:border-[#6c63ff] focus:ring-0 h-12 rounded-none transition-colors`}
                        />
                        <Label
                          htmlFor="name"
                          className={`absolute left-0 top-3 transition-all duration-200 pointer-events-none ${formData.name || touched.name ? "-translate-y-5 scale-82 text-[#6c63ff]" : "translate-y-0 text-muted-foreground"}`}
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
                        >
                          Full Name *
                        </Label>
                        {touched.name && errors.name && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-red-500 text-xs">✗</span>
                            <span className="text-red-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{errors.name}</span>
                          </div>
                        )}
                        {touched.name && !errors.name && formData.name && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-green-500 text-xs">✓</span>
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder=" "
                          className={`peer bg-transparent border-0 border-b ${errors.email ? "border-red-500" : touched.email && !errors.email ? "border-green-500" : "border-[rgba(240,240,255,0.10)]"} focus:border-[#6c63ff] focus:ring-0 h-12 rounded-none transition-colors`}
                        />
                        <Label
                          htmlFor="email"
                          className={`absolute left-0 top-3 transition-all duration-200 pointer-events-none ${formData.email || touched.email ? "-translate-y-5 scale-82 text-[#6c63ff]" : "translate-y-0 text-muted-foreground"}`}
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
                        >
                          Email Address *
                        </Label>
                        {touched.email && errors.email && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-red-500 text-xs">✗</span>
                            <span className="text-red-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{errors.email}</span>
                          </div>
                        )}
                        {touched.email && !errors.email && formData.email && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-green-500 text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* You Are & Subject Row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e) => handleChange("type", e.target.value)}
                          onBlur={() => handleBlur("type")}
                          className={`w-full bg-transparent border-0 border-b ${errors.type ? "border-red-500" : touched.type && !errors.type ? "border-green-500" : "border-[rgba(240,240,255,0.10)]"} focus:border-[#6c63ff] focus:ring-0 h-12 rounded-none transition-colors text-[#f0f0ff]`}
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "15px" }}
                        >
                          <option value="" disabled>Select your type</option>
                          <option value="recruiter">👔 Recruiter / HR</option>
                          <option value="company">🏢 Company / Client</option>
                          <option value="collaborator">🤝 Collaborator / Developer</option>
                          <option value="student">📚 Student / Learner</option>
                          <option value="other">🌐 Other</option>
                        </select>
                        {touched.type && errors.type && (
                          <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{errors.type}</p>
                        )}
                      </div>

                      <div className="relative">
                        <Input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          onBlur={() => handleBlur("subject")}
                          placeholder=" "
                          className={`peer bg-transparent border-0 border-b ${errors.subject ? "border-red-500" : touched.subject && !errors.subject ? "border-green-500" : "border-[rgba(240,240,255,0.10)]"} focus:border-[#6c63ff] focus:ring-0 h-12 rounded-none transition-colors`}
                        />
                        <Label
                          htmlFor="subject"
                          className={`absolute left-0 top-3 transition-all duration-200 pointer-events-none ${formData.subject || touched.subject ? "-translate-y-5 scale-82 text-[#6c63ff]" : "translate-y-0 text-muted-foreground"}`}
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
                        >
                          Subject *
                        </Label>
                        {touched.subject && errors.subject && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-red-500 text-xs">✗</span>
                            <span className="text-red-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{errors.subject}</span>
                          </div>
                        )}
                        {touched.subject && !errors.subject && formData.subject && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-green-500 text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="relative">
                      <select
                        value={formData.budget}
                        onChange={(e) => handleChange("budget", e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-[rgba(240,240,255,0.10)] focus:border-[#6c63ff] focus:ring-0 h-12 rounded-none text-[#f0f0ff]"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "15px" }}
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="not-applicable">Not applicable</option>
                        <option value="under-500">💰 Under $500</option>
                        <option value="500-1500">💰 $500 – $1,500</option>
                        <option value="1500-5000">💰 $1,500 – $5,000</option>
                        <option value="5000-plus">💰 $5,000+</option>
                        <option value="discuss">💰 Let's discuss</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        placeholder=" "
                        rows={5}
                        className={`peer bg-transparent border-0 border-b ${errors.message ? "border-red-500" : touched.message && !errors.message ? "border-green-500" : "border-[rgba(240,240,255,0.10)]"} focus:border-[#6c63ff] focus:ring-0 rounded-none resize-none transition-colors`}
                        style={{ minHeight: "120px" }}
                      />
                      <Label
                        htmlFor="message"
                        className={`absolute left-0 top-3 transition-all duration-200 pointer-events-none ${formData.message || touched.message ? "-translate-y-5 scale-82 text-[#6c63ff]" : "translate-y-0 text-muted-foreground"}`}
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
                      >
                        Message *
                      </Label>
                      {touched.message && errors.message && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-red-500 text-xs">✗</span>
                          <span className="text-red-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{errors.message}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex-1" />
                        <span
                          className="text-[10px]"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            color:
                              charCount > 1000
                                ? "#ff6b6b"
                                : charCount > 0
                                  ? "#6c63ff"
                                  : "rgba(240,240,255,0.25)",
                          }}
                        >
                          {charCount} / 1000
                        </span>
                      </div>
                    </div>

                    {/* Error Banner */}
                    {Object.keys(errors).length > 0 && touched.name && (
                      <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10">
                        <p className="text-xs text-red-500" style={{ fontFamily: "Inter, sans-serif" }}>
                          Something went wrong. Please email me directly at siamtechofficial1597@gmail.com
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 mt-2 bg-[#6c63ff] text-[#04040f] font-bold uppercase tracking-[0.1em] text-sm hover:bg-[rgba(108,99,255,0.85)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(108,99,255,0.30)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          SEND MESSAGE →
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </BlurFade>

          {/* Right Side: Contact Info Panel - Takes 2 columns */}
          <BlurFade delay={0} inView className="lg:col-span-2 flex flex-col">
            <div className="flex-1 p-6 rounded-2xl bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)] relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl" />

              <div className="relative z-10 h-full flex flex-col gap-6">
                {/* Email */}
                <div>
                  <p className="text-[10px] font-bold text-[rgba(240,240,255,0.28)] uppercase tracking-wider mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    EMAIL
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href="mailto:siamtechofficial1597@gmail.com"
                      className="text-sm font-semibold hover:underline"
                      style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6c63ff" }}
                    >
                      siamtechofficial1597@gmail.com
                    </a>
                    <button
                      onClick={copyEmail}
                      className="p-1 rounded hover:bg-muted transition-colors"
                      aria-label="Copy email"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Response Time */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(108,99,255,0.20)] bg-[rgba(108,99,255,0.08)] w-fit">
                  <Clock className="w-3.5 h-3.5 text-[#6c63ff]" />
                  <span className="text-xs font-medium text-[#6c63ff]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    Usually responds within 24 hours
                  </span>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-[10px] font-bold text-[rgba(240,240,255,0.28)] uppercase tracking-wider mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    AVAILABILITY
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Open to Full-time Roles",
                      "Open to Freelance Projects",
                      "Open to Remote Work Worldwide",
                      "Open to Collaboration",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ fontFamily: "Inter, sans-serif", color: "rgba(240,240,255,0.55)" }}>
                        <span className="text-[#22c55e]">✅</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Location */}
                <div>
                  <p className="text-[10px] font-bold text-[rgba(240,240,255,0.28)] uppercase tracking-wider mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    LOCATION
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-sm" style={{ fontFamily: "Inter, sans-serif", color: "rgba(240,240,255,0.55)" }}>
                      <span>🇧🇩</span> Dhaka, Bangladesh
                    </li>
                    <li className="flex items-center gap-2 text-sm" style={{ fontFamily: "Inter, sans-serif", color: "rgba(240,240,255,0.55)" }}>
                      <span>🌍</span> Available for Remote Work
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-[10px] font-bold text-[rgba(240,240,255,0.28)] uppercase tracking-wider mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    CONNECT
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "GitHub", href: "https://github.com/Siam24857", handle: "github.com/Siam24857" },
                      { label: "LinkedIn", href: "https://linkedin.com/in/sheikh-siam", handle: "linkedin.com/in/sheikh-siam" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[rgba(240,240,255,0.30)] hover:text-[#6c63ff] hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {link.label === "GitHub" ? (
                          <Github className="w-4 h-4" />
                        ) : (
                          <Linkedin className="w-4 h-4" />
                        )}
                        <span style={{ fontFamily: "Inter, sans-serif" }}>{link.handle}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Download CV */}
                <a
                  href="/Sheikh_Siam_CV.pdf"
                  className="w-full py-3 px-4 rounded-lg border border-[rgba(240,240,255,0.12)] text-[rgba(240,240,255,0.50)] text-center text-xs font-semibold uppercase tracking-wider hover:border-[#6c63ff] hover:text-[#f0f0ff] hover:-translate-y-0.5 transition-all duration-200"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  📄 DOWNLOAD CV
                </a>

                {/* Recruiter Note */}
                <div className="border-l-[3px] border-[#6c63ff] pl-4 py-3 bg-[rgba(108,99,255,0.05)] rounded-r-lg">
                  <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "rgba(240,240,255,0.50)" }}>
                    👋 Hi Recruiter! I&apos;m actively looking for opportunities. My CV includes live project links, GitHub, and references. Feel free to reach out — I respond fast.
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
