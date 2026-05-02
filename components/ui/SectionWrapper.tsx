import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: "cream" | "white" | "dark" | "gold-pale" | "surface-dim" | "crimson";
  id?: string;
  className?: string;
  fullWidth?: boolean;
}

const bgStyles = {
  cream: "bg-surface",
  white: "bg-white",
  dark: "bg-text-main text-white",
  "gold-pale": "bg-surface-dim",
  "surface-dim": "bg-surface-dim",
  crimson: "bg-accent text-white",
};

export default function SectionWrapper({
  children,
  bg = "white",
  id,
  className,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", bgStyles[bg], className)}>
      <div
        className={cn(
          !fullWidth && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        )}
      >
        {children}
      </div>
    </section>
  );
}
