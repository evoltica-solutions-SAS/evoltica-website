import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { AboutStory } from "@/components/sections/AboutStory";
import { Differentiators } from "@/components/sections/Differentiators";
import { SITE } from "@/lib/site-config";

const description =
  "Conoce a EVOLTICA SOLUTIONS SAS: consultora tecnológica colombiana que optimiza la operación de las empresas con consultoría, ERP, infraestructura y soporte, y se queda para sostenerla.";

export const metadata: Metadata = {
  title: "Nosotros",
  description,
  alternates: { canonical: "/nosotros" },
  openGraph: { title: `Nosotros | ${SITE.legalName}`, description, url: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title={
          <>
            Un socio tecnológico <span className="gradient-text-blue">que se queda.</span>
          </>
        }
        lead="Somos una consultora tecnológica colombiana. Acompañamos a PYMEs y empresas medianas desde el primer diagnóstico hasta la operación diaria, con consultoría, ERP, infraestructura y soporte bajo un mismo equipo."
        breadcrumbs={[{ label: "Nosotros", href: "/nosotros" }]}
      />
      <AboutStory />
      <Differentiators eyebrow="Diferenciadores" />
      <CtaBand />
    </>
  );
}
