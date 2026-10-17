import { PageHero } from "@/components/ui/PageHero";
import { RequestUnavailable } from "./RequestUnavailable";

interface RequestPageProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  href: string;
  /** Formulario de prototipo (solo `next dev`); `null` en producción. */
  form: React.ReactNode | null;
  /** Mensaje y asunto sugeridos para los canales reales cuando no hay formulario. */
  fallback: { message: string; subject: string };
}

/** Estructura común de /diagnostico, /consultoria y /cotizar. */
export function RequestPage({ eyebrow, title, lead, href, form, fallback }: RequestPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        breadcrumbs={[{ label: eyebrow, href }]}
        className="pb-4 lg:pb-8"
      />
      <section className="py-16 lg:py-24">
        <div className="container-custom max-w-4xl">
          {form ?? <RequestUnavailable message={fallback.message} subject={fallback.subject} />}
        </div>
      </section>
    </>
  );
}
