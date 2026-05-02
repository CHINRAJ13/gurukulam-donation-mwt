import { cn, formatCurrency } from "@/lib/utils";
import Button from "./Button";

interface PatronCardProps {
  tier: "Gold" | "Diamond" | "Lifetime";
  amount: number;
  benefits: readonly string[] | string[];
  featured?: boolean;
  className?: string;
}

const tierIcons: Record<string, string> = {
  Gold: "🥇",
  Diamond: "💎",
  Lifetime: "👑",
};

export default function PatronCard({
  tier,
  amount,
  benefits,
  featured = false,
  className,
}: PatronCardProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] p-8 md:p-10 flex flex-col h-full relative overflow-hidden",
        "transition-all duration-500 hover:-translate-y-2",
        featured
          ? "bg-primary text-white shadow-premium scale-[1.02] md:scale-105 z-10"
          : "bg-white text-text-main shadow-card hover:shadow-card-hover border border-primary/10",
        className
      )}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl tracking-widest uppercase">
          Most Popular
        </div>
      )}

      <div className="text-center mb-8">
        <span className="text-5xl mb-4 block">{tierIcons[tier]}</span>
        <h3
          className={cn(
            "font-display text-3xl font-bold mb-2",
            featured ? "text-white" : "text-text-main"
          )}
        >
          {tier} Patron
        </h3>
        <p
          className={cn(
            "text-4xl font-bold font-display",
            featured ? "text-white" : "text-primary"
          )}
        >
          {formatCurrency(amount)}
          {tier === "Lifetime" && "+"}
        </p>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-3 text-base">
            <span
              className={cn(
                "mt-1.5 shrink-0 w-2 h-2 rounded-full",
                featured ? "bg-secondary" : "bg-primary"
              )}
            />
            <span className={featured ? "text-white/90" : "text-text-muted"}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <Button
        label="Become a Patron"
        variant={featured ? "secondary" : "primary"}
        size="lg"
        className="w-full"
        onClick={() => {
           window.scrollTo({ top: document.getElementById('donate')?.offsetTop || 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
