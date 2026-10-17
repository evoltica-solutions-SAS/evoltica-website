"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Trama } from "@/components/ui/Trama";
import { HeroPrompt } from "@/components/ui/HeroPrompt";
import { SERVICES } from "@/lib/services-data";
import { BRAND_MEDIA } from "@/lib/media";

/** Retraso relativo a la apertura de la intro (0 s si la intro no corre en esta visita). */
const at = (seconds: number): React.CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

/**
 * Hero enmarcado: titular condensado, campo "cuéntanos qué quieres mejorar"
 * y las cinco líneas de servicio en tarjetas. Entrada en CSS encadenada a la
 * intro de marca (--intro-delay): eyebrow → titular → subtítulo → campo → texto
 * de ayuda → tarjetas → trama. Visible sin esperar a JavaScript.
 */
export function Hero() {
  const trackRef = useRef<HTMLUListElement>(null);
  const scrollCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (track && card) track.scrollBy({ left: direction * (card.offsetWidth + 12), behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative p-2 sm:p-3" aria-labelledby="hero-title">
      <div className="relative flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-xl border border-white/15 bg-surface-alt sm:min-h-[calc(100svh-1.5rem)]">
        {/* Fondo: trama de marca, centrada y tenue */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-[38%] -right-[30%] w-[120vw] opacity-30 sm:-right-[18%] sm:w-[85vw] lg:-bottom-[45%] lg:-right-[8%] lg:w-[62vw]">
            <div style={at(0.5)} className="animate-enter">
              <Trama id="hero-trama" draw={false} hatch={false} photo={BRAND_MEDIA.hero} />
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_42%,rgb(var(--c-surface-alt))_25%,transparent_80%)]" />
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-28 text-center sm:px-10 lg:pt-32"
        >
          <p style={at(0.08)} className="animate-enter font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Consultoría · ERP · Infraestructura · Soporte — Colombia
          </p>

          <h1
            id="hero-title"
            tabIndex={-1}
            style={at(0.14)}
            className="mt-6 animate-lift font-display font-semibold uppercase leading-[0.88] tracking-[-0.01em] text-white outline-none [font-size:clamp(3rem,1.6rem+6vw,7.75rem)]"
          >
            Optimizamos <span className="font-light">tu operación</span>
          </h1>

          <p
            style={at(0.22)}
            className="mt-4 max-w-3xl animate-lift font-display text-xl font-medium uppercase leading-tight tracking-[0.01em] text-slate-200 sm:text-3xl"
          >
            Y nos quedamos para <span className="font-semibold text-primary">sostenerla</span>
          </p>

          <div style={at(0.3)} className="mt-10 w-full max-w-xl animate-enter">
            <HeroPrompt />
          </div>
          <p style={at(0.37)} className="mt-3 animate-enter text-xs text-slate-400">
            Lo lee una persona del equipo.
          </p>
        </div>

        {/* Cinco líneas de servicio */}
        <div style={at(0.44)} className="relative animate-enter px-3 pb-3 sm:px-4 sm:pb-4">
          <ul
            ref={trackRef}
            className="scroller flex snap-x snap-mandatory gap-3 overflow-x-auto lg:grid lg:grid-cols-5 lg:overflow-visible"
            aria-label="Servicios"
          >
            {SERVICES.map((service) => (
              <li key={service.slug} className="flex w-[86%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <Link
                href={`/servicios/${service.slug}`}
                className="group flex w-full flex-col justify-between rounded-lg border border-white/20 bg-background/50 p-4 backdrop-blur transition-colors hover:border-primary/70 hover:bg-background/80"
              >
                {/* Donde la tarjeta es estrecha (< 360 px y 1024–1535 px, 5 columnas) el enlace va
                    en su propia línea: junto al título se salía de la tarjeta y tapaba la siguiente. */}
                <span className="flex items-start justify-between gap-3 max-[359px]:flex-col max-[359px]:gap-2 lg:max-2xl:flex-col lg:max-2xl:gap-2">
                  <span className="font-display text-xl font-semibold uppercase leading-none tracking-[0.01em] text-white">
                    {service.title}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-200 transition-colors group-hover:text-primary">
                    Más información
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" aria-hidden="true" />
                  </span>
                </span>
                <span className="mt-4 line-clamp-2 text-left text-[13px] leading-snug text-slate-300">{service.summary}</span>
              </Link>
              </li>
            ))}
          </ul>
          {/* Navegación del carrusel en móvil */}
          <div className="mt-3 flex justify-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Servicio anterior"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Servicio siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-ink-950"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
