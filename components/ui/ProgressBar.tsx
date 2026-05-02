"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarProps {
  label: string;
  current?: number;
  total?: number;
  percent?: number;
  color?: "gold" | "saffron" | "crimson";
  dark?: boolean;
  className?: string;
}

const colorStyles = {
  gold: "bg-secondary",
  saffron: "bg-primary",
  crimson: "bg-accent",
};

const trackColors = {
  gold: "bg-secondary/20",
  saffron: "bg-primary/20",
  crimson: "bg-accent/20",
};

export default function ProgressBar({
  label,
  current,
  total,
  percent,
  color = "gold",
  dark = false,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const calculatedPercent =
    percent !== undefined
      ? percent
      : current !== undefined && total !== undefined && total > 0
      ? Math.min(100, Math.round((current / total) * 100 * 10) / 10)
      : 0;

  const displayText =
    current !== undefined && total !== undefined
      ? `${current} of ${total}`
      : `${calculatedPercent}%`;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span
          className={cn(
            "text-sm font-semibold font-body",
            dark ? "text-white" : "text-text-main"
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "text-sm font-bold font-body",
            dark ? "text-primary-light" : "text-primary"
          )}
        >
          {displayText}
        </span>
      </div>
      <div
        className={cn(
          "h-3 rounded-full overflow-hidden",
          trackColors[color]
        )}
      >
        <motion.div
          className={cn("h-full rounded-full", colorStyles[color])}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${calculatedPercent}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
