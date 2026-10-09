"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  /** Desplazamiento máximo en px (sutil por diseño). */
  strength?: number;
  className?: string;
}

/**
 * Atracción leve del elemento hacia el puntero. Solo en dispositivos con
 * puntero fino y sin prefers-reduced-motion; en táctil no hace nada.
 * Solo usa `transform` vía motion values (sin re-render por movimiento).
 */
export function Magnetic({ children, strength = 7, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    setEnabled(!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, [prefersReducedMotion]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-flex"}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
