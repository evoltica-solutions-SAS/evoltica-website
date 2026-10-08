"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, Cloud, CreditCard, Handshake, Headset, Package, Users, Zap, type LucideIcon } from "lucide-react";

interface ModuleNode {
  label: string;
  icon: LucideIcon;
  /** Posición en % dentro del lienzo cuadrado. */
  x: number;
  y: number;
}

// Hexágono alrededor del núcleo (eco geométrico del isotipo de marca).
const NODES: ModuleNode[] = [
  { label: "Inventario", icon: Package, x: 50, y: 11 },
  { label: "Ventas · POS", icon: CreditCard, x: 84, y: 30.5 },
  { label: "CRM", icon: Handshake, x: 84, y: 69.5 },
  { label: "Soporte", icon: Headset, x: 50, y: 89 },
  { label: "Cloud", icon: Cloud, x: 16, y: 69.5 },
  { label: "Nómina", icon: Users, x: 16, y: 30.5 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Composición del hero: los módulos de la operación de una empresa
 * conectados a un núcleo (ERP + servicios administrados de Evoltica).
 * Ilustrativa — no muestra datos ni métricas.
 */
export function HeroVisual() {
  const hexPoints = NODES.map((node) => `${node.x},${node.y}`).join(" ");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] sm:max-w-[540px]" aria-hidden="true">
      {/* Glow */}
      <div className="absolute inset-[18%] rounded-full bg-primary/20 blur-[80px]" />

      {/* Órbitas */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-white/[0.08] animate-spin-slow" />
      <div className="absolute inset-[22%] rounded-full border border-white/[0.06] animate-spin-slower" />

      {/* Conexiones */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="hero-flow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#12D56F" />
            <stop offset="55%" stopColor="#14A4BC" />
            <stop offset="100%" stopColor="#0997D5" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={hexPoints}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        />
        {NODES.map((node, index) => (
          <g key={node.label}>
            <motion.line
              x1={50}
              y1={50}
              x2={node.x}
              y2={node.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 + index * 0.08 }}
            />
            <line
              x1={node.x}
              y1={node.y}
              x2={50}
              y2={50}
              stroke="url(#hero-flow)"
              strokeWidth="0.55"
              strokeLinecap="round"
              strokeDasharray="1.5 4.5"
              className="animate-dash-flow"
              style={{ animationDelay: `${index * 0.35}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Núcleo */}
      <div className="absolute left-[35%] top-[35%] h-[30%] w-[30%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative flex h-full w-full flex-col items-center justify-center rounded-[28%] border border-white/[0.12] bg-ink-800/90 shadow-card backdrop-blur"
        >
          <span className="border-gradient absolute inset-0 rounded-[28%]" />
          <span className="relative block h-[46%] w-[46%] overflow-hidden">
            <Image
              src="/brand/logo.png"
              alt=""
              fill
              sizes="80px"
              className="-translate-y-[9%] scale-[1.32] object-contain"
            />
          </span>
          <span className="relative mt-1.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
            Operación
          </span>
        </motion.div>
      </div>

      {/* Módulos */}
      {NODES.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 22, stiffness: 300, delay: 0.7 + index * 0.08 }}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.1] bg-ink-800/95 py-1 pl-1 pr-2.5 shadow-card backdrop-blur sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary-400 sm:h-7 sm:w-7">
              <node.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
            <span className="text-[11px] font-medium text-slate-200 sm:text-[13px]">{node.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Tarjetas flotantes (solo ≥ sm) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.3, duration: 0.6 },
          y: { delay: 1.3, duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-2 top-[2%] hidden w-48 rounded-2xl border border-white/[0.1] bg-ink-700/90 p-3.5 shadow-nav backdrop-blur sm:block lg:-right-6"
      >
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
          <Zap className="h-3.5 w-3.5 text-primary-400" />
          Automatización
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1 text-[11px] text-slate-200">
          <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5">Venta</span>
          <span className="text-primary-400">→</span>
          <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5">Factura</span>
          <span className="text-primary-400">→</span>
          <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5">Stock</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { delay: 1.5, duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-2 bottom-[4%] hidden w-52 rounded-2xl border border-white/[0.1] bg-ink-700/90 p-3.5 shadow-nav backdrop-blur sm:block lg:-left-8"
      >
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
          <Activity className="h-3.5 w-3.5 text-secondary-400" />
          Monitoreo 24/7
        </p>
        <div className="mt-3 flex h-8 items-end gap-1">
          {[40, 65, 50, 80, 60, 90, 70, 85, 75, 95].map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-sm bg-gradient-to-t from-secondary/30 to-primary/80"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
