import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  /** Número de sección editorial ("02"). Opcional. */
  index?: string;
  className?: string;
}

export function SectionLabel({ children, index, className }: SectionLabelProps) {
  return (
    <span className={cn("eyebrow", className)}>
      {index && <span className="eyebrow-index">{index}</span>}
      {children}
    </span>
  );
}
