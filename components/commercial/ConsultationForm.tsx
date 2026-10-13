"use client";

import { Loader2 } from "lucide-react";
import { useCommercialForm } from "@/hooks/useCommercialForm";
import { MEETING_MODES, TIME_SLOTS } from "@/lib/domain";
import { MEETING_MODE_LABELS, TIME_SLOT_LABELS, type SolutionOption } from "@/lib/commercial/options";
import { COMMERCIAL_RULES, type CommercialField } from "@/lib/commercial/validation";
import { ChoiceGroup, CONTACT_FIELDS, ContactFields, DataNotice, ErrorSummary, Honeypot, PrototypeNotice, TextField } from "./FormParts";
import { RequestOutcome } from "./RequestOutcome";
import { SolutionSelect } from "./SolutionSelect";

const PREFIX = "cons";
const ORDER: CommercialField[] = ["topic", "solution", "meetingMode", "availability", ...CONTACT_FIELDS];

interface ConsultationFormProps {
  solutions: SolutionOption[];
  defaultSolution?: string;
}

/** Solicitud de consultoría con disponibilidad PREFERIDA: nunca es una cita agendada. */
export function ConsultationForm({ solutions, defaultSolution }: ConsultationFormProps) {
  const form = useCommercialForm("CONSULTORIA", solutions);
  const showOutcome = form.status === "prototype" || form.status === "unavailable" || form.status === "error";

  return (
    <div className="card p-6 sm:p-8 lg:p-10">
      {showOutcome && (
        <RequestOutcome
          status={form.status as "prototype" | "unavailable" | "error"}
          message={form.message}
          summary={form.requestSummary}
          subject="Solicitud de consultoría"
          onBack={form.backToForm}
        />
      )}

      <form ref={form.formRef} onSubmit={form.onSubmit} noValidate hidden={showOutcome} aria-label="Solicitud de consultoría" className="relative space-y-8">
        <PrototypeNotice />
        <ErrorSummary ref={form.summaryRef} prefix={PREFIX} message={form.message} errors={form.errors} order={ORDER} groupFields={["meetingMode", "availability"]} />
        <Honeypot />

        <TextField
          prefix={PREFIX}
          field="topic"
          label="¿Sobre qué quieres conversar?"
          hint="Qué decisión o problema quieres revisar con el equipo."
          multiline
          maxLength={COMMERCIAL_RULES.topic.max}
          errors={form.errors}
        />
        <SolutionSelect prefix={PREFIX} solutions={solutions} defaultValue={defaultSolution} optional errors={form.errors} />
        <ChoiceGroup
          prefix={PREFIX}
          field="meetingMode"
          legend="Formato preferido"
          type="radio"
          optional
          options={MEETING_MODES}
          labels={MEETING_MODE_LABELS}
          errors={form.errors}
        />
        <ChoiceGroup
          prefix={PREFIX}
          field="availability"
          legend="Franjas que te quedan mejor"
          hint="Indica cuándo te queda mejor; el equipo propone el horario. Esto no agenda una reunión."
          type="checkbox"
          options={TIME_SLOTS}
          labels={TIME_SLOT_LABELS}
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
