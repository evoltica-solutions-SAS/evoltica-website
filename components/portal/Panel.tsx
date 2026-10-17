import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title?: string;
  /** Enlace "ver todo" en la cabecera del panel. */
  link?: { href: string; label: string };
  children: React.ReactNode;
  className?: string;
  /** Sin padding interno (p. ej. cuando contiene una tabla). */
  flush?: boolean;
}

/** Superficie base del portal. */
export function Panel({ title, link, children, className, flush = false }: PanelProps) {
  const headingId = title ? `panel-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : undefined;
  return (
    <section
      className={cn("rounded-md border border-white/[0.08] bg-surface-alt", className)}
      aria-labelledby={headingId}
    >
      {title && (
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4">
          <h2 id={headingId} className="text-sm font-semibold text-white">
            {title}
          </h2>
          {link && (
            <Link href={link.href} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white">
              {link.label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
      <div className={flush ? undefined : "p-5"}>{children}</div>
    </section>
  );
}
