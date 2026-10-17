"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChapterBackdropProps {
  /** Clase de fondo del capítulo (p. ej. "bg-[#F0F2F3]" vía band-light, "bg-primary"). */
  className: string;
}

/**
 * Fondo de un "capítulo" que se abre al entrar en pantalla: pasa de 90 % de
 * ancho a sangre completa siguiendo el scroll nativo (sin hijacking). Solo
 * anima `transform` (compositor). Debe ir como primer hijo de una sección
 * `relative`; el contenido va encima con `relative`.
 */
export function ChapterBackdrop({ className }: ChapterBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={prefersReducedMotion ? undefined : { scaleX, scaleY }}
      className={cn("absolute inset-0 origin-top will-change-transform", className)}
    />
  );
}
