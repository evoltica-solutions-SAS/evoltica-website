import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  /** Número de sección editorial ("02"). */
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
  /** Contenido opcional a la derecha (p. ej. un enlace) cuando align="left". */
  aside?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  size = "lg",
  className,
  aside,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "mb-14 lg:mb-20",
        centered
          ? "mx-auto max-w-3xl text-center"
          : "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
        className
      )}
    >
      <div className={cn(!centered && "max-w-3xl")}>
        <SectionLabel index={index}>{eyebrow}</SectionLabel>
        <h2
          className={cn(
            "mt-5 font-semibold text-white text-balance",
            size === "lg" ? "text-display-lg" : "text-display-md"
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-6 text-lead text-slate-400 text-pretty",
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {aside && !centered && <div className="shrink-0">{aside}</div>}
    </Reveal>
  );
}
