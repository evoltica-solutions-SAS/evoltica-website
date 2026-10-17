import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { SolutionsCatalog } from "@/components/sections/SolutionsCatalog";
import { PUBLISHED_SOLUTIONS } from "@/lib/catalog";
import { SITE, SITE_URL } from "@/lib/site-config";

const description =
  "Catálogo de soluciones de Evoltica: consultoría, ERP y automatización, infraestructura y cloud, servicios administrados y desarrollo a medida. Encuentra la que necesita tu empresa y solicita una cotización.";

export const metadata: Metadata = {
  title: "Soluciones",
  description,
  alternates: { canonical: "/soluciones" },
  openGraph: { title: `Soluciones | ${SITE.legalName}`, description, url: "/soluciones" },
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo de soluciones"
        title={
          <>
            Encuentra la solución <span className="text-slate-500">que tu operación necesita.</span>
          </>
        }
        lead="Explora por línea de servicio o busca por necesidad. Cada solución explica qué cubre y cómo empezar. Si no sabes cuál elegir, empezamos por un diagnóstico."
        breadcrumbs={[{ label: "Soluciones", href: "/soluciones" }]}
        className="pb-4 lg:pb-8"
      />
      <SolutionsCatalog />
      <CtaBand
        title={
          <>
            ¿No sabes por dónde empezar? <span className="text-slate-500">Hagamos un diagnóstico.</span>
          </>
        }
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Catálogo de soluciones de Evoltica",
          itemListElement: PUBLISHED_SOLUTIONS.map((solution, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/soluciones/${solution.slug}`,
            name: solution.title,
          })),
        }}
      />
    </>
  );
}
