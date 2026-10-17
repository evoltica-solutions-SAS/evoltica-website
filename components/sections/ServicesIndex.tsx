"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Trama } from "@/components/ui/Trama";
import { SERVICES, type ServiceData } from "@/lib/services-data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ServiceRowProps {
  service: ServiceData;
  index: number;
  isLast: boolean;
  /** Fila activa por hover (escritorio) o por estar al centro de la pantalla (táctil). */
  active: boolean;
  touch: boolean;
  onActivate: (index: number | null) => void;
}

function ServiceRow({ service, index, isLast, active, touch, onActivate }: ServiceRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  // En táctil, la fila se activa cuando cruza la franja central de la pantalla.
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (touch && centered) onActivate(index);
  }, [touch, centered, index, onActivate]);

  return (
    <motion.li
      ref={ref}
      className="relative border-b border-white/[0.1]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.04 }}
    >
      <Link
        href={`/servicios/${service.slug}`}
        onPointerEnter={() => !touch && onActivate(index)}
        onFocus={() => onActivate(index)}
        className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 overflow-hidden py-9 sm:gap-x-10 lg:grid-cols-[11rem_1fr_auto] lg:py-12"
      >
        {/* Barrido de fondo */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 origin-left bg-surface-raised transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active ? "scale-x-100" : "scale-x-0"
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "relative font-semibold leading-[0.8] tracking-[-0.06em] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [font-size:clamp(3rem,2rem+4.5vw,7.5rem)] lg:pl-6",
            active ? "origin-left scale-110 text-primary" : "numeral-outline"
          )}
        >
          {service.number}
        </span>

        <span className="relative min-w-0">
          <span
            className={cn(
              "block font-semibold leading-[0.95] tracking-[-0.045em] transition-colors duration-500 [font-size:clamp(1.9rem,1.2rem+3vw,4.25rem)]",
              active ? "text-white" : "text-slate-300"
            )}
          >
            {service.title}
          </span>
          <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-primary-400">
            {isLast ? "Bajo demanda — solo cuando hace falta" : service.tag}
          </span>

          {/* Detalle desplegable */}
          <span
            className={cn(
              "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <span className="overflow-hidden">
              <span className="block max-w-2xl pt-5 leading-relaxed text-slate-300">{service.summary}</span>
              <span className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-slate-200">
                {service.features.map((feature) => (
                  <span key={feature} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-primary" aria-hidden="true" />
                    {feature}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>

        <span
          className={cn(
            "relative mt-1 flex h-12 w-12 items-center justify-center border transition-all duration-500 lg:mr-6 lg:h-16 lg:w-16",
            active ? "border-primary bg-primary text-ink-950" : "border-white/15 text-white"
          )}
        >
          <ArrowUpRight
            className={cn("h-5 w-5 transition-transform duration-500", active && "rotate-45")}
            aria-hidden="true"
          />
        </span>
      </Link>
    </motion.li>
  );
}

/** Vista previa que sigue al cursor (escritorio): imagen real del servicio o composición de marca. */
function CursorPreview({ service, visible }: { service: ServiceData | null; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && service && (
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, scale: 0.92, clipPath: "inset(12% 12% 12% 12%)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0 overflow-hidden border border-white/10 bg-ink-950"
        >
          {service.cover ? (
            <Image src={service.cover.src} alt="" fill sizes="340px" className="object-cover" />
          ) : (
            <>
              <div className="absolute -bottom-10 -right-12 w-[85%] opacity-90">
                <Trama id={`preview-${service.slug}`} band={70} draw={false} />
              </div>
              <span className="absolute left-5 top-4 font-semibold leading-none tracking-[-0.06em] text-snow/90 [font-size:5.5rem]">
                {service.number}
              </span>
            </>
          )}
          <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 bg-primary px-3 py-1.5 text-xs font-semibold text-ink-950">
            Ver servicio <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Índice de las 5 líneas de servicio a gran escala, en el orden del embudo.
 * Escritorio: hover → barrido, numeral que crece, detalle y vista previa que
 * sigue al cursor. Táctil: la fila se activa al pasar por el centro de la pantalla.
 */
export function ServicesIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [touch, setTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    setTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (touch || !listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    // Se mantiene dentro del ancho de la lista (nunca provoca scroll horizontal).
    x.set(Math.min(event.clientX - rect.left + 28, rect.width - 330));
    y.set(event.clientY - rect.top - 120);
  };

  const showPreview = !touch && !prefersReducedMotion && hovering && active !== null;

  return (
    <section id="servicios" className="section-padding relative" aria-labelledby="services-title">
      <div className="container-custom">
        <div className="mb-16 grid gap-10 lg:mb-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="02">Servicios</SectionLabel>
            </Reveal>
            <SplitReveal
              id="services-title"
              className="mt-6 text-display-xl font-semibold text-white"
              lines={[{ text: "Cinco servicios." }, { text: "En este orden.", className: "font-light text-slate-400" }]}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="text-lead text-slate-300">
              No empezamos vendiendo tecnología. Primero entendemos, luego implementamos, después sostenemos. Y si
              de verdad hace falta, desarrollamos.
            </p>
            <ButtonLink href="/servicios" variant="arrow" className="mt-6">
              Ver el portafolio completo
            </ButtonLink>
          </Reveal>
        </div>

        <div
          ref={listRef}
          className="relative"
          onPointerMove={onPointerMove}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => {
            setHovering(false);
            if (!touch) setActive(null);
          }}
        >
          <ol className="border-t border-white/[0.1]">
            {SERVICES.map((service, index) => (
              <ServiceRow
                key={service.slug}
                service={service}
                index={index}
                isLast={index === SERVICES.length - 1}
                active={active === index}
                touch={touch}
                onActivate={setActive}
              />
            ))}
          </ol>

          {/* Vista previa contextual (solo puntero fino) */}
          <motion.div
            aria-hidden="true"
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[220px] w-[320px] lg:block"
          >
            <CursorPreview service={active !== null ? SERVICES[active] : null} visible={showPreview} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
