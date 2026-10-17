import type { Metadata } from "next";
import { FileSearch, Lightbulb, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CaseShowcase } from "@/components/sections/CaseShowcase";
import { CASE_STUDIES } from "@/lib/cases-data";
import { SITE } from "@/lib/site-config";

const hasCases = CASE_STUDIES.length > 0;
const description =
  "Casos de éxito de EVOLTICA SOLUTIONS SAS en consultoría, ERP con Odoo, automatización e infraestructura: reto, solución y resultado de cada proyecto.";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description,
  alternates: { canonical: "/casos-de-exito" },
  openGraph: { title: `Casos de éxito | ${SITE.legalName}`, description, url: "/casos-de-exito" },
  // Sin casos publicados la página no aporta contenido indexable propio.
  robots: hasCases ? undefined : { index: false, follow: true },
};

const CASE_FORMAT = [
  {
    icon: FileSearch,
    title: "Reto",
    description: "La situación real de la empresa: qué proceso dolía, qué se hacía a mano, qué información faltaba.",
  },
  {
    icon: Lightbulb,
    title: "Solución",
    description: "El diagnóstico, la implementación y las automatizaciones que pusimos en marcha, y por qué.",
  },
  {
    icon: TrendingUp,
    title: "Resultado",
    description: "El impacto medido en la operación, con cifras aprobadas por el propio cliente.",
  },
];

export default function CasosDeExitoPage() {
  return (
    <>
      <PageHero
        eyebrow="Casos de éxito"
        title={
          hasCases ? (
            "Resultados con nombre propio."
          ) : (
            <>
              Resultados con nombre propio. <span className="text-slate-500">Muy pronto.</span>
            </>
          )
        }
        lead={
          hasCases
            ? "Proyectos reales de consultoría, ERP, automatización e infraestructura, contados con la autorización de cada cliente."
            : "Estamos documentando nuestros primeros casos junto a cada cliente. Solo publicamos resultados reales, con su autorización y con cifras que ellos mismos aprueban."
        }
        breadcrumbs={[{ label: "Casos de éxito", href: "/casos-de-exito" }]}
      />

      {hasCases ? (
        <section className="section-padding relative border-t border-white/[0.06]" aria-label="Casos publicados">
          <div className="container-custom">
            <CaseShowcase />
          </div>
        </section>
      ) : (
        <section className="section-padding relative border-t border-white/[0.06]" aria-labelledby="format-title">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Cómo los contaremos"
              size="md"
              title={<span id="format-title">Cada caso, con la misma estructura honesta.</span>}
            />
            <RevealGroup as="ol" className="grid gap-4 md:grid-cols-3">
              {CASE_FORMAT.map((step, index) => (
                <RevealItem as="li" key={step.title} className="card p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">{step.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBand
        title={
          <>
            ¿Quieres que tu empresa sea el próximo caso? <span className="text-slate-500">Hablemos.</span>
          </>
        }
      />
    </>
  );
}
