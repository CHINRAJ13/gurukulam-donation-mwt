"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

interface DonationAmountPickerProps {
  presets: readonly number[] | number[];
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export default function DonationAmountPicker({
  presets,
  value,
  onChange,
  className,
}: DonationAmountPickerProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const handlePresetClick = (amount: number) => {
    setIsCustom(false);
    setCustomValue("");
    onChange(amount);
  };

  const handleCustomToggle = () => {
    setIsCustom(true);
    onChange(0);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustomValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num > 0) {
      onChange(num);
    } else {
      onChange(0);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-3 gap-3">
        {presets.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => handlePresetClick(amount)}
            className={cn(
              "py-4 px-4 rounded-2xl font-bold transition-all duration-300",
              "border-2 min-h-12 cursor-pointer",
              !isCustom && value === amount
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white text-text-main border-primary/10 hover:border-primary/40 hover:bg-surface-dim"
            )}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleCustomToggle}
        className={cn(
          "w-full py-4 px-4 rounded-2xl font-bold transition-all duration-300",
          "border-2 min-h-12 cursor-pointer",
          isCustom
            ? "bg-primary text-white border-primary shadow-md"
            : "bg-white text-text-main border-primary/10 hover:border-primary/40 hover:bg-surface-dim"
        )}
      >
        Custom Amount
      </button>

      {isCustom && (
        <div className="relative animate-fade-up">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted font-bold">
            ₹
          </span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter amount"
            value={customValue}
            onChange={handleCustomChange}
            autoFocus
            className={cn(
              "w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-primary/20",
              "font-body text-text-main bg-white",
              "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10",
              "placeholder:text-text-muted/50 min-h-12 transition-all"
            )}
          />
        </div>
      )}
    </div>
  );
}
