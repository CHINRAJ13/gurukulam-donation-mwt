"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  accent?: boolean;
  id?: string;
}

export default function Card({
  children,
  className,
  hover = false,
  onClick,
  accent = false,
  id,
}: CardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "bg-white rounded-lg shadow-card",
        accent && "gold-border-accent",
        hover &&
          "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
