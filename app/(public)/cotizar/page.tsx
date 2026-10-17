import type { Metadata } from "next";
import { QuoteForm } from "@/components/commercial/QuoteForm";
import { RequestPage } from "@/components/commercial/RequestPage";
import { getSolution, solutionOptions } from "@/lib/catalog";
import { COMMERCIAL_PROTOTYPE_ENABLED } from "@/lib/server/env";
import { SITE } from "@/lib/site-config";

const description = "Solicita una cotización de una solución de Evoltica. El valor se define en una propuesta personalizada.";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description,
  alternates: { canonical: "/cotizar" },
  openGraph: { title: `Solicitar cotización | ${SITE.legalName}`, description, url: "/cotizar" },
  // Sin indexar hasta que el formulario reciba solicitudes reales (Fase 5).
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ solucion?: string | string[] }>;
}

export default async function CotizarPage({ searchParams }: PageProps) {
  const { solucion } = await searchParams;
  const solution = typeof solucion === "string" ? getSolution(solucion) : undefined;

  return (
    <RequestPage
      eyebrow="Cotización"
      href="/cotizar"
      title={
        <>
          Solicita una cotización. <span className="text-slate-500">Sin precios de catálogo.</span>
        </>
      }
      lead="Describe lo que necesitas. El valor se define en una propuesta personalizada, después de entender tu operación."
      form={COMMERCIAL_PROTOTYPE_ENABLED ? <QuoteForm solutions={solutionOptions()} defaultSolution={solution?.slug} /> : null}
      fallback={{
        subject: "Solicitud de cotización",
        message: solution
          ? `Hola, quisiera una cotización de: ${solution.title}.`
          : "Hola, quisiera una cotización. Lo que necesito es:",
      }}
    />
  );
}
