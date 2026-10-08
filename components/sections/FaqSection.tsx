import { Accordion } from "@/components/ui/Accordion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/lib/faq-data";

export function FaqSection() {
  return (
    <section id="faq" className="section-padding relative border-t border-white/[0.06]" aria-labelledby="faq-title">
      <div className="container-custom grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <h2 id="faq-title" className="mt-5 text-display-md font-semibold text-white">
              Antes de empezar.
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-slate-400">
              Lo que más nos preguntan las empresas antes de su primera reunión. ¿Tienes otra duda?
            </p>
            <ButtonLink href="/contacto" variant="arrow" className="mt-8">
              Escríbenos tu pregunta
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8" amount={0.05}>
          <Accordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
