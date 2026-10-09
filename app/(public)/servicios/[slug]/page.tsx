import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";
import { SITE, SITE_URL } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const path = `/servicios/${service.slug}`;
  return {
    title: service.title,
    description: service.summary,
    keywords: service.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.title} | ${SITE.legalName}`,
      description: service.summary,
      url: path,
    },
    twitter: {
      title: `${service.title} | ${SITE.legalName}`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const whatsappMessage = `Hola, me interesa el servicio de ${service.title} y quisiera recibir asesoría.`;

  return (
    <>
      <PageHero
        eyebrow={`${service.number} — ${service.tag}`}
        title={service.title}
        lead={service.intro}
        breadcrumbs={[
          { label: "Servicios", href: "/servicios" },
          { label: service.title, href: `/servicios/${service.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={`/contacto?servicio=${service.slug}`}>Solicitar información</ButtonLink>
          <a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        </div>
      </PageHero>

      <ServiceDetail service={service} />

      <CtaBand
        title={
          <>
            ¿{service.title} para tu empresa? <span className="text-slate-500">Empecemos por entenderla.</span>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: service.intro,
          url: `${SITE_URL}/servicios/${service.slug}`,
          areaServed: { "@type": "Country", name: "Colombia" },
          provider: { "@type": "Organization", name: SITE.legalName, url: SITE_URL },
        }}
      />
    </>
  );
}
