import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { SolutionDetail } from "@/components/sections/SolutionDetail";
import { PUBLISHED_SOLUTIONS, getLine, getSolution, solutionCta } from "@/lib/catalog";
import { SITE, SITE_URL } from "@/lib/site-config";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  const line = getLine(solution.line);
  const title = `${solution.title} — ${line.title}`;
  const path = `/soluciones/${solution.slug}`;
  return {
    title,
    description: solution.summary,
    keywords: solution.keywords,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE.legalName}`, description: solution.summary, url: path },
    twitter: { title: `${title} | ${SITE.legalName}`, description: solution.summary },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();
  const line = getLine(solution.line);
  const cta = solutionCta(solution);

  return (
    <>
      <PageHero
        eyebrow={`${line.number} — ${line.title}`}
        title={solution.title}
        lead={solution.summary}
        breadcrumbs={[
          { label: "Soluciones", href: "/soluciones" },
          { label: solution.title, href: `/soluciones/${solution.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          <a href={cta.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        </div>
      </PageHero>

      <SolutionDetail solution={solution} />

      <CtaBand
        title={
          <>
            ¿{solution.title} para tu empresa? <span className="text-slate-500">Empecemos por entenderla.</span>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: solution.title,
          serviceType: solution.title,
          category: line.title,
          description: solution.summary,
          url: `${SITE_URL}/soluciones/${solution.slug}`,
          areaServed: { "@type": "Country", name: "Colombia" },
          provider: { "@type": "Organization", name: SITE.legalName, url: SITE_URL },
        }}
      />
    </>
  );
}
