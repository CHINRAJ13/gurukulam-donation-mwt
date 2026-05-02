"use client";

import { cn } from "@/lib/utils";

interface DonationToggleProps {
  value: "one-time" | "monthly";
  onChange: (value: "one-time" | "monthly") => void;
  className?: string;
}

export default function DonationToggle({
  value,
  onChange,
  className,
}: DonationToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-surface-dim rounded-full p-1.5 border border-primary/10",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange("one-time")}
        className={cn(
          "px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 min-h-12 cursor-pointer",
          value === "one-time"
            ? "bg-primary text-white shadow-lg"
            : "text-text-muted hover:text-primary"
        )}
      >
        One-Time
      </button>
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 min-h-12 cursor-pointer",
          value === "monthly"
            ? "bg-primary text-white shadow-lg"
            : "text-text-muted hover:text-primary"
        )}
      >
        Monthly Support
      </button>
    </div>
  );
}
