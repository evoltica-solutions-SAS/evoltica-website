"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cn, getWhatsAppUrl } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MAIN_NAV, PRIMARY_CTA, SITE } from "@/lib/site-config";
import { SERVICES } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrada del header encadenada al final de la intro (ver --intro-delay). */
const at = (seconds: number): React.CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

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
              className="group flex items-start gap-4 p-3 transition-colors hover:bg-white/[0.04]"
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
      <div className="flex flex-col justify-between border-l border-white/[0.08] p-5">
        <div>
          <p className="eyebrow">¿Por dónde empezar?</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Todo proyecto inicia con una reunión de descubrimiento sin compromiso. Entendemos tu negocio antes de
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
  const { scrollY, scrollYProgress } = useScroll();
  // Progreso de lectura de la página, como línea fina bajo el header.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

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
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          solid ? "border-white/[0.08] bg-surface-deep/90 backdrop-blur-xl" : "border-transparent bg-transparent"
        )}
      >
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 bottom-[-1px] h-px origin-left bg-brand-line transition-opacity duration-500",
            isScrolled ? "opacity-80" : "opacity-0"
          )}
        />
        <nav
          aria-label="Navegación principal"
          className="container-custom flex h-16 items-center justify-between gap-6 lg:h-[4.5rem] lg:max-xl:gap-3"
        >
          <span style={at(0)} className="animate-enter">
            <Logo priority wordmarkLayout="adaptive" />
          </span>

          {/* Desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {MAIN_NAV.map((item, index) => {
              const active = isActivePath(pathname, item.href);
              const linkClass = cn(
                "group relative inline-flex items-baseline gap-1.5 whitespace-nowrap px-1.5 py-2 text-[0.94rem] font-medium transition-colors xl:px-3.5",
                active ? "text-white" : "text-slate-300 hover:text-white"
              );
              // Índice editorial + subrayado que se dibuja al hover.
              const indexMark = (
                <span aria-hidden="true" className="hidden font-mono text-[10px] text-slate-400 transition-colors group-hover:text-primary-400 xl:inline">
                  {String(index + 1).padStart(2, "0")}
                </span>
              );
              const underline = (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-1.5 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500 ease-out xl:inset-x-3.5",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              );

              if (item.href === "/servicios") {
                return (
                  <li
                    key={item.href}
                    ref={servicesRef}
                    style={at(0.06 + index * 0.05)}
                    className="relative animate-enter"
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
                      {indexMark}
                      {item.label}
                      <ChevronDown
                        className={cn("h-4 w-4 self-center transition-transform duration-300", isServicesOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                      {underline}
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
                            className="pointer-events-auto overflow-hidden border border-white/[0.1] bg-surface-deep shadow-nav"
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
                <li key={item.href} style={at(0.06 + index * 0.05)} className="animate-enter">
                  <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                    {indexMark}
                    {item.label}
                    {underline}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={at(0.3)} className="hidden shrink-0 animate-enter items-center gap-3 lg:flex xl:gap-6">
            <ThemeToggle />
            <Link href={PRIMARY_CTA.href} className="btn-primary !min-h-[2.75rem] whitespace-nowrap px-4 text-sm xl:px-5">
              {PRIMARY_CTA.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile: tema + menú */}
          <ThemeToggle className="ml-auto lg:hidden" />
          <button
            style={at(0.1)}
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="-mr-2 flex h-11 w-11 animate-enter items-center justify-center text-white transition-colors hover:bg-white/[0.06] lg:hidden"
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
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[45] overflow-y-auto bg-surface-deep lg:hidden"
          >
            <div className="flex min-h-full flex-col px-5 pb-8 pt-24 sm:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Menú</p>
              <ul className="mt-4 flex flex-col border-t border-white/[0.1]">
                {MAIN_NAV.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-white/[0.1]">
                      <span className="block overflow-hidden">
                        <motion.span
                          className="block"
                          initial={{ y: "105%" }}
                          animate={{ y: "0%" }}
                          transition={{ delay: 0.22 + index * 0.06, duration: 0.6, ease: EASE }}
                        >
                          <Link
                            href={item.href}
                            onClick={closeAll}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-baseline gap-4 py-5 text-[2.6rem] font-semibold leading-none tracking-[-0.04em] sm:text-5xl",
                              active ? "text-primary" : "text-white"
                            )}
                          >
                            <span aria-hidden="true" className="font-mono text-xs font-normal tracking-normal text-slate-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {item.label}
                          </Link>
                        </motion.span>
                      </span>
                      {item.href === "/servicios" && (
                        <motion.ul
                          className="grid gap-1 pb-5 pl-9"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        >
                          {SERVICES.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/servicios/${service.slug}`}
                                onClick={closeAll}
                                className="flex items-center gap-3 py-1.5 text-base text-slate-300 hover:text-white"
                              >
                                <span className="h-px w-3 bg-primary" aria-hidden="true" />
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <motion.div
                className="mt-auto pt-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
              >
                <Link href={PRIMARY_CTA.href} onClick={closeAll} className="btn-primary w-full">
                  {PRIMARY_CTA.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.1] pt-6 text-sm">
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">WhatsApp</span>
                    {SITE.phoneDisplay}
                  </a>
                  <a href={`mailto:${SITE.email}`} className="break-all text-slate-300 hover:text-white">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">Correo</span>
                    {SITE.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
