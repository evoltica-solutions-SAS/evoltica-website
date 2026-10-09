import type { LucideIcon } from "lucide-react";
import { ENGAGEMENT_STEPS, SERVICES, type ServiceData } from "@/lib/services-data";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  catalogViolations,
  PRICED_MODES,
  type CommercialMode,
  type ServiceLineSlug,
  type Solution,
} from "@/lib/domain";

/**
 * Catálogo de soluciones (ADR-014): fuente tipada única.
 *
 * El TEXTO de cada solución (título, descripción, ícono) se toma de
 * lib/services-data.ts, no se duplica: aquí solo se asigna slug y modalidad
 * comercial a cada oferta ya publicada en las páginas de servicio.
 *
 * Reglas (BUSINESS_CONTEXT § Política de precios):
 * - Ningún precio, paquete ni SLA que Evoltica no haya aprobado.
 * - COMPRA_DIRECTA / SUSCRIPCION solo con `price` aprobado (se valida al cargar
 *   el módulo: un error rompe el build).
 * - Desarrollo e Integraciones: siempre PERSONALIZADO (cotización a medida).
 */

export interface CatalogSolution extends Solution {
  icon: LucideIcon;
}

interface Assignment {
  /** Título exacto del ítem en services-data (clave de enlace). */
  item: string;
  slug: string;
  mode?: CommercialMode;
}

const ASSIGNMENTS: Record<ServiceLineSlug, { mode: CommercialMode; items: Assignment[] }> = {
  "consultoria-empresarial": {
    mode: "CONSULTORIA",
    items: [
      { item: "Diagnóstico empresarial", slug: "diagnostico-empresarial" },
      { item: "Levantamiento de procesos", slug: "levantamiento-de-procesos" },
      { item: "Optimización operativa", slug: "optimizacion-operativa" },
      { item: "Transformación digital", slug: "transformacion-digital" },
      { item: "Gestión documental", slug: "gestion-documental" },
      { item: "Diseño organizacional", slug: "diseno-organizacional" },
    ],
  },
  "erp-y-automatizacion": {
    mode: "COTIZACION",
    items: [
      { item: "Inventarios", slug: "erp-inventarios" },
      { item: "Ventas / POS", slug: "erp-ventas-pos" },
      { item: "Compras", slug: "erp-compras" },
      { item: "CRM", slug: "erp-crm" },
      { item: "Nómina / RRHH", slug: "erp-nomina-rrhh" },
      { item: "Integraciones", slug: "erp-integraciones" },
    ],
  },
  "infraestructura-y-cloud": {
    mode: "COTIZACION",
    items: [
      { item: "Hosting ERP", slug: "hosting-erp" },
      { item: "VPS administrados", slug: "vps-administrados" },
      { item: "Backups", slug: "backups" },
      { item: "Correo corporativo", slug: "correo-corporativo" },
      { item: "VPN", slug: "vpn" },
      { item: "Monitoreo", slug: "monitoreo" },
      { item: "Infraestructura híbrida", slug: "infraestructura-hibrida" },
    ],
  },
  "servicios-administrados": {
    mode: "COTIZACION",
    items: [
      { item: "Administración ERP", slug: "administracion-erp" },
      { item: "Mesa de ayuda", slug: "mesa-de-ayuda" },
      { item: "Soporte TI", slug: "soporte-ti" },
      { item: "Administración tecnológica", slug: "administracion-tecnologica" },
      { item: "Gestión de usuarios", slug: "gestion-de-usuarios" },
      { item: "Analistas de procesos", slug: "analistas-de-procesos" },
    ],
  },
  "desarrollo-e-integraciones": {
    mode: "PERSONALIZADO",
    items: [
      { item: "Aplicaciones web", slug: "aplicaciones-web" },
      { item: "Portales empresariales", slug: "portales-empresariales" },
      { item: "Ecommerce", slug: "ecommerce" },
      { item: "APIs personalizadas", slug: "apis-personalizadas" },
      { item: "Integraciones", slug: "integraciones-a-medida" },
      { item: "Automatizaciones avanzadas", slug: "automatizaciones-avanzadas" },
    ],
  },
};

/** Herramientas confirmadas en la página de la línea (plataformas, automatización, stack). */
function lineTools(line: ServiceData): string[] {
  return [
    ...(line.platforms?.map((platform) => platform.name) ?? []),
    ...(line.automationTools?.map((tool) => tool.name) ?? []),
    ...(line.techStack ?? []),
  ];
}

