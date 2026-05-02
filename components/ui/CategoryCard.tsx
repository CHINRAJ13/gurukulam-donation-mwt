import { cn, formatCurrency } from "@/lib/utils";
import Button from "./Button";

interface Tier {
  label: string;
  amount: number;
}

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  tiers: readonly Tier[] | Tier[];
  ctaLabel: string;
  ctaHref?: string;
  accentColor?: "gold" | "saffron" | "crimson";
  className?: string;
}

const colorMap = {
  gold: "text-secondary bg-secondary/10",
  saffron: "text-primary bg-primary/10",
  crimson: "text-accent bg-accent/10",
};

const borderMap = {
  gold: "border-secondary/20",
  saffron: "border-primary/20",
  crimson: "border-accent/20",
};

export default function CategoryCard({
  icon,
  title,
  description,
  tiers,
  ctaLabel,
  ctaHref,
  accentColor = "gold",
  className,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[32px] shadow-card p-8",
        "flex flex-col h-full border border-black/5",
        "transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <span
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl",
            colorMap[accentColor]
          )}
        >
          {icon}
        </span>
        <h3 className="font-display text-2xl font-bold text-text-main">{title}</h3>
      </div>

      <p className="text-text-muted text-base leading-relaxed mb-8 grow">
        {description}
      </p>

      <div className="space-y-3 mb-8">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={cn(
              "flex justify-between items-center py-3 px-4 rounded-xl bg-surface-dim border",
              borderMap[accentColor]
            )}
          >
            <span className="text-sm font-semibold text-text-main">{tier.label}</span>
            <span className={cn("text-sm font-bold", accentColor === 'gold' ? 'text-secondary' : accentColor === 'crimson' ? 'text-accent' : 'text-primary')}>
              {formatCurrency(tier.amount)}
            </span>
          </div>
        ))}
      </div>

      <Button
        label={ctaLabel}
        variant="outline"
        size="md"
        className="w-full mt-auto"
        onClick={() => {
           // In a real app we'd trigger the donation modal for this cause
           window.scrollTo({ top: document.getElementById('donate')?.offsetTop || 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
