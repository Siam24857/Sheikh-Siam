"use client";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-hidden
        className="rounded-full w-10 h-10 bg-background/10 border border-border/40 backdrop-blur-sm text-muted-foreground/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-[1.15rem] w-[1.15rem] opacity-0"
        >
          <circle cx="12" cy="12" r="5" />
        </svg>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full w-10 h-10 bg-background/10 border backdrop-blur-sm transition-all duration-500 relative overflow-hidden group ${
        isDark
          ? "border-border/40 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:bg-cyan-500/5 text-cyan-400"
          : "border-border/40 hover:border-amber-400/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:bg-amber-500/5 text-amber-500"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="flex items-center justify-center w-full h-full relative"
          >
            <motion.div
              whileHover={{ rotate: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[1.15rem] w-[1.15rem]"
              >
                {/* Crescent Moon */}
                <motion.path
                  d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  fill="#22d3ee"
                  fillOpacity="0.2"
                />
                
                {/* Twinkling star 1 */}
                <motion.path
                  d="M19 5l.2.7.7.2-.7.2-.2.7-.2-.7-.7-.2.7-.2z"
                  fill="#22d3ee"
                  stroke="none"
                  animate={{
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: "19px 6px" }}
                />
                
                {/* Twinkling star 2 */}
                <motion.path
                  d="M14 15l.2.5.5.2-.5.2-.2.5-.2-.5-.5-.2.5-.2z"
                  fill="#22d3ee"
                  stroke="none"
                  animate={{
                    scale: [0.5, 1.1, 0.5],
                    opacity: [0.3, 0.9, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: "14px 16px" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="flex items-center justify-center w-full h-full relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[1.15rem] w-[1.15rem]"
              >
                {/* Center Sun Core */}
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  fill="#f59e0b"
                  fillOpacity="0.2"
                />

                {/* Rotating and Pulsing Sun Rays */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                >
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 12 + 7.5 * Math.cos(rad);
                    const y1 = 12 + 7.5 * Math.sin(rad);
                    const x2 = 12 + 10 * Math.cos(rad);
                    const y2 = 12 + 10 * Math.sin(rad);
                    return (
                      <motion.line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        animate={{ scaleY: [0.85, 1.15, 0.85] }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.5,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        style={{ transformOrigin: "12px 12px" }}
                      />
                    );
                  })}
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
