import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { ENGAGEMENT_STEPS } from "@/lib/services-data";
import { PRIMARY_CTA } from "@/lib/site-config";

interface EngagementTimelineProps {
  index?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
}

// Desplazamiento vertical de cada tarjeta apilada (sticky) en escritorio.
const STACK_OFFSETS = ["md:top-28", "md:top-32", "md:top-36", "md:top-40"];

/**
 * Embudo de entrada (4 pasos) como tarjetas que se apilan al hacer scroll.
 * Solo CSS (position: sticky): sin JavaScript y sin efectos decorativos.
 */
export function EngagementTimeline({
  index,
  eyebrow = "Proceso",
  title = (
    <>
      Cómo empezamos.
      <span className="block font-light text-slate-400">Sin letra pequeña.</span>
    </>
  ),
  lead = "Cuatro pasos y ningún compromiso hasta que tengas una propuesta con plan, tiempos y valores concretos.",
}: EngagementTimelineProps) {
  return (
    <section id="proceso" className="section-padding relative" aria-label="Proceso de trabajo">
      <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index={index}>{eyebrow}</SectionLabel>
            <h2 className="mt-6 text-display-md font-semibold text-white">{title}</h2>
            <p className="mt-6 max-w-sm leading-relaxed text-slate-400">{lead}</p>
            <ButtonLink href={PRIMARY_CTA.href} className="mt-10">
              Agendar reunión de descubrimiento
            </ButtonLink>
          </div>
        </Reveal>

        <ol className="lg:col-span-7 lg:col-start-6">
          {ENGAGEMENT_STEPS.map((step, stepIndex) => (
            <li
              key={step.number}
              className={`mb-6 border border-white/[0.1] bg-surface-raised md:sticky md:mb-[12vh] last:mb-0 ${STACK_OFFSETS[stepIndex]}`}
            >
              <div className="grid min-h-[16rem] grid-cols-[auto_1fr] gap-6 p-7 sm:gap-10 sm:p-10">
                <span
                  className="font-semibold leading-[0.78] tracking-[-0.06em] text-primary [font-size:clamp(4rem,3rem+4vw,7.5rem)]"
                  aria-hidden="true"
                >
                  {String(step.number).padStart(2, "0")}
                </span>
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <h3 className="text-display-sm font-semibold text-white">
                      <span className="sr-only">Paso {step.number}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                  <p className="flex items-center gap-3 border-t border-white/[0.08] pt-5 font-mono text-xs uppercase tracking-[0.14em] text-slate-300">
                    <span className="text-slate-400">Recibes</span>
                    <span className="h-px w-6 bg-primary" aria-hidden="true" />
                    {step.outcome}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
