import { FlaskConical } from "lucide-react";

/**
 * Indicador permanente del entorno de demostración (solo `next dev`).
 * Va en el shell: ninguna pantalla con datos ficticios puede verse sin él.
 */
export function DemoBanner() {
  return (
    <div role="note" className="border-b border-secondary/40 bg-secondary/10 px-4 py-2 sm:px-6 lg:px-10">
      <p className="flex items-center gap-2 text-xs text-slate-200 sm:text-sm">
        <FlaskConical className="h-4 w-4 shrink-0 text-secondary-400" aria-hidden="true" />
        <strong className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-secondary-400">
          Entorno de demostración
        </strong>
        <span className="hidden sm:inline">
          — Datos ficticios. Nada de lo que hagas aquí se guarda ni se envía a Evoltica.
        </span>
        <span className="sm:hidden">— Datos ficticios.</span>
      </p>
    </div>
  );
}
