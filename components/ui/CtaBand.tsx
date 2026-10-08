import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { PRIMARY_CTA, SITE } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

interface CtaBandProps {
  title?: React.ReactNode;
  lead?: string;
}

/** Cierre de conversión común a todas las páginas internas. */
export function CtaBand({
  title = (
    <>
      Hablemos de tu operación. <span className="text-slate-500">El primer paso es gratis.</span>
    </>
  ),
  lead = `Agenda una reunión de descubrimiento sin compromiso. Respondemos en menos de ${SITE.responseTime}.`,
}: CtaBandProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative">
        <Reveal className="border-gradient relative overflow-hidden rounded-[2rem] bg-ink-800 px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 mask-fade-b" aria-hidden="true" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-display-md font-semibold text-white text-balance">{title}</h2>
              <p className="mt-6 max-w-xl text-lead text-slate-400">{lead}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonLink>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
