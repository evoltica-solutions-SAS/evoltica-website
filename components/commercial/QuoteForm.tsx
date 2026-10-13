"use client";

import { Loader2 } from "lucide-react";
import { useCommercialForm } from "@/hooks/useCommercialForm";
import { DESIRED_TIMELINES } from "@/lib/domain";
import { TIMELINE_LABELS, type SolutionOption } from "@/lib/commercial/options";
import { COMMERCIAL_RULES, type CommercialField } from "@/lib/commercial/validation";
import { ChoiceGroup, CONTACT_FIELDS, ContactFields, DataNotice, ErrorSummary, Honeypot, PrototypeNotice, TextField } from "./FormParts";
import { RequestOutcome } from "./RequestOutcome";
import { SolutionSelect } from "./SolutionSelect";

const PREFIX = "cot";
const ORDER: CommercialField[] = ["solution", "need", "estimatedScope", "desiredTimeline", ...CONTACT_FIELDS];

interface QuoteFormProps {
  solutions: SolutionOption[];
  defaultSolution?: string;
}

/** Solicitud de cotización. No muestra precios ni rangos: el valor se define en la propuesta. */
export function QuoteForm({ solutions, defaultSolution }: QuoteFormProps) {
  const form = useCommercialForm("COTIZACION", solutions);
  const showOutcome = form.status === "prototype" || form.status === "unavailable" || form.status === "error";

  return (
    <div className="card p-6 sm:p-8 lg:p-10">
      {showOutcome && (
        <RequestOutcome
          status={form.status as "prototype" | "unavailable" | "error"}
          message={form.message}
          summary={form.requestSummary}
          subject="Solicitud de cotización"
          onBack={form.backToForm}
        />
      )}

      <form ref={form.formRef} onSubmit={form.onSubmit} noValidate hidden={showOutcome} aria-label="Solicitud de cotización" className="relative space-y-8">
        <PrototypeNotice />
        <ErrorSummary ref={form.summaryRef} prefix={PREFIX} message={form.message} errors={form.errors} order={ORDER} groupFields={["desiredTimeline"]} />
        <Honeypot />

        <SolutionSelect prefix={PREFIX} solutions={solutions} defaultValue={defaultSolution} label="Solución que quieres cotizar" errors={form.errors} />
        <TextField
          prefix={PREFIX}
          field="need"
          label="¿Qué necesitas?"
          hint="Qué proceso quieres cubrir y qué esperas lograr."
          multiline
          rows={5}
          maxLength={COMMERCIAL_RULES.need.max}
          errors={form.errors}
        />
        <TextField
          prefix={PREFIX}
          field="estimatedScope"
          label="Alcance estimado"
          hint="Por ejemplo: número de usuarios, sedes o volumen de operaciones."
          optional
          maxLength={COMMERCIAL_RULES.estimatedScope.max}
          errors={form.errors}
        />
        <ChoiceGroup
          prefix={PREFIX}
          field="desiredTimeline"
          legend="¿Para cuándo lo necesitas?"
          type="radio"
          optional
          options={DESIRED_TIMELINES}
          labels={TIMELINE_LABELS}
          errors={form.errors}
        />
        <ContactFields prefix={PREFIX} errors={form.errors} />
        <DataNotice />

        <div className="flex justify-end border-t border-white/[0.08] pt-6">
          <button type="submit" disabled={form.pending} aria-busy={form.pending} className="btn-primary w-full sm:w-auto">
            {form.pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Comprobar solicitud (prueba)
          </button>
        </div>
      </form>
    </div>
  );
}
