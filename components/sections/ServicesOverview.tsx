import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/services-data";

/**
 * Bloque por servicio en /servicios. Cada bloque conserva id={slug} para que los
 * enlaces antiguos (/servicios#slug) sigan aterrizando en el lugar correcto.
 */
export function ServicesOverview() {
  return (
    <section className="relative pb-12" aria-label="Líneas de servicio">
      <div className="container-custom">
        {SERVICES.map((service) => (
          <Reveal key={service.slug} amount={0.15}>
            <article
              id={service.slug}
              className="grid gap-10 border-t border-white/[0.08] py-14 lg:grid-cols-12 lg:gap-10 lg:py-20"
            >
              <div className="lg:col-span-6">
                <div className="flex items-center gap-4">
                  <span className="icon-tile h-12 w-12">
                    <service.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
                    {service.number} — <span className="text-primary-400">{service.tag}</span>
                  </p>
                </div>
                <h2 className="mt-7 text-display-md font-semibold text-white">{service.title}</h2>
                <p className="mt-5 max-w-xl text-lead text-slate-400">{service.summary}</p>
                <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                  <ButtonLink href={`/servicios/${service.slug}`}>Ver el servicio</ButtonLink>
                  <ButtonLink href={`/contacto?servicio=${service.slug}`} variant="secondary">
                    Solicitar información
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <p className="eyebrow">Incluye</p>
                <ul className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 py-4 text-slate-200">
                      <Check className="h-4 w-4 shrink-0 text-primary-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.clientTypes && (
                  <p className="mt-6 text-sm leading-relaxed text-slate-400">
                    <span className="text-slate-200">Ideal para:</span> {service.clientTypes.join(" · ")}
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
