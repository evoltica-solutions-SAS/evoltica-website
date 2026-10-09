import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site-config";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

/** Migas de pan visibles + BreadcrumbList (schema.org). El primer ítem es siempre Inicio. */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ label: "Inicio", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="Migas de pan" className="mb-8">
        <ol className="flex h-5 min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden whitespace-nowrap font-mono text-xs uppercase leading-5 tracking-[0.12em] text-slate-400">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className={isLast ? "min-w-0 truncate" : "flex shrink-0 items-center gap-1.5"}>
                {isLast ? (
                  <span aria-current="page" className="text-slate-300">
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
          })),
        }}
      />
    </>
  );
}
