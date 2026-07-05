import {
  Search,
  Boxes,
  Cloud,
  Headset,
  Code2,
  type LucideIcon,
} from "lucide-react";

export type BrandColorKey = "green" | "teal" | "blue" | "navy";

export interface ServiceListItem {
  icon: string;
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
  icon: string;
  title: string;
  description: string;
}

export interface ServiceData {
  slug: string;
  number: string;
  tag: string;
  title: string;
  titleLines: [string, string];
  icon: LucideIcon;
  color: BrandColorKey;
  /** Short pitch used on the homepage summary card. */
  summary: string;
  /** The 4 bullet highlights shown on the homepage summary card. */
  features: string[];
  /** Longer intro paragraph opening the full detail section. */
  intro: string;
  /** Core list of modules / offerings within the service. */
  items: ServiceListItem[];
  /** Optional: ERP platform tiers (Principal / Alternativa / Microempresas). */
  platforms?: ServicePlatform[];
  /** Optional: automation tooling (n8n, Make, Zapier). */
  automationTools?: { name: string; description: string }[];
  /** Optional: Servicios Administrados tiers (BASE / OPERATIVO / TÉCNICO...). */
  tiers?: ServiceTier[];
  /** Optional: closing recurrence/value bullets. */
  recurrenceBullets?: string[];
  /** Optional: technology stack line (Infraestructura). */
  techStack?: string[];
  /** Optional: target client types (icon + label). */
  clientTypes?: string[];
  /** Optional: objective line (Consultoría). */
  objective?: string;
  /** Optional: activation note/warning (Desarrollo e Integraciones). */
  note?: string;
}

export const COMPANY_TAGLINE = "Transformamos procesos. Impulsamos crecimiento.";

export const ENGAGEMENT_STEPS = [
  {
    number: 1,
    title: "Reunión de descubrimiento",
    description: "Conversamos sobre tu negocio sin compromiso.",
  },
  {
    number: 2,
    title: "Diagnóstico",
    description: "Identificamos las mejoras más urgentes.",
  },
  {
    number: 3,
    title: "Propuesta personalizada",
    description: "Plan, tiempos y valores claros y concretos.",
  },
  {
    number: 4,
    title: "Implementación",
    description: "Ejecutamos con acompañamiento incluido.",
  },
];

