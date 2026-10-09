import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  /** Enlace de regreso en vistas de detalle. */
  back?: { href: string; label: string };
  actions?: React.ReactNode;
}

/** Encabezado de cada pantalla del portal: título condensado, contexto y acciones. */
export function PageHeader({ title, description, back, actions }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back && (
          <Link
            href={back.href}
            className="mb-3 inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            {back.label}
          </Link>
        )}
        <h1 className="break-words font-display text-4xl font-semibold uppercase leading-none tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-2xl text-slate-400">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </header>
  );
}
