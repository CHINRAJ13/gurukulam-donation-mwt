"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

const typeStyles = {
  success: "bg-emerald-600 text-white",
  error: "bg-crimson text-cream",
  info: "bg-dark text-cream",
};

const typeIcons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3 rounded-[8px] shadow-gold-lg",
        "animate-fade-up",
        typeStyles[type]
      )}
      role="alert"
    >
      <span className="font-bold text-lg">{typeIcons[type]}</span>
      <p className="text-sm font-body font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
