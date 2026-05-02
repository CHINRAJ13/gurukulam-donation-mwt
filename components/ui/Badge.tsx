import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "gold" | "crimson" | "green" | "saffron" | "gray";
  className?: string;
}

const variantStyles = {
  gold: "bg-gold-pale text-gold border-gold/20",
  crimson: "bg-crimson/10 text-crimson border-crimson/20",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  saffron: "bg-saffron/10 text-saffron border-saffron/20",
  gray: "bg-stone/5 text-stone-light border-stone/10",
};

export default function Badge({
  label,
  variant = "gold",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-semibold font-body",
        "rounded-full border uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
