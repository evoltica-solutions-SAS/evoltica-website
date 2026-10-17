"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

/** Error al cargar una pantalla del portal. No muestra detalles técnicos al cliente. */
export default function PortalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto max-w-lg py-16 text-center">
      <AlertTriangle className="mx-auto h-8 w-8 text-white" aria-hidden="true" />
      <h1 className="mt-5 font-display text-3xl font-semibold uppercase text-white">No pudimos cargar esta sección</h1>
      <p className="mt-3 text-slate-400">
        Puede ser un problema temporal de conexión con nuestros sistemas. Intenta de nuevo en unos segundos.
        {error.digest && <span className="mt-2 block font-mono text-xs text-slate-500">Referencia: {error.digest}</span>}
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-8">
        Reintentar
      </button>
    </div>
  );
}
