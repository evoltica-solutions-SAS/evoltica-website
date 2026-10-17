import type { Metadata } from "next";
import { DiagnosisForm } from "@/components/commercial/DiagnosisForm";
import { RequestPage } from "@/components/commercial/RequestPage";
import { getSolution, solutionOptions } from "@/lib/catalog";
import { COMMERCIAL_PROTOTYPE_ENABLED } from "@/lib/server/env";
import { SITE } from "@/lib/site-config";

const description = "Diagnóstico guiado para empresas que aún no saben qué solución tecnológica necesitan.";

export const metadata: Metadata = {
  title: "Diagnóstico",
  description,
  alternates: { canonical: "/diagnostico" },
  openGraph: { title: `Diagnóstico | ${SITE.legalName}`, description, url: "/diagnostico" },
  // Sin indexar hasta que el formulario reciba solicitudes reales (Fase 5).
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ solucion?: string | string[] }>;
}

export default async function DiagnosticoPage({ searchParams }: PageProps) {
  const { solucion } = await searchParams;
  const solution = typeof solucion === "string" ? getSolution(solucion) : undefined;

  return (
    <RequestPage
      eyebrow="Diagnóstico"
      href="/diagnostico"
      title={
        <>
          ¿No sabes qué solución necesitas? <span className="text-slate-500">Empecemos por el problema.</span>
        </>
      }
      lead="Cuatro pasos para entender qué quieres resolver, qué procesos se ven afectados y el contexto de tu empresa. Con eso, el equipo puede orientarte hacia la solución adecuada."
      form={
        COMMERCIAL_PROTOTYPE_ENABLED ? <DiagnosisForm solutions={solutionOptions()} defaultSolution={solution?.slug} /> : null
      }
      fallback={{
        subject: "Solicitud de diagnóstico",
        message: "Hola, quisiera un diagnóstico para mi empresa. Lo que quiero resolver es:",
      }}
    />
  );
}
