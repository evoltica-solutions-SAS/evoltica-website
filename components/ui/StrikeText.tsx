"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StrikeTextProps {
  children: React.ReactNode;
  className?: string;
}

/** Texto cuyo tachado se dibuja de izquierda a derecha al entrar en pantalla (CSS `.strike-draw`). */
export function StrikeText({ children, className }: StrikeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <span ref={ref} className={cn("strike-draw", inView && "is-drawn", className)}>
      {children}
    </span>
  );
}
