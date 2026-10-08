"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { cn, getWhatsAppUrl } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { MAIN_NAV, PRIMARY_CTA, SITE } from "@/lib/site-config";
import { SERVICES } from "@/lib/services-data";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function ServicesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-2 p-3 lg:grid-cols-[1.6fr_1fr]">
      <ul className="grid gap-1">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/servicios/${service.slug}`}
              onClick={onNavigate}
              className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
            >
              <span className="icon-tile h-10 w-10 shrink-0">
                <service.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-white">
                  {service.title}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    {service.tag}
                  </span>
                </span>
                <span className="mt-1 line-clamp-1 text-[13px] text-slate-400">{service.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-ink-800 p-5">
        <div>
          <p className="eyebrow">¿Por dónde empezar?</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Todo proyecto inicia con una reunión de descubrimiento gratuita. Entendemos tu negocio antes de
            proponer tecnología.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <Link href={PRIMARY_CTA.href} onClick={onNavigate} className="btn-primary w-full !min-h-[2.75rem] text-sm">
            {PRIMARY_CTA.label}
          </Link>
          <Link href="/servicios" onClick={onNavigate} className="link-arrow justify-center text-sm">
            Ver todos los servicios <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  // Barra sólida al hacer scroll; se oculta al bajar y reaparece al subir.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(current > 24);
    setIsHidden(current > 160 && current > previous && !isServicesOpen);
  });

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, []);

  // Cierra los menús al cambiar de ruta.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Bloqueo de scroll del body con el menú móvil abierto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Escape cierra cualquier menú y devuelve el foco a su disparador.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (isServicesOpen) {
        setIsServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, isServicesOpen]);

  // Clic fuera del menú de servicios.
  useEffect(() => {
    if (!isServicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isServicesOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 160);
  };

  const solid = isScrolled || isServicesOpen;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden && !isMenuOpen ? "-120%" : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Navegación principal"
          className={cn(
            "mx-auto flex h-16 max-w-site items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-5 lg:h-[4.5rem] lg:pl-6 lg:pr-3",
            solid
              ? "border-white/[0.09] bg-ink-900/80 shadow-nav backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <Logo priority />

          {/* Desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {MAIN_NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              const linkClass = cn(
                "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.94rem] font-medium transition-colors",
                active ? "text-white" : "text-slate-400 hover:text-white"
              );

              if (item.href === "/servicios") {
                return (
                  <li
                    key={item.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <button
                      ref={servicesButtonRef}
                      type="button"
                      aria-expanded={isServicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setIsServicesOpen((open) => !open)}
                      className={linkClass}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-300", isServicesOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                      {active && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-primary" />}
                    </button>
                    <div className="pointer-events-none absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-4">
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            id="services-menu"
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className="pointer-events-auto overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-900/95 shadow-nav backdrop-blur-xl"
                          >
                            <ServicesMenu onNavigate={closeAll} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                    {item.label}
                    {active && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-primary" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Link href={PRIMARY_CTA.href} className="btn-primary !min-h-[2.75rem] px-5 text-sm">
              {PRIMARY_CTA.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[45] overflow-y-auto bg-ink-950/[0.98] backdrop-blur-xl lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 pb-8 pt-28 sm:px-8">
              <ul className="flex flex-col">
                {MAIN_NAV.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/[0.08]"
                    >
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-5 text-3xl font-semibold tracking-tight",
                          active ? "text-primary-300" : "text-white"
                        )}
                      >
                        {item.label}
                        <ArrowRight className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      </Link>
                      {item.href === "/servicios" && (
                        <ul className="-mt-2 grid gap-1 pb-5">
                          {SERVICES.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/servicios/${service.slug}`}
                                onClick={closeAll}
                                className="flex items-center gap-3 py-1.5 text-base text-slate-400 hover:text-white"
                              >
                                <span className="font-mono text-xs text-primary-400">{service.number}</span>
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-10">
                <Link href={PRIMARY_CTA.href} onClick={closeAll} className="btn-primary w-full">
                  {PRIMARY_CTA.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
