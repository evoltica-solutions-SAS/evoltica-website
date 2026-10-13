import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { EngagementTimeline } from "@/components/sections/EngagementTimeline";
import { FaqSection } from "@/components/sections/FaqSection";
import { SITE } from "@/lib/site-config";

const description = `Agenda una reunión de descubrimiento sin compromiso con ${SITE.legalName}. Consultoría, ERP con Odoo, automatización, infraestructura y soporte.`;

export const metadata: Metadata = {
  title: "Contacto",
  description,
  alternates: { canonical: "/contacto" },
  openGraph: { title: `Contacto | ${SITE.legalName}`, description, url: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title={
          <>
            Hablemos de tu operación. <span className="text-slate-500">El primer paso es una conversación.</span>
          </>
        }
        lead="Cuéntanos qué quieres mejorar y coordinamos una reunión de descubrimiento."
        breadcrumbs={[{ label: "Contacto", href: "/contacto" }]}
        className="pb-4 lg:pb-8"
      />
      <ContactSection showHeading={false} />
      <EngagementTimeline
        eyebrow="Qué pasa después"
        title={
          <>
            Después de enviar el formulario, <span className="text-slate-500">esto es lo que sigue.</span>
          </>
        }
      />
      <FaqSection />
    </>
  );
}
