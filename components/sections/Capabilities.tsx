import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TECH_CATEGORIES } from "@/lib/technologies-data";
import { cn } from "@/lib/utils";

// Distribución bento en escritorio (12 columnas), una tarjeta por categoría.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Capabilities() {
  return (
    <section id="tecnologias" className="section-padding relative border-t border-white/[0.06]" aria-labelledby="capabilities-title">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Capacidades"
          title={
            <span id="capabilities-title">
              Plataformas probadas, <span className="text-slate-500">elegidas por lo que resuelven.</span>
            </span>
          }
          lead="Trabajamos con herramientas maduras y en su mayoría open source, para que tu inversión no dependa de licencias opacas ni de un solo proveedor."
        />

        <RevealGroup className="grid gap-4 lg:grid-cols-12">
          {TECH_CATEGORIES.map((category, index) => (
            <RevealItem
              as="article"
              key={category.title}
              className={cn("card card-interactive group relative overflow-hidden p-7 sm:p-9", SPANS[index])}
            >
              <span
                className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-[7rem] font-medium leading-none text-white/[0.03]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-slate-400">{category.description}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li key={item} className="tech-badge">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
