import type { Metadata } from "next";
import { ServicesDetail } from "@/components/sections/ServicesDetail";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Consultoría empresarial, ERP y automatización con Odoo, infraestructura y cloud, servicios administrados y desarrollo e integraciones. Conoce en detalle nuestras 5 líneas de servicio.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios | EVOLTICA SOLUTIONS SAS",
    description:
      "Consultoría empresarial, ERP y automatización, infraestructura y cloud, servicios administrados y desarrollo e integraciones.",
    url: "/servicios",
  },
};

export default function ServiciosPage() {
  return <ServicesDetail />;
}
