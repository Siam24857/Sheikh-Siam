"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/data/services";
import { BlurFade } from "@/components/animation-wrapper";
import { SectionHeader } from "../section-header";

export default function Services() {
  return (
    <section className="mt-10" id="services">
      <SectionHeader title="Specialized" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {services.map((service, index) => (
          <BlurFade
            key={service.title}
            delay={0.1 + index * 0.1}
            inView
            className="h-full"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <Card className="h-full bg-white/60 dark:bg-transparent backdrop-blur-md border border-border/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] group overflow-hidden relative rounded-2xl transition-all duration-300">
                {/* Space Vibe Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${service.color}, transparent 70%)`,
                  }}
                />

                <CardHeader className="pb-2 flex flex-row items-center gap-4">
                  <div
                    className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                      boxShadow: `0 0 15px ${service.color}10`,
                    }}
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
