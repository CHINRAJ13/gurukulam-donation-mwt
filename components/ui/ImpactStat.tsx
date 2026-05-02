"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImpactStatProps {
  number: number;
  label: string;
  icon: string;
  suffix?: string;
  displayText?: string;
  className?: string;
}

export default function ImpactStat({
  number,
  label,
  icon,
  suffix = "",
  displayText,
  className,
}: ImpactStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || displayText) return;

    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, number, displayText]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("text-center p-6", className)}
    >
      <span className="text-4xl mb-3 block">{icon}</span>
      <p className="text-3xl md:text-4xl font-bold font-display text-text-main mb-2">
        {displayText || `${count}${suffix}`}
      </p>
      <p className="text-sm text-text-muted font-body leading-snug">{label}</p>
    </motion.div>
  );
}
