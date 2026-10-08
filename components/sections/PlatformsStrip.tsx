import { Marquee } from "@/components/ui/Marquee";
import { TECH_MARQUEE } from "@/lib/technologies-data";

export function PlatformsStrip() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-900/60 py-8" aria-label="Plataformas con las que trabajamos">
      <div className="container-custom mb-5 flex items-center gap-4">
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
          Plataformas con las que trabajamos
        </p>
        <span className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
      </div>
      <Marquee items={TECH_MARQUEE} label="Lista de plataformas y tecnologías" />
    </section>
  );
}
