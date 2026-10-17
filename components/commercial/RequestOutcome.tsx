"use client";

import { useEffect, useRef } from "react";
import { FlaskConical, PlugZap, TriangleAlert } from "lucide-react";
import { RealChannels } from "./RealChannels";
import type { CommercialFormStatus } from "@/hooks/useCommercialForm";

interface RequestOutcomeProps {
  status: Extract<CommercialFormStatus, "prototype" | "unavailable" | "error">;
  message?: string;
  /** Resumen de lo que la persona escribió, para enviarlo por un canal real. */
  summary: string;
  subject: string;
  onBack: () => void;
}

const TITLES = {
  prototype: "Respuestas completas — nada se guardó ni se envió",
  unavailable: "Este formulario aún no recibe solicitudes",
  error: "No pudimos procesar tu solicitud",
} as const;

/** Resultado de un envío. Recibe el foco para que se anuncie. Nunca afirma recepción. */
export function RequestOutcome({ status, message, summary, subject, onBack }: RequestOutcomeProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);
  const Icon = status === "prototype" ? FlaskConical : status === "unavailable" ? PlugZap : TriangleAlert;

  return (
    <div role="status" className="space-y-6">
      <div className="flex h-14 w-14 items-center justify-center border border-secondary/40">
        <Icon className="h-6 w-6 text-secondary-400" aria-hidden="true" />
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="text-display-sm font-semibold text-white focus:outline-none">
        {TITLES[status]}
      </h2>
      {message && <p className="max-w-2xl leading-relaxed text-slate-300">{message}</p>}
      <div className="space-y-3">
        <p className="text-sm font-medium text-white">Para hablar con el equipo ahora, escríbenos directamente:</p>
        <RealChannels message={summary} subject={subject} />
        {summary && (
          <p className="text-xs leading-relaxed text-slate-400">
            El mensaje se abre en tu aplicación con un resumen de tus respuestas; puedes editarlo antes de enviarlo.
          </p>
        )}
      </div>
      <button type="button" onClick={onBack} className="text-sm font-medium text-slate-300 underline underline-offset-4 hover:text-white">
        Volver a mis respuestas
      </button>
    </div>
  );
}
