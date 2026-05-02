import { cn } from "@/lib/utils";

interface DividerProps {
  symbol?: string;
  className?: string;
}

export default function Divider({
  symbol = "⁕",
  className,
}: DividerProps) {
  return (
    <div className={cn("divider-om py-4 text-gold text-lg", className)}>
      {symbol}
    </div>
  );
}
