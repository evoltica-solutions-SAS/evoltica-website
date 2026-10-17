"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Trama } from "@/components/ui/Trama";
import { CASE_STUDIES, type CaseStudy } from "@/lib/cases-data";
import { getServiceBySlug } from "@/lib/services-data";

const EASE = [0.22, 1, 0.36, 1] as const;

function CaseSlide({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article className="group w-[86%] shrink-0 snap-start sm:w-[64%] lg:w-[46%]" aria-roledescription="caso">
      <motion.div
        className="relative aspect-[4/3] overflow-hidden bg-surface-raised"
        initial={{ clipPath: "inset(18% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: EASE }}
      >
        {study.cover ? (
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            fill
            sizes="(min-width: 1024px) 46vw, 86vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
            <div className="absolute -bottom-[20%] -right-[12%] w-[80%]">
              <Trama id={`case-${study.slug}`} draw={false} />
            </div>
          </div>
        )}
        <span className="absolute left-5 top-5 bg-ink-950/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-snow backdrop-blur">
          {String(index + 1).padStart(2, "0")} · {study.industry}
        </span>
      </motion.div>

      <div className="mt-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary-400">{study.client}</p>
        <h3 className="mt-3 text-display-sm font-semibold text-white">{study.title}</h3>
        <p className="mt-4 max-w-xl leading-relaxed text-slate-400">{study.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.1] pt-5 text-sm text-slate-200">
          {study.results.map((result) => (
            <li key={result} className="flex items-center gap-2">
              <span className="h-px w-3 bg-primary" aria-hidden="true" />
              {result}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-400">
          {study.serviceSlugs
            .map((slug) => getServiceBySlug(slug)?.title)
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </article>
  );
}

/**
 * Carrusel editorial de casos reales: portada grande que se revela con máscara,
 * zoom suave al hover, categoría, título, resumen y resultados. Navegación con
 * scroll nativo (snap) y botones; sin hijacking. No renderiza nada sin casos.
 */
export function CaseShowcase({ cases = CASE_STUDIES }: { cases?: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const slideWidth = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 32 : 0;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const width = slideWidth();
      if (width) setCurrent(Math.min(cases.length - 1, Math.round(track.scrollLeft / width)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [cases.length, slideWidth]);

  if (cases.length === 0) return null;

  const go = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * slideWidth(), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between gap-6">
        <p className="font-mono text-sm text-slate-300" aria-live="polite">
          <span className="text-white">{String(current + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-slate-400">/</span>
          {String(cases.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={current === 0}
            aria-label="Caso anterior"
            className="flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={current === cases.length - 1}
            aria-label="Caso siguiente"
            className="flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-colors hover:border-primary hover:text-primary disabled:opacity-30"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scroller -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-8 overflow-x-auto scroll-smooth px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Casos de éxito"
        tabIndex={0}
      >
        {cases.map((study, index) => (
          <CaseSlide key={study.slug} study={study} index={index} />
        ))}
      </div>
    </div>
  );
}
