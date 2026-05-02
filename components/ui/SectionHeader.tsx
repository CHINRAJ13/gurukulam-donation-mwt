import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleSize?: "md" | "lg" | "xl";
  dark?: boolean;
  className?: string;
}

const titleSizes = {
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
};

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  titleSize = "lg",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">
          {label}
        </p>
      )}
      <h2
        className={cn(
          "font-display font-bold leading-tight",
          titleSizes[titleSize],
          dark ? "text-white" : "text-text-main"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl font-body text-base md:text-lg leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-white/70" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
