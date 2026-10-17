import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { TECH_CATEGORIES } from "@/lib/technologies-data";

/**
 * Herramientas como muro tipográfico: Odoo protagonista (plataforma principal,
 * ver ADR-004) y el resto en filas por categoría. Sin tarjetas, sin logos ajenos.
 */
/** `index` solo en páginas con capítulos numerados. */
export function TechWall({ index }: { index?: string }) {
  const [erp, ...others] = TECH_CATEGORIES;
  const [principal, ...alternatives] = erp.items;

  return (
    <section id="tecnologias" className="section-padding relative border-t border-white/[0.08]" aria-labelledby="tech-title">
      <div className="container-custom">
        <Reveal className="mb-16 max-w-3xl lg:mb-24">
          <SectionLabel index={index}>Herramientas</SectionLabel>
          <h2 id="tech-title" className="mt-6 text-display-lg font-semibold text-white">
            Con qué trabajamos.
          </h2>
          <p className="mt-6 max-w-xl text-lead text-slate-300">
            Herramientas maduras, en su mayoría de código abierto. Elegimos la que resuelve tu caso, no la
            que más nos conviene vender.
          </p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary-400">
              {erp.title} · plataforma principal
            </p>
            <SplitReveal
              as="p"
              mode="lines"
              className="mt-2 font-semibold leading-[0.85] tracking-[-0.06em] text-white [font-size:clamp(5rem,3rem+9vw,11rem)]"
              lines={[{ text: principal }]}
            />
            <p className="mt-6 max-w-sm leading-relaxed text-slate-400">
              Community y Enterprise, modular y de código abierto. Cuando el caso lo pide:{" "}
              <span className="text-slate-200">{alternatives.join(" · ")}</span>.
            </p>
          </Reveal>

          <RevealGroup as="ul" className="border-t border-white/[0.1] lg:col-span-7">
            {others.map((category) => (
              <RevealItem
                as="li"
                key={category.title}
                className="grid gap-3 border-b border-white/[0.1] py-7 sm:grid-cols-[11rem_1fr] sm:gap-8 lg:py-9"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">{category.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{category.description}</p>
                </div>
                <p className="text-2xl font-light leading-snug tracking-tight text-slate-200 sm:text-[1.75rem]">
                  {category.items.map((item, index) => (
                    <span key={item}>
                      <span className="whitespace-nowrap transition-colors hover:text-white">{item}</span>
                      {index < category.items.length - 1 && (
                        <span className="text-primary/70" aria-hidden="true">
                          {" / "}
                        </span>
                      )}{" "}
                    </span>
                  ))}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
