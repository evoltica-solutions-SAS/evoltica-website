import {
  Search,
  Boxes,
  Cloud,
  Headset,
  Code2,
  ClipboardList,
  Settings2,
  RefreshCw,
  FolderTree,
  Network,
  Package,
  CreditCard,
  ShoppingCart,
  Handshake,
  Users,
  Link2,
  Globe,
  Server,
  HardDrive,
  Mail,
  ShieldCheck,
  Activity,
  Layers,
  Wrench,
  MonitorCog,
  Cog,
  UserCog,
  TrendingUp,
  Building2,
  Store,
  Plug,
  Bot,
  type LucideIcon,
} from "lucide-react";
import type { MediaAsset } from "@/lib/media";

export type BrandColorKey = "green" | "teal" | "blue" | "navy";

export interface ServiceListItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServicePlatform {
  tier: string;
  name: string;
  description: string;
}

export interface ServiceTier {
  tag: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  number: string;
  tag: string;
  title: string;
  icon: LucideIcon;
  color: BrandColorKey;
  /** Short pitch used on cards and as the meta description of the detail page. */
  summary: string;
  /** The 4 bullet highlights shown on summary cards. */
  features: string[];
  /** Longer intro paragraph opening the detail page. */
  intro: string;
  /** Search intents this service answers (used in metadata keywords). */
  keywords: string[];
  /** Core list of modules / offerings within the service. */
  items: ServiceListItem[];
  /** Optional: ERP platform tiers (Principal / Alternativa / Microempresas). */
  platforms?: ServicePlatform[];
  /** Optional: automation tooling (n8n, Make, Zapier). */
  automationTools?: { name: string; description: string }[];
  /** Optional: Servicios Administrados tiers (BASE / OPERATIVO / TÉCNICO...). */
  tiers?: ServiceTier[];
  /** Optional: closing value bullets for the client. */
  valueBullets?: string[];
  /** Optional: technology stack line (Infraestructura). */
  techStack?: string[];
  /** Optional: target client types. */
  clientTypes?: string[];
  /** Optional: objective line (Consultoría). */
  objective?: string;
  /** Optional: activation note (Desarrollo e Integraciones). */
  note?: string;
  /** Optional: imagen REAL del servicio (captura propia, foto de operación). Ver lib/media.ts. */
  cover?: MediaAsset;
}

export const COMPANY_TAGLINE = "Transformamos procesos. Impulsamos crecimiento.";

export interface EngagementStep {
  number: number;
  title: string;
  description: string;
  /** Qué se lleva el cliente al terminar el paso (dato ya comprometido en el sitio). */
  outcome: string;
}

/** Embudo comercial real (ver .claude/BUSINESS_CONTEXT.md § Embudo de conversión). */
export const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    number: 1,
    title: "Reunión de descubrimiento",
    description: "Conversamos sobre tu negocio sin compromiso.",
    outcome: "Sin compromiso · 60 minutos",
  },
  {
    number: 2,
    title: "Diagnóstico",
    description: "Identificamos las mejoras más urgentes.",
    outcome: "Informe de diagnóstico",
  },
  {
    number: 3,
    title: "Propuesta personalizada",
    description: "Plan, tiempos y valores claros y concretos.",
    outcome: "Plan, tiempos y valores",
  },
  {
    number: 4,
    title: "Implementación",
    description: "Ejecutamos con acompañamiento incluido.",
    outcome: "Acompañamiento incluido",
  },
];

