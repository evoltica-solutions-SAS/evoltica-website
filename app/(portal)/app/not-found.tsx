import Link from "next/link";
import { SearchX } from "lucide-react";

/**
 * Registro inexistente o de otra organización. Ambos casos responden igual: el
 * portal no revela si un identificador existe fuera de tu cuenta.
 */
export default function PortalNotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <SearchX className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
      <h1 className="mt-5 font-display text-3xl font-semibold uppercase text-white">No encontramos este registro</h1>
      <p className="mt-3 text-slate-400">No existe o no pertenece a tu organización.</p>
      <Link href="/app" className="btn-secondary mt-8">
        Volver al resumen
      </Link>
    </div>
  );
}
