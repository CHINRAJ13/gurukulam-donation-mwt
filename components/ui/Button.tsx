"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  label,
  onClick,
  href,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  className,
  type = "button",
}: ButtonProps) {
  const baseStyles = "pill-button inline-flex items-center justify-center font-bold relative overflow-hidden active:scale-95 transition-all duration-300";
  
  const variants = {
    primary: "bg-primary text-white shadow-premium hover:bg-primary-light",
    secondary: "bg-secondary text-white hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-text-muted hover:bg-surface-dim hover:text-text-main",
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3.5 text-base",
    lg: "px-10 py-4.5 text-lg",
  };

  const styles = cn(baseStyles, variants[variant], sizes[size], (disabled || loading) && "opacity-50 cursor-not-allowed", className);

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon}
      <span>{label}</span>
      {variant === 'primary' && !loading && (
        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={styles}>
      {content}
    </button>
  );
}
