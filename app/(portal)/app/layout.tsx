import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/PortalShell";

/** Siempre por petición: depende de la sesión y nunca se cachea entre usuarios. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Portal de clientes", template: "%s | Portal Evoltica" },
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Portal de clientes (ADR-012). PortalShell exige sesión CLIENTE en el servidor;
 * cada página vuelve a exigirla a través de getPortalContext().
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