export const SERVICES: ServiceData[] = [
  {
    slug: "consultoria-empresarial",
    number: "01",
    tag: "Puerta de entrada",
    title: "Consultoría Empresarial",
    titleLines: ["Consultoría", "Empresarial"],
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
      "La puerta de entrada. No vendemos tecnología primero — vendemos comprensión del negocio, diagnóstico real y confianza.",
    items: [
      {
        icon: "🔍",
        title: "Diagnóstico empresarial",
        description:
          "Evaluación completa: procesos, sistemas, personas, resultados y oportunidades de mejora.",
      },
      {
        icon: "📋",
        title: "Levantamiento de procesos",
        description:
          "Documentación de cómo funciona el negocio hoy y dónde están los cuellos de botella reales.",
      },
      {
        icon: "⚙",
        title: "Optimización operativa",
        description:
          "Diseño e implementación de mejoras concretas y medibles en los procesos identificados.",
      },
      {
        icon: "🔄",
        title: "Transformación digital",
        description:
          "Definición de la hoja de ruta tecnológica alineada a los objetivos estratégicos del negocio.",
      },
      {
        icon: "📁",
        title: "Gestión documental",
        description:
          "Organización, flujo y control de documentos críticos de la operación y la empresa.",
      },
      {
        icon: "🏗",
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
    titleLines: ["ERP y", "Automatización"],
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
      "El servicio principal de Evoltica: implementación de ERP y automatización de procesos que conectan cada área de tu empresa en un solo sistema.",
    items: [
      {
        icon: "📦",
        title: "Inventarios",
        description: "Stock en tiempo real, múltiples almacenes, trazabilidad.",
      },
      {
        icon: "💳",
        title: "Ventas / POS",
        description: "Facturación, punto de venta, cotizaciones e integración.",
      },
      {
        icon: "🛒",
        title: "Compras",
        description: "Órdenes de compra, recepciones y control de costos.",
      },
      {
        icon: "🤝",
        title: "CRM",
        description: "Pipeline comercial, seguimiento y oportunidades.",
      },
      {
        icon: "👥",
        title: "Nómina / RRHH",
        description: "Contratos, liquidaciones, vacaciones y novedades.",
      },
      {
        icon: "🔗",
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
      { name: "n8n", description: "Open Source · Flujos visuales" },
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
    titleLines: ["Infraestructura", "y Cloud"],
    icon: Cloud,
    color: "blue",
    summary:
      "La principal ventaja competitiva de Evoltica. Manejamos la tecnología que hace funcionar el negocio del cliente — 24/7, segura, confiable y escalable.",
    features: [
      "Hosting ERP administrado",
      "VPS y backups",
      "Correo corporativo",
      "VPN y seguridad",
    ],
    intro:
      "La principal ventaja competitiva de Evoltica. Manejamos la tecnología que hace funcionar el negocio del cliente — 24/7, segura, confiable y escalable.",
    items: [
      {
        icon: "🌐",
        title: "Hosting ERP",
        description:
          "Alojamiento del sistema ERP del cliente en servidores en la nube. Sin necesidad de servidores propios.",
      },
      {
        icon: "🖥",
        title: "VPS Administrados",
        description:
          "Servidores privados virtuales configurados, monitoreados y mantenidos por Evoltica.",
      },
      {
        icon: "💾",
        title: "Backups",
        description:
          "Copias de seguridad automáticas y programadas. Recuperación ante desastres garantizada.",
      },
      {
        icon: "📧",
        title: "Correo Corporativo",
        description:
          "Correo profesional con dominio propio, antispam y acceso desde cualquier dispositivo.",
      },
      {
        icon: "🔐",
        title: "VPN",
        description:
          "Red privada virtual para acceso seguro a sistemas internos desde cualquier ubicación.",
      },
      {
        icon: "📊",
        title: "Monitoreo",
        description:
          "Supervisión continua de servidores, servicios y rendimiento con alertas en tiempo real.",
      },
      {
        icon: "🔗",
        title: "Infraestructura Híbrida",
        description:
          "Combinación de recursos cloud y on-premise adaptada al tamaño y madurez del cliente.",
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
    tag: "Recurrencia",
    title: "Servicios Administrados",
    titleLines: ["Servicios", "Administrados"],
    icon: Headset,
    color: "green",
    summary:
      "La meta de Evoltica no es solo implementar — es quedarse. Convertimos cada cliente en ingreso recurrente mensual predecible y relación de largo plazo.",
    features: [
      "Administración ERP",
      "Mesa de ayuda",
      "Soporte TI",
      "Gestión de usuarios",
    ],
    intro:
      "La meta de Evoltica no es solo implementar — es quedarse. Los Servicios Administrados convierten cada cliente en ingreso recurrente mensual predecible y relación de largo plazo.",
    items: [],
    tiers: [
      {
        tag: "Base",
        icon: "🛠",
        title: "Administración ERP",
        description:
          "Gestión continua del sistema ERP del cliente: usuarios, configuraciones, módulos y actualizaciones. El cliente siempre tiene su sistema funcionando sin preocuparse de la operación técnica.",
      },
      {
        tag: "Operativo",
        icon: "🎧",
        title: "Mesa de Ayuda",
        description:
          "Canal dedicado de soporte para resolver dudas, incidencias y requerimientos de los usuarios. Atención por WhatsApp, correo o ticket con tiempos de respuesta definidos por SLA.",
      },
      {
        tag: "Técnico",
        icon: "💻",
        title: "Soporte TI",
        description:
          "Resolución de problemas técnicos de equipos, sistemas y conectividad. Soporte de nivel 1, 2 y 3 según la complejidad del problema.",
      },
      {
        tag: "Infraestructura",
        icon: "⚙",
        title: "Administración Tecnológica",
        description:
          "Gestión de servidores, correos, dominios, backups y VPS del cliente. Monitoreo proactivo para anticipar problemas antes de que afecten la operación.",
      },
      {
        tag: "Control",
        icon: "👤",
        title: "Gestión de Usuarios",
        description:
          "Alta, baja y modificación de usuarios en el ERP y sistemas asociados. Control de permisos, roles y accesos para garantizar la seguridad de la información.",
      },
      {
        tag: "Mejora continua",
        icon: "📈",
        title: "Analistas de Procesos",
        description:
          "Acompañamiento mensual para revisar el uso del sistema, detectar ineficiencias y proponer mejoras. El negocio evoluciona, el sistema también.",
      },
    ],
    recurrenceBullets: [
      "Ingresos recurrentes",
      "Menor costo de retención",
      "Relación de largo plazo",
      "Expansión natural de servicios",
    ],
  },
  {
    slug: "desarrollo-e-integraciones",
    number: "05",
    tag: "Bajo demanda",
    title: "Desarrollo e Integraciones",
    titleLines: ["Desarrollo e", "Integraciones"],
    icon: Code2,
    color: "teal",
    summary:
      "Solo cuando el cliente lo necesita y genera valor real. El código es el medio — el negocio, el fin.",
    features: [
      "Aplicaciones web",
      "Portales empresariales",
      "Ecommerce",
      "APIs personalizadas",
    ],
    intro:
      "Solo cuando el cliente lo necesita y genera valor real. No se ofrece proactivamente en Fase 1. El código es el medio — el negocio, el fin.",
    items: [
      {
        icon: "🌐",
        title: "Aplicaciones Web",
        description:
          "Desarrollo de aplicaciones web a medida para necesidades específicas del cliente que no cubre el ERP.",
      },
      {
        icon: "🏢",
        title: "Portales Empresariales",
        description:
          "Portales de proveedores, clientes o empleados integrados con el ERP para automatizar interacciones.",
      },
      {
        icon: "🛒",
        title: "Ecommerce",
        description:
          "Tiendas en línea integradas con inventario, facturación y logística del sistema ERP del cliente.",
      },
      {
        icon: "🔌",
        title: "APIs Personalizadas",
        description:
          "Construcción de APIs REST para conectar el ERP con otros sistemas, aplicaciones o servicios externos.",
      },
      {
        icon: "🔗",
        title: "Integraciones",
        description:
          "Conexión de Odoo con sistemas contables, bancarios, de logística o cualquier plataforma que el cliente use.",
      },
      {
        icon: "🤖",
        title: "Automatizaciones Avanzadas",
        description:
          "Flujos complejos que combinan múltiples sistemas, lógica de negocio personalizada y disparadores automáticos.",
      },
    ],
    note: "Este servicio se activa cuando el cliente ya tiene ERP + Servicios Administrados activos y necesita algo que no cubre la implementación estándar.",
  },
];
