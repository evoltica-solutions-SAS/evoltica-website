"use client";

import { MotionConfig } from "framer-motion";

/**
 * Aplica globalmente `prefers-reduced-motion`: si el usuario lo solicita,
 * Framer Motion desactiva transformaciones y conserva solo opacidad.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
