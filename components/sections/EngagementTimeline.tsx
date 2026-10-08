"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ENGAGEMENT_STEPS } from "@/lib/services-data";
import { PRIMARY_CTA } from "@/lib/site-config";

interface EngagementTimelineProps {
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
}

/** Embudo de entrada (4 pasos) con línea de progreso ligada al scroll. */
export function EngagementTimeline({
  eyebrow = "Cómo empezamos",
  title = (
    <>
      De la primera conversación <span className="text-slate-500">a la implementación.</span>
    </>
  ),
  lead = "Un proceso claro y sin compromiso hasta que tengas una propuesta con plan, tiempos y valores concretos.",
}: EngagementTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.85", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="proceso" className="section-padding relative" aria-label="Proceso de trabajo">
      <div className="container-custom">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

        <div className="relative">
          {/* Riel + progreso: vertical en móvil, horizontal en escritorio */}
          <div className="absolute bottom-0 left-[1.1875rem] top-0 w-px bg-white/[0.08] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[1.1875rem] lg:h-px lg:w-auto" aria-hidden="true">
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-brand-line lg:hidden"
            />
            <motion.div
              style={{ scaleX: progress }}
              className="hidden h-full w-full origin-left bg-brand-line lg:block"
            />
          </div>

          <RevealGroup as="ol" className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {ENGAGEMENT_STEPS.map((step) => (
              <RevealItem as="li" key={step.number} className="relative pl-16 lg:pl-0 lg:pt-16">
                <span className="absolute left-0 top-0 flex h-[2.375rem] w-[2.375rem] items-center justify-center rounded-full border border-white/[0.14] bg-ink font-mono text-sm text-primary-300">
                  {String(step.number).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-slate-400">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-16">
          <ButtonLink href={PRIMARY_CTA.href}>Agendar reunión de descubrimiento</ButtonLink>
        </div>
      </div>
    </section>
  );
}