function buildCatalog(): CatalogSolution[] {
  const solutions: CatalogSolution[] = [];
  for (const line of SERVICES) {
    const config = ASSIGNMENTS[line.slug as ServiceLineSlug];
    if (!config) throw new Error(`Catálogo: la línea "${line.slug}" no tiene asignaciones.`);
    const offers = line.items.length > 0 ? line.items : line.tiers ?? [];
    for (const assignment of config.items) {
      const offer = offers.find((candidate) => candidate.title === assignment.item);
      if (!offer) throw new Error(`Catálogo: "${assignment.item}" no existe en ${line.slug} (services-data).`);
      solutions.push({
        slug: assignment.slug,
        line: line.slug as ServiceLineSlug,
        title: offer.title,
        summary: offer.description,
        icon: offer.icon,
        mode: assignment.mode ?? config.mode,
        status: "PUBLICADA",
        scope: [],
        // Única condición previa confirmada: la nota de activación de la línea.
        requirements: line.note ? [line.note] : [],
        tools: lineTools(line),
        idealFor: line.clientTypes ?? [],
        keywords: [offer.title, line.title],
      });
    }
  }

  const problems = solutions.flatMap(catalogViolations);
  const slugs = solutions.map((solution) => solution.slug);
  const duplicated = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicated.length) problems.push(`Slugs duplicados: ${duplicated.join(", ")}`);
  if (problems.length) throw new Error(`Catálogo inválido:\n${problems.join("\n")}`);
  return solutions;
}

export const CATALOG: CatalogSolution[] = buildCatalog();

export const PUBLISHED_SOLUTIONS = CATALOG.filter((solution) => solution.status === "PUBLICADA");

export function getSolution(slug: string): CatalogSolution | undefined {
  return PUBLISHED_SOLUTIONS.find((solution) => solution.slug === slug);
}

export function getSolutionsByLine(line: string): CatalogSolution[] {
  return PUBLISHED_SOLUTIONS.filter((solution) => solution.line === line);
}

/** Ficha de la oferta `title` de una línea (para enlazar desde /servicios/[slug]). */
export function findSolutionForOffer(line: string, title: string): CatalogSolution | undefined {
  return PUBLISHED_SOLUTIONS.find((solution) => solution.line === line && solution.title === title);
}

export function getLine(slug: ServiceLineSlug): ServiceData {
  const line = SERVICES.find((service) => service.slug === slug);
  if (!line) throw new Error(`Línea inexistente: ${slug}`);
  return line;
}

/** Etiqueta y explicación de cada modalidad comercial. */
export const MODE_META: Record<CommercialMode, { label: string; description: string }> = {
  COMPRA_DIRECTA: {
    label: "Compra directa",
    description: "Precio fijo y alcance cerrado.",
  },
  SUSCRIPCION: {
    label: "Suscripción",
    description: "Servicio recurrente con precio aprobado.",
  },
  COTIZACION: {
    label: "Cotización",
    description: "El valor depende del alcance: te enviamos una propuesta con plan, tiempos y valores.",
  },
  CONSULTORIA: {
    label: "Consultoría",
    description: "Empezamos por entender tu operación; de ahí sale la hoja de ruta.",
  },
  PERSONALIZADO: {
    label: "A la medida",
    description: "Desarrollo a medida: se cotiza después de evaluar si genera valor real para tu negocio.",
  },
};

const PROPOSAL_STEP = ENGAGEMENT_STEPS.find((step) => step.title === "Propuesta personalizada");

/** Nota para soluciones sin precio publicado (texto del paso real del embudo). */
export const PRICE_NOTE = `Sin precio publicado. El valor se define en la propuesta personalizada: ${
  PROPOSAL_STEP ? PROPOSAL_STEP.description.charAt(0).toLowerCase() + PROPOSAL_STEP.description.slice(1) : "plan, tiempos y valores."
}`;

/**
 * Pagos en línea habilitados. Hoy NO: aunque una solución tuviera precio
 * aprobado, la compra se solicita al equipo (no hay pasarela verificada).
 */
export const CHECKOUT_ENABLED = false;

export interface SolutionCta {
  label: string;
  href: string;
  whatsapp: string;
}

/**
 * Llamado a la acción según la modalidad. Hoy todos llevan a /contacto con el
 * servicio preseleccionado y el mensaje precargado (formulario real). En la
 * Fase 4 se apuntarán a /cotizar, /diagnostico o /consultoria.
 */
export function solutionCta(solution: Solution): SolutionCta {
  const priced = PRICED_MODES.includes(solution.mode);
  const intent =
    solution.mode === "CONSULTORIA"
      ? { label: "Solicitar diagnóstico", message: `Quiero un diagnóstico sobre: ${solution.title}.` }
      : solution.mode === "PERSONALIZADO"
        ? { label: "Hablar con un especialista", message: `Quiero evaluar una solución a medida: ${solution.title}.` }
        : priced && !CHECKOUT_ENABLED
          ? { label: "Solicitar esta solución", message: `Quiero contratar: ${solution.title}.` }
          : { label: "Solicitar cotización", message: `Quiero una cotización de: ${solution.title}.` };

  return {
    label: intent.label,
    href: `/contacto?servicio=${solution.line}&mensaje=${encodeURIComponent(intent.message)}`,
    whatsapp: getWhatsAppUrl(`Hola, ${intent.message.charAt(0).toLowerCase()}${intent.message.slice(1)}`),
  };
}
