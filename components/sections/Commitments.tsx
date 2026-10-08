import { Counter } from "@/components/ui/Counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { COMMITMENTS } from "@/lib/company-data";

/** Compromisos públicos de servicio (no son métricas de resultados de clientes). */
export function Commitments() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900 py-20 lg:py-28" aria-labelledby="commitments-title">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50 mask-fade-b" aria-hidden="true" />
      <div className="container-custom relative">
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Nuestro compromiso</SectionLabel>
            <h2 id="commitments-title" className="mt-5 max-w-2xl text-display-sm font-semibold text-white text-balance">
              Lo que puedes esperar desde el primer día.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Compromisos de servicio de Evoltica. Sin costos ocultos ni letra pequeña.
          </p>
        </div>

        <RevealGroup as="ul" className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
          {COMMITMENTS.map((item) => (
            <RevealItem as="li" key={item.label} className="bg-ink-900 p-5 sm:p-8 lg:p-10">
              <p className="text-[clamp(2.1rem,1.2rem+3.4vw,4.75rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                {item.value === null ? (
                  item.display
                ) : (
                  <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                )}
              </p>
              <p className="mt-4 max-w-[14rem] text-sm sm:text-[0.95rem] leading-relaxed text-slate-400">{item.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
