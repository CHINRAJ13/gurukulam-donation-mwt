import { cn, formatCurrency } from "@/lib/utils";
import Button from "./Button";

interface ConstructionItemCardProps {
  id: string;
  name: string;
  price: number;
  unit: string;
  icon: string;
  onDonate: (amount: number, name: string) => void;
  className?: string;
}

export default function ConstructionItemCard({
  id,
  name,
  price,
  unit,
  icon,
  onDonate,
  className,
}: ConstructionItemCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[24px] p-6 shadow-sm border border-black/5 hover:shadow-md transition-all group",
        className
      )}
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
      <h3 className="font-display font-bold text-lg mb-1">{name}</h3>
      <p className="text-sm text-text-muted mb-4">{unit}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xl font-bold text-primary">{formatCurrency(price)}</span>
        <Button
          label="Sponsor"
          size="sm"
          variant="outline"
          onClick={() => onDonate(price, `Sponsorship: ${name}`)}
        />
      </div>
    </div>
  );
}
