import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Trama } from "@/components/ui/Trama";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  breadcrumbs: Crumb[];
  children?: React.ReactNode;
  className?: string;
}

/**
 * Cabecera estándar de páginas internas: migas, eyebrow, h1 único y lead, con un
 * fragmento de la trama de marca recortado en la esquina superior derecha.
 * Entrada en CSS (no Framer) para que el h1 —candidato a LCP— sea visible antes de hidratar.
 */
const at = (seconds: number): React.CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

export function PageHero({ eyebrow, title, lead, breadcrumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/[0.08] pb-16 pt-36 lg:pb-24 lg:pt-44", className)}>
      <div
        className="pointer-events-none absolute -right-[42vw] top-24 w-[80vw] opacity-30 sm:-right-[28vw] lg:-right-[14vw] lg:top-20 lg:w-[42vw] lg:opacity-70"
        aria-hidden="true"
        style={{ ["--trama-delay" as string]: "calc(var(--intro-delay) + 0.3s)" }}
      >
        <Trama id="page-trama" band={56} hatch={false} />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/80 to-transparent lg:w-[70%]"
        aria-hidden="true"
      />

      <div className="container-custom relative">
        <Breadcrumbs items={breadcrumbs} />
        <span style={at(0.05)} className="block animate-enter">
          <SectionLabel>{eyebrow}</SectionLabel>
        </span>
        <h1 style={at(0.12)} className="mt-6 max-w-5xl animate-lift text-display-xl font-semibold text-white text-balance">{title}</h1>
        {lead && (
          <p style={at(0.22)} className="mt-8 max-w-2xl animate-lift text-lead text-slate-300 text-pretty">
            {lead}
          </p>
        )}
        {children && (
          <div style={at(0.34)} className="mt-10 animate-enter">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
