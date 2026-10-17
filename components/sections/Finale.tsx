"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ChapterBackdrop } from "@/components/ui/ChapterBackdrop";
import { TRAMA_APEX, TRAMA_CROSS } from "@/components/ui/Trama";
import { PRIMARY_CTA } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cierre de la home: el único capítulo en verde de marca sólido (el acento,
 * usado con moderación en todo el recorrido, aquí toma la pantalla). El titular
 * aparece palabra por palabra y la trama se dibuja siguiendo el scroll nativo.
 */
export function Finale({ index = "08" }: { index?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.9", "end end"] });
  const apex = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const cross = useTransform(scrollYProgress, [0.25, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="on-accent relative overflow-hidden text-ink-950"
      aria-labelledby="finale-title"
    >
      <ChapterBackdrop className="bg-primary" />

      {/* Trama en tinta, dibujada por el scroll */}
      <div className="pointer-events-none absolute -right-[38vw] bottom-[-26vw] w-[90vw] opacity-90 sm:-right-[22vw] lg:-right-[8vw] lg:bottom-[-12vw] lg:w-[46vw]" aria-hidden="true">
        <svg viewBox="0 0 1000 1000" className="h-full w-full overflow-visible" fill="none">
          <motion.path
            d={TRAMA_APEX}
            stroke="#070A11"
            strokeWidth={64}
            strokeLinejoin="miter"
            style={{ pathLength: prefersReducedMotion ? 1 : apex }}
          />
          <motion.path
            d={TRAMA_CROSS}
            stroke="#070A11"
            strokeWidth={64}
            style={{ pathLength: prefersReducedMotion ? 1 : cross }}
          />
        </svg>
      </div>

      <div className="container-custom relative flex min-h-[90svh] flex-col justify-between gap-16 py-24 lg:py-32">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mr-3 font-semibold">{index}</span>Hablemos
        </motion.p>

        <div>
          <SplitReveal
            id="finale-title"
            className="max-w-6xl font-semibold text-ink-950 text-display-hero"
            stagger={0.06}
            lines={[{ text: "Hablemos de" }, { text: "tu operación.", className: "lg:ml-[12%]" }]}
          />

          <motion.div
            className="mt-12 max-w-xl lg:ml-[12%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            <p className="text-lead font-medium text-ink-900">
              Una conversación de 60 minutos, sin compromiso, para salir con una idea clara de qué mejorar primero.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic className="flex sm:inline-flex">
                <Link
                  href={PRIMARY_CTA.href}
                  className="btn group w-full bg-ink-950 text-snow hover:bg-snow hover:text-ink-950 sm:w-auto"
                >
                  {PRIMARY_CTA.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Magnetic>
              <Magnetic className="flex sm:inline-flex">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full border border-ink-950/40 text-ink-950 hover:bg-ink-950 hover:text-snow sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
