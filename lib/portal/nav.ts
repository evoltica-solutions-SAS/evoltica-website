import {
  Bell,
  Briefcase,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Package,
  RefreshCw,
  Server,
  UserCog,
  type LucideIcon,
} from "lucide-react";

export interface PortalNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface PortalNavGroup {
  label: string;
  items: PortalNavItem[];
}

/** Navegación del portal de clientes (/app). La administración tiene la suya (Fase 5). */
export const PORTAL_NAV: PortalNavGroup[] = [
  { label: "General", items: [{ label: "Resumen", href: "/app", icon: LayoutDashboard }] },
  {
    label: "Mis servicios",
    items: [
      { label: "Servicios contratados", href: "/app/servicios", icon: Briefcase },
      { label: "Productos", href: "/app/productos", icon: Package },
      { label: "Suscripciones", href: "/app/suscripciones", icon: RefreshCw },
      { label: "Cloud", href: "/app/cloud", icon: Server },
    ],
  },
  {
    label: "Facturación",
    items: [
      { label: "Facturas", href: "/app/facturacion", icon: FileText },
      { label: "Pagos", href: "/app/pagos", icon: CreditCard },
    ],
  },
  {
    label: "Soporte",
    items: [
      { label: "Tickets", href: "/app/tickets", icon: LifeBuoy },
      { label: "Notificaciones", href: "/app/notificaciones", icon: Bell },
    ],
  },
  { label: "Cuenta", items: [{ label: "Perfil y configuración", href: "/app/perfil", icon: UserCog }] },
];

export function isActivePortalPath(pathname: string, href: string): boolean {
  return href === "/app" ? pathname === "/app" : pathname === href || pathname.startsWith(`${href}/`);
}
