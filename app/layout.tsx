import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site-config";

const siteUrl = SITE_URL;

// Familias tipográficas de marca, auto-alojadas por next/font (sin @import bloqueante).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EVOLTICA SOLUTIONS SAS — Transformamos procesos, impulsamos crecimiento",
    template: "%s | EVOLTICA SOLUTIONS SAS",
  },
  description:
    "Consultoría empresarial, ERP y automatización (Odoo), infraestructura y cloud, servicios administrados y desarrollo e integraciones. El socio tecnológico que se queda contigo, no solo implementa.",
  keywords: [
    "consultoría empresarial",
    "ERP Odoo Colombia",
    "automatización de procesos",
    "infraestructura y cloud",
    "servicios administrados TI",
    "desarrollo de software a medida",
    "integraciones API",
    "transformación digital Colombia",
    "hosting ERP administrado",
    "mesa de ayuda y soporte TI",
    "EVOLTICA SOLUTIONS",
  ],
  authors: [{ name: "EVOLTICA SOLUTIONS SAS" }],
  creator: "EVOLTICA SOLUTIONS SAS",
  publisher: "EVOLTICA SOLUTIONS SAS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "EVOLTICA SOLUTIONS SAS",
    title: "EVOLTICA SOLUTIONS SAS — Transformamos procesos, impulsamos crecimiento",
    description:
      "Consultoría empresarial, ERP y automatización (Odoo), infraestructura y cloud, servicios administrados y desarrollo e integraciones.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "EVOLTICA SOLUTIONS SAS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evoltica",
    creator: "@evoltica",
    title: "EVOLTICA SOLUTIONS SAS — Transformamos procesos, impulsamos crecimiento",
    description:
      "Consultoría empresarial, ERP y automatización (Odoo), infraestructura y cloud, servicios administrados y desarrollo e integraciones.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F19",
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body className="bg-background font-sans text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Saltar al contenido principal
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
