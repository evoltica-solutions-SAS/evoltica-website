import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { StrikeText } from "@/components/ui/StrikeText";
import { DIFFERENTIATORS } from "@/lib/company-data";
import { PRIMARY_CTA } from "@/lib/site-config";

interface DifferentiatorsProps {
  index?: string;
  eyebrow?: string;
}

/**
 * Propuesta de valor como contraste: lo que deliberadamente no hacemos (tachado)
 * frente a lo que hacemos en su lugar. Posicionamiento por decisiones, no por adjetivos.
 */
export function Differentiators({ index, eyebrow = "Cómo trabajamos" }: DifferentiatorsProps) {
  return (
    <section id="enfoque" className="section-padding relative bg-surface-deep" aria-labelledby="differentiators-title">
      <div className="container-custom">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index={index}>{eyebrow}</SectionLabel>
            </Reveal>
            <SplitReveal
              id="differentiators-title"
              className="mt-6 text-display-lg font-semibold text-white"
              lines={[
                { text: "Lo que hacemos distinto" },
                { text: "empieza por lo que no hacemos.", className: "font-light text-slate-400" },
              ]}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="text-lead text-slate-300">
              Seis decisiones que definen cómo trabajamos con cada empresa, desde la primera reunión.
            </p>
          </Reveal>
        </div>

        <div className="hidden grid-cols-12 border-b border-white/[0.1] pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 md:grid">
          <span className="col-span-5">No hacemos</span>
          <span className="col-span-7">Hacemos</span>
        </div>

        <RevealGroup as="ol">
          {DIFFERENTIATORS.map((item) => (
            <RevealItem
              as="li"
              key={item.title}
              className="group grid gap-3 border-b border-white/[0.1] py-7 md:grid-cols-12 md:items-baseline md:gap-6 lg:py-9"
            >
              <p className="text-lg text-slate-400 md:col-span-5">
                <span className="sr-only">No hacemos: </span>
                <StrikeText>{item.not}</StrikeText>
              </p>
              <div className="md:col-span-7">
                <p className="text-display-sm font-semibold text-white">
                  <span className="sr-only">Hacemos: </span>
                  {item.instead}
                </p>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14">
          <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
