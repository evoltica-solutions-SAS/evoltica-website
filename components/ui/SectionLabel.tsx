import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn("section-label", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 inline-block" />
      {children}
    </span>
  );
}
