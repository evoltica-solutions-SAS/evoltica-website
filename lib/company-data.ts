import {
  Lightbulb,
  Users,
  Shield,
  Zap,
  Search,
  HeartHandshake,
  ShieldCheck,
  Code2,
  ClipboardList,
  Layers,
  type LucideIcon,
} from "lucide-react";

/** Contenido institucional de Evoltica. Fuente: versión anterior del sitio. */

export const COMPANY_STORY = [
  "EVOLTICA SOLUTIONS SAS nació de la convicción de que las empresas colombianas merecen acceso a tecnología de clase mundial, adaptada a su realidad, cultura y ambición de crecimiento.",
  "No vendemos tecnología primero: vendemos comprensión del negocio, diagnóstico real y confianza. Acompañamos a cada empresa desde el primer diagnóstico hasta la operación diaria, quedándonos como socio de largo plazo en lugar de desaparecer después de la entrega.",
];

export const MISSION =
  "Impulsar la competitividad de las empresas mediante soluciones tecnológicas innovadoras, ágiles y escalables que optimizan procesos, reducen costos y generan ventajas competitivas sostenibles.";

export const VISION =
  "Ser el socio tecnológico de referencia para empresas latinoamericanas que buscan transformación digital integral, consolidando presencia en los principales mercados de la región.";

export interface CompanyValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const VALUES: CompanyValue[] = [
  {
    icon: Lightbulb,
    title: "Innovación",
    description:
      "Adoptamos tecnologías probadas y modernas para ofrecer soluciones que marquen la diferencia en tu operación.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description:
      "Trabajamos como una extensión del equipo de nuestros clientes, construyendo relaciones duraderas.",
  },
  {
    icon: Shield,
    title: "Confianza",
    description:
      "Comprometidos con la transparencia, la seguridad y la entrega de resultados medibles y verificables.",
  },
  {
    icon: Zap,
    title: "Excelencia",
    description:
      "Cada configuración, cada proceso y cada línea de código que entregamos cumple estándares de calidad empresarial.",
  },
];

export interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Lo que deliberadamente NO hacemos (columna tachada). */
  not: string;
  /** Lo que hacemos en su lugar. */
  instead: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: Search,
    title: "Diagnóstico antes que tecnología",
    not: "Vender software el primer día.",
    instead: "Diagnosticar antes de proponer.",
    description:
      "No vendemos software primero. Empezamos por entender tu negocio, tus procesos y tus verdaderas prioridades.",
  },
  {
    icon: HeartHandshake,
    title: "Nos quedamos, no solo implementamos",
    not: "Implementar y desaparecer.",
    instead: "Quedarnos a sostener la operación.",
    description:
      "Nuestra meta no es entregar un proyecto y desaparecer. Construimos relaciones de largo plazo con soporte y mejora continua.",
  },
  {
    icon: ShieldCheck,
    title: "Infraestructura que nunca duerme",
    not: "Enterarnos de la caída cuando nos llamas.",
    instead: "Monitorear, respaldar y proteger de forma continua.",
    description:
      "Monitoreo, backups y seguridad continuos para que la tecnología nunca sea el problema de tu negocio.",
  },
  {
    icon: Code2,
    title: "Solo desarrollamos cuando aporta valor",
    not: "Desarrollar a la medida por defecto.",
    instead: "Construir solo cuando el estándar no alcanza.",
    description:
      "No ofrecemos desarrollo a medida por defecto. Se activa únicamente cuando tu negocio realmente lo necesita.",
  },
  {
    icon: ClipboardList,
    title: "Procesos documentados y medibles",
    not: "Dejar los procesos en la cabeza de una persona.",
    instead: "Documentarlos con responsables e indicadores.",
    description:
      "Cada mejora que implementamos queda documentada, con roles, responsabilidades e indicadores claros de gestión.",
  },
  {
    icon: Layers,
    title: "Un solo socio para toda tu operación",
    not: "Un proveedor distinto para cada problema.",
    instead: "Un solo equipo: ERP, servidores y soporte.",
    description:
      "Desde el ERP hasta el hosting y el soporte diario: todo bajo un mismo equipo que conoce tu negocio.",
  },
];

export interface Commitment {
  value: string;
  label: string;
}

/**
 * Compromisos públicos de servicio CONFIRMADOS por Evoltica (no son métricas de
 * resultados). El primero se presenta destacado; con la lista vacía la sección
 * no se muestra. Agregar uno requiere autorización — ver BUSINESS_CONTEXT.md.
 *
 * Vacía desde el 2026-10-10: "4 h", "5 días", "$0" y "24/7" se retiraron por no
 * estar confirmados ni tener condiciones conocidas.
 */
export const COMMITMENTS: Commitment[] = [];

/**
 * Situaciones operativas frecuentes en una PYME. Son ilustrativas (no casos de
 * clientes ni estadísticas): ayudan al visitante a reconocerse en el problema.
 */
export const OPERATIONAL_SYMPTOMS: string[] = [
  "El inventario del sistema no coincide con lo que hay en la bodega.",
  "Las ventas viven en un Excel que solo entiende una persona.",
  "Cerrar el mes toma días de cruzar archivos a mano.",
  "Cada área usa su propio programa y nadie ve el panorama completo.",
  "Cuando el servidor o el sistema fallan, no hay a quién llamar.",
  "Compraron un software y quedó a medio implementar.",
];

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

// TODO: INFORMACIÓN PENDIENTE DE EVOLTICA — equipo real (nombres, cargos, fotos
// autorizadas). La sección "Equipo" de /nosotros solo se muestra si hay datos.
export const TEAM: TeamMember[] = [];
