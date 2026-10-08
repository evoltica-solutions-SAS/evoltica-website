import { SERVICES } from "@/lib/services-data";
import { WHATSAPP_NUMBER } from "@/lib/utils";

/**
 * Configuración global del sitio: identidad, contacto y navegación.
 * Fuente única de verdad — ningún componente debe hardcodear estos valores.
 * Los datos de contacto son afirmaciones reales de la empresa: no se modifican
 * sin autorización (ver .claude/AI_GUIDELINES.md § 12).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://evoltica.com.co";

export const SITE = {
  name: "EVOLTICA SOLUTIONS",
  legalName: "EVOLTICA SOLUTIONS SAS",
  tagline: "Transformamos procesos. Impulsamos crecimiento.",
  promise: "El socio tecnológico que optimiza tu operación y se queda para sostenerla.",
  country: "Colombia",
  email: "comercial@evoltica.com",
  phoneDisplay: "+57 314 403 6151",
  phoneHref: `tel:+${WHATSAPP_NUMBER}`,
  officeHours: "Lunes a viernes, 8:00 a. m. – 6:00 p. m.",
  responseTime: "4 horas hábiles",
} as const;

// TODO: INFORMACIÓN PENDIENTE DE EVOLTICA — confirmar que estos perfiles existen
// y pertenecen a la empresa (se heredan de la versión anterior del sitio).
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/evoltica" },
  { label: "X (Twitter)", href: "https://twitter.com/evoltica" },
  { label: "GitHub", href: "https://github.com/evoltica" },
] as const;

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Casos de éxito", href: "/casos-de-exito" },
  { label: "Contacto", href: "/contacto" },
];

export const SERVICE_NAV: NavItem[] = SERVICES.map((service) => ({
  label: service.title,
  href: `/servicios/${service.slug}`,
}));

export const PRIMARY_CTA: NavItem = { label: "Solicitar Consultoría", href: "/contacto" };
