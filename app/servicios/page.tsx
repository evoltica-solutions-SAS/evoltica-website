import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Methodology } from "@/components/sections/Methodology";
import { EngagementTimeline } from "@/components/sections/EngagementTimeline";
import { SERVICES } from "@/lib/services-data";

const description =
  "Consultoría empresarial, ERP y automatización con Odoo, infraestructura y cloud, servicios administrados y desarrollo e integraciones. Conoce en detalle nuestras 5 líneas de servicio.";

export const metadata: Metadata = {
  title: "Servicios",
  description,
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios | EVOLTICA SOLUTIONS SAS",
    description,
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Portafolio de servicios"
        title={
          <>
            Cinco líneas de servicio. <span className="text-slate-500">Un solo socio tecnológico.</span>
          </>
        }
        lead="Transformamos procesos. Impulsamos crecimiento. Primero entendemos tu negocio, luego implementamos y automatizamos, y después nos quedamos para sostener la operación."
        breadcrumbs={[{ label: "Servicios", href: "/servicios" }]}
      >
        <nav aria-label="Ir a un servicio">
          <ul className="flex flex-wrap gap-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/servicios/${service.slug}`} className="tech-badge !px-4 !py-2">
                  <span className="text-slate-500">{service.number}</span>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
      <ServicesOverview />
      <Methodology />
      <EngagementTimeline />
      <CtaBand />
    </>
  );
}
