import { PlugZap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Aviso de integración pendiente: dice qué falta para que algo funcione de
 * verdad, en lugar de simularlo (ADR-012).
 */
export function IntegrationNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex gap-3 rounded-md border border-dashed border-white/[0.16] px-4 py-3 text-sm text-slate-400",
        className,
      )}
    >
      <PlugZap className="mt-0.5 h-4 w-4 shrink-0 text-secondary-400" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
