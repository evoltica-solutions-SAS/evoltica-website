import type { Metadata } from "next";
import { ConsultationForm } from "@/components/commercial/ConsultationForm";
import { RequestPage } from "@/components/commercial/RequestPage";
import { getSolution, solutionOptions } from "@/lib/catalog";
import { COMMERCIAL_PROTOTYPE_ENABLED } from "@/lib/server/env";
import { SITE } from "@/lib/site-config";

const description = "Solicita una consultoría con el equipo de Evoltica e indica las franjas que te quedan mejor.";

export const metadata: Metadata = {
  title: "Consultoría",
  description,
  alternates: { canonical: "/consultoria" },
  openGraph: { title: `Consultoría | ${SITE.legalName}`, description, url: "/consultoria" },
  // Sin indexar hasta que el formulario reciba solicitudes reales (Fase 5).
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ solucion?: string | string[] }>;
}

export default async function ConsultoriaPage({ searchParams }: PageProps) {
  const { solucion } = await searchParams;
  const solution = typeof solucion === "string" ? getSolution(solucion) : undefined;

  return (
    <RequestPage
      eyebrow="Consultoría"
      href="/consultoria"
      title={
        <>
          Conversemos sobre tu operación. <span className="text-slate-500">Tú eliges el tema.</span>
        </>
      }
      lead="Cuéntanos qué quieres revisar y las franjas que te quedan mejor. El equipo propone el horario: este formulario no agenda reuniones."
      form={
        COMMERCIAL_PROTOTYPE_ENABLED ? (
          <ConsultationForm solutions={solutionOptions()} defaultSolution={solution?.slug} />
        ) : null
      }
      fallback={{
        subject: "Solicitud de consultoría",
        message: "Hola, quisiera una consultoría. El tema que quiero revisar es:",
      }}
    />
  );
}
