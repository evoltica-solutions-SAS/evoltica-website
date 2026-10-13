import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Trama } from "@/components/ui/Trama";
import { PRIMARY_CTA } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

interface CtaBandProps {
  title?: React.ReactNode;
  lead?: string;
}

/** Cierre de conversión de las páginas internas: banda completa con la trama recortada. */
export function CtaBand({
  title = (
    <>
      Hablemos de tu operación.
      <span className="block font-light text-slate-400">El primer paso es una conversación sin compromiso.</span>
    </>
  ),
  lead = "Agenda una reunión de descubrimiento sin compromiso.",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-surface-alt py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -bottom-[18vw] -right-[24vw] w-[64vw] opacity-40 lg:-bottom-[12vw] lg:-right-[8vw] lg:w-[40vw] lg:opacity-80"
        aria-hidden="true"
      >
        <Trama id="cta-trama" band={58} draw={false} hatch={false} />
      </div>
      <div className="container-custom relative">
        <Reveal className="max-w-4xl">
          <h2 className="text-display-lg font-semibold text-white">{title}</h2>
          <p className="mt-6 max-w-xl text-lead text-slate-300">{lead}</p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonLink>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
