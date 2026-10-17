import Link from "next/link";
import { ArrowUpRight, Check, Info, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EngagementTimeline } from "@/components/sections/EngagementTimeline";
import { SERVICES, type ServiceData, type ServiceListItem } from "@/lib/services-data";
import { findSolutionForOffer } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ServiceDetailProps {
  service: ServiceData;
}

/**
 * Cuerpo de la página /servicios/[slug]: qué incluye → proceso → herramientas →
 * beneficios / para quién → servicios relacionados. El proceso es el embudo real
 * (ENGAGEMENT_STEPS); los beneficios solo se muestran si el servicio los define.
 */
export function ServiceDetail({ service }: ServiceDetailProps) {
  const related = SERVICES.filter((other) => other.slug !== service.slug);
  const modules: (ServiceListItem & { tag?: string })[] =
    service.items.length > 0 ? service.items : (service.tiers ?? []);

  return (
    <>
      {/* Alcance */}
      <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="scope-title">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Qué incluye"
            size="md"
            title={<span id="scope-title">{service.tiers ? "Niveles de acompañamiento" : "Alcance del servicio"}</span>}
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const solution = findSolutionForOffer(service.slug, module.title);
              return (
                <RevealItem as="article" key={module.title} className="card card-interactive flex flex-col p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="icon-tile">
                      <module.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {module.tag && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400">
                        {module.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{module.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-slate-400">{module.description}</p>
                  {solution && (
                    <Link href={`/soluciones/${solution.slug}`} className="link-arrow mt-6 text-sm">
                      Ver solución
                      <span className="sr-only">: {module.title}</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Proceso: cómo empieza el servicio (embudo real, común a todas las líneas) */}
      <div className="border-t border-white/[0.06]">
        <EngagementTimeline
          title={
            <>
              Cómo empezamos.
              <span className="block font-light text-slate-400">{service.title}, paso a paso.</span>
            </>
          }
        />
      </div>

      {/* Plataformas, herramientas y stack */}
      {(service.platforms || service.automationTools || service.techStack) && (
        <section className="section-padding relative bg-surface-raised/60" aria-labelledby="stack-title">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Tecnología"
              size="md"
              title={<span id="stack-title">Las herramientas detrás del servicio.</span>}
            />

            {service.platforms && (
              <RevealGroup className="grid gap-4 md:grid-cols-3">
                {service.platforms.map((platform, index) => (
                  <RevealItem
                    as="article"
                    key={platform.name}
                    className={cn("card p-8", index === 0 && "border-gradient bg-surface-raised")}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-400">
                      {platform.tier}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">{platform.name}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400">{platform.description}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}

            {service.automationTools && (
              <Reveal className="mt-12">
                <h3 className="eyebrow">Automatización</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {service.automationTools.map((tool) => (
                    <li key={tool.name} className="border border-white/[0.1] p-5">
                      <p className="font-mono text-lg text-white">{tool.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{tool.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {service.techStack && (
              <Reveal>
                <ul className="flex flex-wrap gap-2.5">
                  {service.techStack.map((tech) => (
                    <li key={tech} className="tech-badge !px-4 !py-2 !text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Para quién / objetivo / nota */}
      {(service.objective || service.clientTypes || service.valueBullets || service.note) && (
        <section
          className="relative border-t border-white/[0.06] py-16 lg:py-24"
          aria-label="Para quién es este servicio"
        >
          <div className="container-custom grid gap-6 lg:grid-cols-2 lg:[&>*:only-child]:col-span-2">
            {service.objective && (
              <Reveal className="card p-8 lg:p-10">
                <Target className="h-6 w-6 text-primary-400" aria-hidden="true" />
                <p className="eyebrow mt-6">Objetivo</p>
                <p className="mt-4 text-display-sm font-semibold text-white">{service.objective}</p>
              </Reveal>
            )}

            {service.valueBullets && (
              <Reveal className="card p-8 lg:p-10">
                <SectionLabel>Lo que gana tu empresa</SectionLabel>
                <ul className="mt-6 space-y-4">
                  {service.valueBullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-lg text-white">
                      <Check className="h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {service.clientTypes && (
              <Reveal className="card p-8 lg:p-10" delay={0.08}>
                <SectionLabel>Ideal para</SectionLabel>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {service.clientTypes.map((type) => (
                    <li key={type} className="border border-white/[0.14] px-4 py-2 text-slate-200">
                      {type}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {service.note && (
              <Reveal className="card flex gap-4 p-8 lg:col-span-2 lg:p-10">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
                <p className="text-lead text-slate-300">{service.note}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Otros servicios */}
      <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="related-title">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Otros servicios"
            size="md"
            title={<span id="related-title">Un solo socio para toda tu operación.</span>}
          />
          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((other) => (
              <RevealItem as="li" key={other.slug}>
                <Link
                  href={`/servicios/${other.slug}`}
                  className="card card-interactive group flex h-full flex-col p-7"
                >
                  <span className="flex items-center justify-between">
                    <span className="icon-tile">
                      <other.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:text-primary-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-6 font-mono text-xs text-slate-400">{other.number}</span>
                  <span className="mt-1 text-lg font-semibold text-white">{other.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-400">{other.summary}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
