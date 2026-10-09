import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { COMMITMENTS } from "@/lib/company-data";
import { scaleIn } from "@/hooks/useScrollAnimation";

/**
 * Compromisos públicos de servicio en composición asimétrica: uno destacado a
 * gran escala, el resto en columna. Son compromisos, no resultados de clientes.
 */
/** `index` solo en páginas con capítulos numerados. */
export function Commitments({ index }: { index?: string }) {
  const [featured, ...rest] = COMMITMENTS;
  const [featuredNumber, featuredUnit] = featured.value.split(" ");

  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-surface-alt py-24 lg:py-32" aria-labelledby="commitments-title">
      <div className="container-custom grid gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <SectionLabel index={index}>Compromisos</SectionLabel>
          <h2 id="commitments-title" className="sr-only">
            Compromisos de servicio
          </h2>
          <RevealGroup amount={0.4}>
            <RevealItem variants={scaleIn} className="origin-bottom-left">
              <p className="mt-8 font-semibold leading-[0.8] tracking-[-0.07em] text-white [font-size:clamp(7rem,4rem+15vw,17rem)]">
                {featuredNumber}
                <span className="text-primary">{featuredUnit}</span>
              </p>
            </RevealItem>
          </RevealGroup>
          <p className="mt-8 max-w-md text-display-sm font-light text-slate-200">{featured.label}</p>
        </Reveal>

        <RevealGroup as="ul" className="self-end border-t border-white/[0.1] lg:col-span-4 lg:col-start-9">
          {rest.map((item) => (
            <RevealItem as="li" key={item.value} className="border-b border-white/[0.1] py-6">
              <p className="text-5xl font-semibold tracking-[-0.04em] text-white">{item.value}</p>
              <p className="mt-2 leading-relaxed text-slate-400">{item.label}</p>
            </RevealItem>
          ))}
          <RevealItem as="li" className="pt-6 text-xs leading-relaxed text-slate-400">
            Compromisos de servicio de Evoltica. Sin costos ocultos ni letra pequeña.
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
