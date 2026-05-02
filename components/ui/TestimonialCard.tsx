import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  location: string;
  quote: string;
  program?: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  location,
  quote,
  program,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[8px] p-6 shadow-card",
        "gold-border-accent",
        "transition-all duration-300 hover:shadow-card-hover",
        className
      )}
    >
      <div className="text-gold text-4xl font-display mb-3">&ldquo;</div>
      <p className="text-stone text-sm leading-relaxed mb-4 font-body italic">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
          <span className="text-gold font-bold font-body text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-dark font-body">{name}</p>
          <p className="text-xs text-stone-light font-body">{location}</p>
          {program && (
            <p className="text-xs text-gold font-body mt-0.5">{program}</p>
          )}
        </div>
      </div>
    </div>
  );
}
