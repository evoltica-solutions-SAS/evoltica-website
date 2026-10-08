import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services-data";
import { CASE_STUDIES } from "@/lib/cases-data";
import { SITE_URL } from "@/lib/site-config";

/** Sitemap generado desde los datos: refleja siempre las rutas públicas vigentes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/servicios`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/servicios/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    { url: `${SITE_URL}/nosotros`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacto`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];

  // /casos-de-exito es noindex mientras no haya casos publicados.
  if (CASE_STUDIES.length > 0) {
    routes.push({ url: `${SITE_URL}/casos-de-exito`, lastModified, changeFrequency: "monthly", priority: 0.8 });
  }

  return routes;
}
