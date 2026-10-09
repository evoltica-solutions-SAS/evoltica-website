import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIntro } from "@/components/layout/BrandIntro";
import { PageTransition } from "@/components/layout/PageTransition";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site-config";

const siteUrl = SITE_URL;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EVOLTICA SOLUTIONS SAS",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  description:
    "Consultoría empresarial, ERP y automatización con Odoo, infraestructura y cloud, servicios administrados y desarrollo e integraciones para empresas que buscan evolucionar.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-314-403-6151",
    email: "comercial@evoltica.com",
    contactType: "customer service",
    areaServed: "CO",
    availableLanguage: "Spanish",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
    addressRegion: "Colombia",
  },
  sameAs: [
    "https://www.linkedin.com/company/evoltica",
    "https://twitter.com/evoltica",
    "https://github.com/evoltica",
  ],
  knowsAbout: [
    "Consultoría Empresarial",
    "ERP",
    "Odoo",
    "Automatización de Procesos",
    "Infraestructura Cloud",
    "Servicios Administrados de TI",
    "Desarrollo de Software",
    "Integraciones API",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EVOLTICA SOLUTIONS SAS",
  url: siteUrl,
  inLanguage: "es-CO",
};

/**
 * Chrome del sitio público (marketing): intro de marca, cortina entre páginas,
 * navegación, footer, WhatsApp y JSON-LD de la organización. El portal (/app),
 * el admin (/admin) y las pantallas de acceso tienen sus propios layouts (ADR-012).
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <BrandIntro />
      <PageTransition />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
