"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TRAMA_APEX, TRAMA_CROSS } from "@/components/ui/Trama";
import { INTRO_DURATION_S } from "@/lib/intro";

type Phase = "idle" | "cover" | "reveal";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const COVER_MS = 320;
const REVEAL_MS = 460;
const FAILSAFE_MS = 2500;

/** ¿Este clic es una navegación interna a otra ruta que debemos animar? */
function getInternalHref(event: MouseEvent): string | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  const anchor = (event.target as Element | null)?.closest?.("a");
  if (!anchor || !anchor.href) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download") || anchor.getAttribute("rel")?.includes("external")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  // Misma ruta (solo cambia el query o el hash): se deja a Next sin transición.
  if (url.pathname === window.location.pathname) return null;
  return url.pathname + url.search + url.hash;
}

/**
 * Transición entre páginas: una cortina de tinta con el ápice de la trama cubre
 * la página (~0,3 s), la ruta cambia debajo y la cortina se retira (~0,45 s).
 * Escucha clics en fase de captura y solo intercepta enlaces internos a otra
 * ruta; respeta pestañas nuevas, teclas modificadoras y prefers-reduced-motion.
 * La intro completa del logo nunca se repite aquí.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const setPhaseSafe = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const onClick = (event: MouseEvent) => {
      if (phaseRef.current !== "idle") return;
      const href = getInternalHref(event);
      if (!href) return;
      event.preventDefault();
      setPhaseSafe("cover");
      clearTimers();
      timers.current.push(setTimeout(() => router.push(href), COVER_MS));
      // Si la navegación tarda o falla, nunca dejamos la página tapada.
      timers.current.push(setTimeout(() => phaseRef.current === "cover" && setPhaseSafe("reveal"), FAILSAFE_MS));
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [prefersReducedMotion, router]);

  // La nueva ruta ya se renderizó: retirar la cortina.
  useEffect(() => {
    if (phaseRef.current !== "cover") return;
    setPhaseSafe("reveal");
  }, [pathname]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const id = setTimeout(() => setPhaseSafe("idle"), REVEAL_MS);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => clearTimers, []);

  // Al terminar la intro de marca, el sitio deja de esperarla: las páginas a las
  // que se navegue después entran sin el retraso de --intro-delay.
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "play") return;
    const id = setTimeout(() => {
      root.dataset.intro = "seen";
    }, INTRO_DURATION_S * 1000 + 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[65] flex items-center justify-center bg-ink-950"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={
            phase === "cover"
              ? { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: COVER_MS / 1000, ease: CURTAIN_EASE } }
              : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: REVEAL_MS / 1000, ease: CURTAIN_EASE } }
          }
          exit={{ opacity: 0, transition: { duration: 0.01 } }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 1000 1000" className="h-14 w-14" fill="none">
            <path d={TRAMA_APEX} stroke="#12D56F" strokeWidth={26} />
            <path d={TRAMA_CROSS} stroke="#0997D5" strokeWidth={26} />
          </svg>
          <span className="absolute inset-x-0 top-0 h-px bg-brand-line opacity-70" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
