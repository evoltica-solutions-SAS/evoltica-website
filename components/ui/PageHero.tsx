import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  breadcrumbs: Crumb[];
  children?: React.ReactNode;
  className?: string;
}

/**
 * Cabecera estándar de páginas internas: migas, eyebrow, h1 único y lead.
 * Entrada en CSS (no Framer) para que el h1 —candidato a LCP— sea visible antes de hidratar.
 */
export function PageHero({ eyebrow, title, lead, breadcrumbs, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-36 lg:pb-24 lg:pt-48", className)}>
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="mask-fade-b absolute inset-0 grid-bg opacity-60" aria-hidden="true" />

      <div className="container-custom relative">
        <Breadcrumbs items={breadcrumbs} />
        <SectionLabel className="animate-enter">{eyebrow}</SectionLabel>
        <h1 className="mt-6 max-w-5xl animate-lift text-display-xl font-semibold text-white text-balance">{title}</h1>
        {lead && (
          <p className="mt-8 max-w-2xl animate-lift text-lead text-slate-400 text-pretty [animation-delay:0.1s]">
            {lead}
          </p>
        )}
        {children && <div className="mt-10 animate-enter [animation-delay:0.25s]">{children}</div>}
      </div>
    </section>
  );
}
