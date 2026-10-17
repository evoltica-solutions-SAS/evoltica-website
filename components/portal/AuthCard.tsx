import { Construction } from "lucide-react";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/** Tarjeta de las pantallas de acceso, con el aviso de "acceso en preparación". */
export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="rounded-md border border-white/[0.1] bg-surface-alt p-6 shadow-2xl shadow-black/20 sm:p-8">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-secondary-400">Portal de clientes</p>
      <h1 className="mt-3 font-display text-4xl font-semibold uppercase leading-none text-white">{title}</h1>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
      <div role="note" className="mt-6 flex gap-3 rounded-md border border-white/[0.14] bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
        <Construction className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" aria-hidden="true" />
        <span>
          <strong className="font-semibold text-white">Acceso en preparación.</strong> El portal todavía no está habilitado:
          este formulario no envía datos ni acepta credenciales.
        </span>
      </div>
      <div className="mt-6">{children}</div>
      {footer && <div className="mt-6 border-t border-white/[0.08] pt-5 text-sm text-slate-400">{footer}</div>}
    </div>
  );
}

export const authFieldClass =
  "w-full rounded-md border border-white/[0.12] bg-background px-3 py-2.5 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60";
