import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { METHODOLOGY } from "@/lib/process-data";

/** Metodología de ejecución de proyectos (7 etapas). */
export function Methodology() {
  return (
    <section className="section-padding relative border-t border-white/[0.06] bg-surface-raised/60" aria-labelledby="methodology-title">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Metodología"
          title={
            <span id="methodology-title">
              Siete etapas. <span className="text-slate-500">Cero improvisación.</span>
            </span>
          }
          lead="Una vez aprobada la propuesta, cada proyecto avanza con entregables claros en cada etapa. Los tiempos son referenciales y se ajustan en el diagnóstico."
        />

        <RevealGroup as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METHODOLOGY.map((step) => (
            <RevealItem as="li" key={step.number} className="card card-interactive flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="icon-tile">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-sm text-slate-400">{step.number}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-400">{step.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-5 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Duración</dt>
                  <dd className="mt-1 font-medium text-primary-300">{step.duration}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Entregable</dt>
                  <dd className="mt-1 text-slate-200">{step.deliverable}</dd>
                </div>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
