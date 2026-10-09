import { AlertTriangle, FlaskConical, PlugZap } from "lucide-react";
import type { TicketFormState } from "@/app/(portal)/app/tickets/actions";

/** Resultado de un envío del portal (demostración, no disponible, inválido). */
export function FormMessage({ state }: { state: TicketFormState }) {
  if (state.status === "idle" || !state.message) return null;
  const Icon = state.status === "demo" ? FlaskConical : state.status === "unavailable" ? PlugZap : AlertTriangle;
  return (
    <p
      role={state.status === "invalid" ? "alert" : "status"}
      className={
        state.status === "demo"
          ? "flex gap-3 rounded-md border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm text-slate-200"
          : "flex gap-3 rounded-md border border-white/30 bg-white/[0.04] px-4 py-3 text-sm text-white"
      }
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {state.message}
    </p>
  );
}
