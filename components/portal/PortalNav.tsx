"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { PORTAL_NAV, isActivePortalPath } from "@/lib/portal/nav";
import { cn } from "@/lib/utils";

interface PortalNavProps {
  organizationName: string;
  unreadNotifications: number;
  /** Bloque de cuenta (usuario + cerrar sesión), renderizado en el servidor. */
  account: React.ReactNode;
}

function NavLinks({ pathname, unread, onNavigate }: { pathname: string; unread: number; onNavigate?: () => void }) {
  return (
    <nav aria-label="Portal de clientes" className="space-y-6">
      {PORTAL_NAV.map((group) => (
        <div key={group.label}>
          <p className="px-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">{group.label}</p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = isActivePortalPath(pathname, item.href);
              const badge = item.href === "/app/notificaciones" && unread > 0 ? unread : null;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-white/[0.06] font-medium text-white shadow-[inset_2px_0_0_#12D56F]"
                        : "text-slate-400 hover:bg-white/[0.03] hover:text-white",
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", active && "text-primary-400")} aria-hidden="true" />
                    <span className="flex-1">{item.label}</span>
                    {badge && (
                      <span className="rounded-full bg-primary px-1.5 text-[0.7rem] font-semibold text-ink-950">
                        {badge}
                        <span className="sr-only"> sin leer</span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/**
 * Navegación del portal: barra lateral fija desde `lg`; en móvil, cabecera con
 * botón que abre un panel (diálogo modal, Escape cierra y devuelve el foco).
 */
export function PortalNav({ organizationName, unreadNotifications, account }: PortalNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const brand = (
    <div className="flex items-center gap-2">
      <Logo href="/app" size={30} />
      <span className="rounded border border-white/[0.14] px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate-400">
        Portal
      </span>
    </div>
  );

  return (
    <>
      {/* Escritorio */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-white/[0.08] bg-surface-deep lg:flex">
        <div className="flex h-16 items-center border-b border-white/[0.06] px-5">{brand}</div>
        <div className="border-b border-white/[0.06] px-5 py-4">
          <p className="text-xs text-slate-500">Organización</p>
          <p className="mt-0.5 truncate text-sm font-medium text-white" title={organizationName}>
            {organizationName}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-5">
          <NavLinks pathname={pathname} unread={unreadNotifications} />
        </div>
      </aside>

      {/* Móvil */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.08] bg-surface-deep px-4 lg:hidden">
        {brand}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="portal-mobile-nav"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.1] text-white"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Abrir menú del portal</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/70"
            aria-label="Cerrar menú"
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            id="portal-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menú del portal"
            className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r border-white/[0.08] bg-surface-deep"
          >
            <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-4">
              <p className="truncate text-sm font-medium text-white">{organizationName}</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-md text-slate-300"
              >
                <X className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Cerrar menú</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 py-5">
              <NavLinks pathname={pathname} unread={unreadNotifications} onNavigate={() => setOpen(false)} />
            </div>
            <div className="border-t border-white/[0.06] p-4">{account}</div>
          </div>
        </div>
      )}
    </>
  );
}
