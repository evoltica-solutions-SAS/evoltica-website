import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/services-data";

/** Índice editorial de las 5 líneas de servicio, en el orden del embudo comercial. */
export function ServicesIndex() {
  return (
    <section id="servicios" className="section-padding relative border-t border-white/[0.06]" aria-labelledby="services-title">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Servicios"
          title={
            <span id="services-title">
              Cinco líneas de servicio. <span className="text-slate-500">Un solo socio tecnológico.</span>
            </span>
          }
          lead="Ordenadas como trabajamos: primero entendemos tu negocio, luego implementamos y automatizamos, después sostenemos la operación."
          aside={
            <ButtonLink href="/servicios" variant="secondary">
              Ver portafolio completo
            </ButtonLink>
          }
        />

        <RevealGroup as="ol" className="border-t border-white/[0.08]">
          {SERVICES.map((service) => (
            <RevealItem as="li" key={service.slug} className="border-b border-white/[0.08]">
              <Link
                href={`/servicios/${service.slug}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 py-8 transition-colors sm:gap-x-8 lg:grid-cols-[5rem_1.1fr_1fr_auto] lg:items-center lg:py-10"
              >
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand-line transition-transform duration-700 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span className="pt-2 font-mono text-sm text-slate-400 transition-colors group-hover:text-primary-400 lg:pt-0">
                  {service.number}
                </span>

                <span className="min-w-0">
                  <span className="block text-display-sm font-semibold text-white transition-transform duration-500 group-hover:translate-x-1.5">
                    {service.title}
                  </span>
                  <span className="mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-primary-400/90">
                    {service.tag}
                  </span>
                </span>

                <span className="col-span-3 col-start-1 text-[0.95rem] leading-relaxed text-slate-400 sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto">
                  {service.summary}
                </span>

                <span className="col-start-3 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.12] text-white transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-ink-950 lg:col-start-auto lg:row-start-auto">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
