import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { DIFFERENTIATORS } from "@/lib/company-data";
import { PRIMARY_CTA } from "@/lib/site-config";

interface DifferentiatorsProps {
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
}

/** Propuesta de valor: encabezado fijo a la izquierda, diferenciadores a la derecha. */
export function Differentiators({
  eyebrow = "Por qué Evoltica",
  title = (
    <>
      Tecnología con criterio de negocio. <span className="text-slate-500">Y compromiso de largo plazo.</span>
    </>
  ),
  lead = "Seis principios que guían cada proyecto, desde el primer diagnóstico hasta el soporte del día a día.",
}: DifferentiatorsProps) {
  return (
    <section id="enfoque" className="section-padding relative bg-ink-800/60" aria-labelledby="differentiators-title">
      <div className="container-custom grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 id="differentiators-title" className="mt-5 text-display-md font-semibold text-white text-balance">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-lead text-slate-400">{lead}</p>
            <ButtonLink href={PRIMARY_CTA.href} className="mt-10">
              {PRIMARY_CTA.label}
            </ButtonLink>
          </div>
        </Reveal>

        <RevealGroup as="ol" className="lg:col-span-7">
          {DIFFERENTIATORS.map((item, index) => (
            <RevealItem
              as="li"
              key={item.title}
              className="group grid grid-cols-[auto_1fr] gap-5 border-t border-white/[0.08] py-8 first:border-t-0 first:pt-0 sm:gap-8 lg:py-10"
            >
              <span className="icon-tile transition-colors duration-300 group-hover:bg-primary group-hover:text-ink-950">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
