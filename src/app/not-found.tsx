"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, FileQuestion } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex justify-center text-muted-foreground p-4 bg-muted/30 rounded-full w-fit mx-auto ring-1 ring-inset ring-muted/50">
          <FileQuestion className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground max-w-[500px]">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex gap-4"
      >
        <Button asChild size="lg" variant="default" className="group">
          <Link href="/">
            <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
