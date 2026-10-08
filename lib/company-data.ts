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
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: Search,
    title: "Diagnóstico antes que tecnología",
    description:
      "No vendemos software primero. Empezamos por entender tu negocio, tus procesos y tus verdaderas prioridades.",
  },
  {
    icon: HeartHandshake,
    title: "Nos quedamos, no solo implementamos",
    description:
      "Nuestra meta no es entregar un proyecto y desaparecer. Construimos relaciones de largo plazo con soporte y mejora continua.",
  },
  {
    icon: ShieldCheck,
    title: "Infraestructura que nunca duerme",
    description:
      "Monitoreo, backups y seguridad continuos para que la tecnología nunca sea el problema de tu negocio.",
  },
  {
    icon: Code2,
    title: "Solo desarrollamos cuando aporta valor",
    description:
      "No ofrecemos desarrollo a medida por defecto. Se activa únicamente cuando tu negocio realmente lo necesita.",
  },
  {
    icon: ClipboardList,
    title: "Procesos documentados y medibles",
    description:
      "Cada mejora que implementamos queda documentada, con roles, responsabilidades e indicadores claros de gestión.",
  },
  {
    icon: Layers,
    title: "Un solo socio para toda tu operación",
    description:
      "Desde el ERP hasta el hosting y el soporte diario: todo bajo un mismo equipo que conoce tu negocio.",
  },
];

export interface Commitment {
  /** Valor numérico animado; null si el dato no es numérico. */
  value: number | null;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
}

/**
 * Compromisos públicos ya declarados por la empresa (no son métricas de resultados).
 * Cambiar cualquiera requiere autorización — ver BUSINESS_CONTEXT.md.
 */
export const COMMITMENTS: Commitment[] = [
  { value: 4, prefix: "<", suffix: "h", label: "Respuesta en horas hábiles a cada solicitud" },
  { value: 5, suffix: " días", label: "Hábiles para entregar la propuesta técnica" },
  { value: 100, suffix: "%", label: "Gratuita: la consultoría inicial no tiene costo" },
  { value: null, display: "24/7", label: "Monitoreo de la infraestructura administrada" },
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
