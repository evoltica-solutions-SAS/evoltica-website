"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Fracción visible del elemento antes de animar. */
  amount?: number;
}

/** Entrada de sección (arquetipo 1 de DESIGN_SYSTEM.md § Motion). */
export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  as?: "div" | "ul" | "ol";
}

/** Contenedor que escalona la entrada de sus `RevealItem`. */
export function RevealGroup({ children, className, amount = 0.1, as = "div" }: RevealGroupProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
    >
      {children}
    </Component>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  variants?: Variants;
}

export function RevealItem({ children, className, as = "div", variants = fadeInUp }: RevealItemProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
