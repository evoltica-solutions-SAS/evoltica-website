import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { ChapterBackdrop } from "@/components/ui/ChapterBackdrop";
import { OPERATIONAL_SYMPTOMS } from "@/lib/company-data";
import { PRIMARY_CTA } from "@/lib/site-config";

/**
 * Capítulo claro: el problema contado en el idioma del dueño de la empresa.
 * Su fondo se "abre" al llegar desde el hero oscuro (cambio de capítulo).
 */
export function Symptoms() {
  return (
    <section className="relative py-24 text-navy-900 lg:py-36" aria-labelledby="symptoms-title">
      <ChapterBackdrop className="band-light" />
      <div className="band-light-scope container-custom relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel index="01">
                Diagnóstico rápido
              </SectionLabel>
            </Reveal>
            <SplitReveal
              id="symptoms-title"
              className="mt-6 text-display-lg font-semibold text-navy-900"
              lines={[
                { text: "Tu operación no necesita más software." },
                { text: "Necesita que todo cuadre.", className: "mt-3 font-light text-slate-600" },
              ]}
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="max-w-xl text-lead text-slate-700">
              Estas son las situaciones que más escuchamos en la primera conversación. Si alguna te suena,
              no es un problema de tecnología: es de procesos.
            </p>
          </Reveal>

          <RevealGroup as="ol" className="mt-12">
            {OPERATIONAL_SYMPTOMS.map((symptom, index) => (
              <RevealItem as="li" key={symptom} className="border-t border-navy-200">
                <span className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[4.5rem_1fr] lg:py-7">
                  <span className="font-mono text-sm text-primary-800">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-xl font-medium leading-snug tracking-tight text-navy-900 sm:text-2xl">
                    {symptom}
                  </span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-4 flex flex-col gap-6 border-t border-navy-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-lg font-medium text-navy-900">
              ¿Te reconociste en dos o más? Empecemos por un diagnóstico.
            </p>
            <Link
              href={PRIMARY_CTA.href}
              className="btn group bg-navy-900 text-snow hover:bg-primary hover:text-ink-950"
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