/** El orden refleja el embudo comercial — no reordenar por gusto visual. */
export const SERVICES: ServiceData[] = [
  {
    slug: "consultoria-empresarial",
    number: "01",
    tag: "Puerta de entrada",
    title: "Consultoría Empresarial",
    icon: Search,
    color: "green",
    summary:
      "No vendemos tecnología primero — vendemos comprensión del negocio, diagnóstico real y confianza.",
    features: [
      "Diagnóstico empresarial",
      "Levantamiento de procesos",
      "Optimización operativa",
      "Transformación digital",
    ],
    intro:
      "La puerta de entrada. Antes de hablar de software entendemos cómo funciona tu empresa hoy, dónde se pierde tiempo y dinero, y qué mejoras generan más impacto. Luego convertimos ese diagnóstico en una hoja de ruta concreta.",
    keywords: [
      "consultoría empresarial",
      "transformación digital Colombia",
      "diagnóstico empresarial",
      "levantamiento de procesos",
    ],
    items: [
      {
        icon: Search,
        title: "Diagnóstico empresarial",
        description:
          "Evaluación completa: procesos, sistemas, personas, resultados y oportunidades de mejora.",
      },
      {
        icon: ClipboardList,
        title: "Levantamiento de procesos",
        description:
          "Documentación de cómo funciona el negocio hoy y dónde están los cuellos de botella reales.",
      },
      {
        icon: Settings2,
        title: "Optimización operativa",
        description:
          "Diseño e implementación de mejoras concretas y medibles en los procesos identificados.",
      },
      {
        icon: RefreshCw,
        title: "Transformación digital",
        description:
          "Definición de la hoja de ruta tecnológica alineada a los objetivos estratégicos del negocio.",
      },
      {
        icon: FolderTree,
        title: "Gestión documental",
        description:
          "Organización, flujo y control de documentos críticos de la operación y la empresa.",
      },
      {
        icon: Network,
        title: "Diseño organizacional",
        description:
          "Estructura de áreas, roles, responsabilidades e indicadores de gestión por departamento.",
      },
    ],
    objective: "Encontrar oportunidades de mejora y convertirlas en proyectos.",
    clientTypes: ["Microempresas", "Restaurantes", "Distribuidoras", "Talleres", "Servicios"],
  },
  {
    slug: "erp-y-automatizacion",
    number: "02",
    tag: "Servicio principal",
    title: "ERP y Automatización",
    icon: Boxes,
    color: "teal",
    summary:
      "Implementación de Odoo y automatización de procesos con n8n, Make y Zapier para que tu operación funcione sola.",
    features: [
      "Implementación ERP (Odoo)",
      "Inventarios · Ventas · Compras",
      "CRM · Nómina",
      "n8n · Make · Zapier",
    ],
    intro:
      "Nuestro servicio principal: implementación de ERP y automatización de procesos que conectan cada área de tu empresa en un solo sistema — inventario, ventas, compras, CRM y nómina hablando el mismo idioma.",
    keywords: [
      "ERP Odoo Colombia",
      "implementación Odoo",
      "automatización de procesos",
      "n8n Make Zapier",
    ],
    items: [
      {
        icon: Package,
        title: "Inventarios",
        description: "Stock en tiempo real, múltiples almacenes, trazabilidad.",
      },
      {
        icon: CreditCard,
        title: "Ventas / POS",
        description: "Facturación, punto de venta, cotizaciones e integración.",
      },
      {
        icon: ShoppingCart,
        title: "Compras",
        description: "Órdenes de compra, recepciones y control de costos.",
      },
      {
        icon: Handshake,
        title: "CRM",
        description: "Pipeline comercial, seguimiento y oportunidades.",
      },
      {
        icon: Users,
        title: "Nómina / RRHH",
        description: "Contratos, liquidaciones, vacaciones y novedades.",
      },
      {
        icon: Link2,
        title: "Integraciones",
        description: "Conexión con sistemas externos, APIs y webhooks.",
      },
    ],
    platforms: [
      { tier: "Principal", name: "Odoo", description: "Community & Enterprise. Modular, escalable, open source." },
      { tier: "Alternativa", name: "ERPNext", description: "Open source. Para escenarios específicos de manufactura." },
      { tier: "Microempresas", name: "Dolibarr", description: "Solución ligera para negocios muy pequeños." },
    ],
    automationTools: [
      { name: "n8n", description: "Open source · Flujos visuales" },
      { name: "Make", description: "Low-code · Marketing y ventas" },
      { name: "Zapier", description: "No-code · Conexión rápida" },
    ],
    clientTypes: ["Restaurantes", "Distribuidoras", "Empresas de servicios", "Constructoras"],
  },
  {
    slug: "infraestructura-y-cloud",
    number: "03",
    tag: "Ventaja competitiva",
    title: "Infraestructura y Cloud",
    icon: Cloud,
    color: "blue",
    summary:
      "Manejamos la tecnología que hace funcionar tu negocio — segura, confiable y escalable.",
    features: [
      "Hosting ERP administrado",
      "VPS y backups",
      "Correo corporativo",
      "VPN y seguridad",
    ],
    intro:
      "Nuestra principal ventaja competitiva. Alojamos, monitoreamos y protegemos la infraestructura que sostiene tu operación para que la tecnología nunca sea el problema de tu negocio.",
    keywords: [
      "infraestructura y cloud",
      "hosting ERP administrado",
      "VPS administrados Colombia",
      "backups y monitoreo",
    ],
    items: [
      {
        icon: Globe,
        title: "Hosting ERP",
        description:
          "Alojamiento del sistema ERP en servidores en la nube. Sin necesidad de servidores propios.",
      },
      {
        icon: Server,
        title: "VPS administrados",
        description:
          "Servidores privados virtuales configurados, monitoreados y mantenidos por Evoltica.",
      },
      {
        icon: HardDrive,
        title: "Backups",
        description:
          "Copias de seguridad automáticas y programadas, con plan de recuperación ante desastres.",
      },
      {
        icon: Mail,
        title: "Correo corporativo",
        description:
          "Correo profesional con dominio propio, antispam y acceso desde cualquier dispositivo.",
      },
      {
        icon: ShieldCheck,
        title: "VPN",
        description:
          "Red privada virtual para acceso seguro a sistemas internos desde cualquier ubicación.",
      },
      {
        icon: Activity,
        title: "Monitoreo",
        description:
          "Supervisión continua de servidores, servicios y rendimiento con alertas en tiempo real.",
      },
      {
        icon: Layers,
        title: "Infraestructura híbrida",
        description:
          "Combinación de recursos cloud y on-premise adaptada al tamaño y madurez de tu empresa.",
      },
    ],
    techStack: [
      "Proxmox VE",
      "Zabbix",
      "Grafana",
      "Proxmox Backup Server",
      "Hetzner Cloud",
      "Contabo",
      "Linux (Debian/Ubuntu)",
    ],
  },
  {
    slug: "servicios-administrados",
    number: "04",
    tag: "Acompañamiento continuo",
    title: "Servicios Administrados",
    icon: Headset,
    color: "green",
    summary:
      "La meta no es solo implementar — es quedarnos. Administramos, soportamos y mejoramos tu sistema mes a mes.",
    features: [
      "Administración ERP",
      "Mesa de ayuda",
      "Soporte TI",
      "Gestión de usuarios",
    ],
    intro:
      "La meta de Evoltica no es solo implementar — es quedarse. Con los Servicios Administrados tu ERP, tu infraestructura y tus usuarios quedan en manos de un equipo que conoce tu negocio y lo acompaña en el largo plazo.",
    keywords: [
      "servicios administrados TI",
      "mesa de ayuda y soporte TI",
      "administración Odoo",
      "soporte ERP",
    ],
    items: [],
    tiers: [
      {
        tag: "Base",
        icon: Wrench,
        title: "Administración ERP",
        description:
          "Gestión continua del sistema ERP: usuarios, configuraciones, módulos y actualizaciones. Tu sistema siempre funcionando sin que te preocupes por la operación técnica.",
      },
      {
        tag: "Operativo",
        icon: Headset,
        title: "Mesa de ayuda",
        description:
          "Canal dedicado de soporte para resolver dudas, incidencias y requerimientos de los usuarios. Atención por WhatsApp, correo o ticket con tiempos de respuesta definidos por SLA.",
      },
      {
        tag: "Técnico",
        icon: MonitorCog,
        title: "Soporte TI",
        description:
          "Resolución de problemas técnicos de equipos, sistemas y conectividad. Soporte de nivel 1, 2 y 3 según la complejidad del problema.",
      },
      {
        tag: "Infraestructura",
        icon: Cog,
        title: "Administración tecnológica",
        description:
          "Gestión de servidores, correos, dominios, backups y VPS. Monitoreo proactivo para anticipar problemas antes de que afecten la operación.",
      },
      {
        tag: "Control",
        icon: UserCog,
        title: "Gestión de usuarios",
        description:
          "Alta, baja y modificación de usuarios en el ERP y sistemas asociados. Control de permisos, roles y accesos para proteger la información.",
      },
      {
        tag: "Mejora continua",
        icon: TrendingUp,
        title: "Analistas de procesos",
        description:
          "Acompañamiento mensual para revisar el uso del sistema, detectar ineficiencias y proponer mejoras. El negocio evoluciona, el sistema también.",
      },
    ],
    valueBullets: [
      "Un solo equipo que conoce tu negocio",
      "Sistema siempre operativo",
      "Mejora continua mes a mes",
      "Tiempos de respuesta definidos por SLA",
    ],
  },
  {
    slug: "desarrollo-e-integraciones",
    number: "05",
    tag: "Bajo demanda",
    title: "Desarrollo e Integraciones",
    icon: Code2,
    color: "teal",
    summary:
      "Solo cuando tu negocio lo necesita y genera valor real. El código es el medio — el negocio, el fin.",
    features: [
      "Aplicaciones web",
      "Portales empresariales",
      "Ecommerce",
      "APIs personalizadas",
    ],
    intro:
      "Desarrollo de software a medida e integraciones cuando la implementación estándar no alcanza. Solo construimos cuando genera valor real: el código es el medio — el negocio, el fin.",
    keywords: [
      "desarrollo de software a medida",
      "integraciones API",
      "desarrollo web empresarial",
      "aplicaciones empresariales",
    ],
    items: [
      {
        icon: Globe,
        title: "Aplicaciones web",
        description:
          "Aplicaciones web a medida para necesidades específicas que no cubre el ERP.",
      },
      {
        icon: Building2,
        title: "Portales empresariales",
        description:
          "Portales de proveedores, clientes o empleados integrados con el ERP para automatizar interacciones.",
      },
      {
        icon: Store,
        title: "Ecommerce",
        description:
          "Tiendas en línea integradas con inventario, facturación y logística del ERP.",
      },
      {
        icon: Plug,
        title: "APIs personalizadas",
        description:
          "APIs REST para conectar el ERP con otros sistemas, aplicaciones o servicios externos.",
      },
      {
        icon: Link2,
        title: "Integraciones",
        description:
          "Conexión de Odoo con sistemas contables, bancarios, de logística o cualquier plataforma que uses.",
      },
      {
        icon: Bot,
        title: "Automatizaciones avanzadas",
        description:
          "Flujos complejos que combinan múltiples sistemas, lógica de negocio personalizada y disparadores automáticos.",
      },
    ],
    note: "Este servicio se activa cuando tu empresa ya tiene el ERP y los Servicios Administrados en marcha y necesita algo que la implementación estándar no cubre.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
