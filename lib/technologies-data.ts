/**
 * Plataformas y tecnologías con las que trabaja Evoltica.
 * Fuente: stack declarado en services-data.ts y en la versión anterior del sitio.
 * Solo nombres y categorías — sin afirmaciones de rendimiento no verificables.
 */
export interface TechCategory {
  title: string;
  description: string;
  items: string[];
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "ERP",
    description: "Plataformas de gestión empresarial, con Odoo como estándar.",
    items: ["Odoo", "ERPNext", "Dolibarr"],
  },
  {
    title: "Automatización",
    description: "Flujos que conectan áreas y eliminan tareas repetitivas.",
    items: ["n8n", "Make", "Zapier"],
  },
  {
    title: "Infraestructura y monitoreo",
    description: "Servidores, respaldo y visibilidad de lo que sostiene tu operación.",
    items: ["Proxmox VE", "Proxmox Backup Server", "Zabbix", "Grafana", "Hetzner Cloud", "Contabo", "AWS", "Linux"],
  },
  {
    title: "Desarrollo",
    description: "Stack moderno para portales, integraciones y aplicaciones a medida.",
    items: ["Python", "Node.js", "React", "Next.js", "PostgreSQL", "Docker", "GitHub"],
  },
];
