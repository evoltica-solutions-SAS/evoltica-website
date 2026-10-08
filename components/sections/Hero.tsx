"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { PRIMARY_CTA, SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Titular por palabras; `accent` aplica el degradado de marca.
const HEADLINE: { word: string; accent?: boolean }[] = [
  { word: "Optimizamos" },
  { word: "tu" },
  { word: "operación." },
  { word: "Y", accent: true },
  { word: "nos", accent: true },
  { word: "quedamos", accent: true },
  { word: "para" },
  { word: "sostenerla." },
];

const PROOF_POINTS = [
  "Consultoría inicial gratuita",
  `Respuesta en menos de ${SITE.responseTime}`,
  "Odoo como plataforma ERP principal",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const visualOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-32"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="mask-fade-b absolute inset-0 grid-bg" aria-hidden="true" />

      <div className="container-custom relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <p
            className="animate-enter inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] py-1.5 pl-2 pr-4 text-[13px] text-slate-300"
          >
            <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-primary-300">
              Colombia
            </span>
            Consultoría · ERP · Cloud · Soporte
          </p>

          <h1 id="hero-title" className="mt-8 text-display-xl font-semibold text-white">
            {HEADLINE.map(({ word, accent }, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className={cn("inline-block animate-rise", accent && "gradient-text-blue")}
                    style={{ animationDelay: `${0.05 + index * 0.05}s` }}
                  >
                    {word}
                  </span>
                </span>
                {index < HEADLINE.length - 1 && " "}
              </Fragment>
            ))}
          </h1>

          <p
            style={{ animationDelay: "0.4s" }}
            className="animate-lift mt-8 max-w-xl text-lead text-slate-400 text-pretty"
          >
            Consultoría empresarial, ERP con Odoo, automatización, infraestructura cloud y soporte administrado
            para PYMEs en Colombia. <span className="text-slate-200">Un solo socio tecnológico</span>, del
            diagnóstico a la operación diaria.
          </p>

          <div
            style={{ animationDelay: "0.5s" }}
            className="animate-enter mt-10 flex flex-col gap-3 xs:flex-row"
          >
            <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonLink>
            <ButtonLink href="/servicios" variant="secondary">
              Ver Servicios
            </ButtonLink>
          </div>

          <ul
            style={{ animationDelay: "0.65s" }}
            className="animate-enter mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-8 sm:flex-row sm:flex-wrap sm:gap-x-8"
          >
            {PROOF_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-slate-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary-400">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <motion.div style={{ y: visualY, opacity: visualOpacity }}>
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
