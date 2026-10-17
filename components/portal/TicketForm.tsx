"use client";

import { useActionState } from "react";
import { createTicketAction, type TicketFormState } from "@/app/(portal)/app/tickets/actions";
import { TICKET_PRIORITIES } from "@/lib/domain";
import { TICKET_PRIORITY } from "@/lib/portal/labels";
import { TICKET_RULES } from "@/lib/portal/ticket-validation";
import { AttachmentPicker } from "./AttachmentPicker";
import { FormMessage } from "./FormMessage";

interface TicketFormProps {
  services: { id: string; name: string }[];
  defaultServiceId?: string;
}

const INITIAL: TicketFormState = { status: "idle" };
const fieldClass =
  "w-full rounded-md border border-white/[0.12] bg-background px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none aria-[invalid=true]:border-white";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1.5 text-sm font-medium text-white">
      {message}
    </p>
  ) : null;
}

/** Formulario de creación de ticket. La validación se repite en el servidor. */
export function TicketForm({ services, defaultServiceId }: TicketFormProps) {
  const [state, formAction, pending] = useActionState(createTicketAction, INITIAL);
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  return (
    <form action={formAction} noValidate className="space-y-6">
      <FormMessage state={state} />

      <div>
        <label htmlFor="t-asunto" className="mb-1.5 block text-sm font-medium text-white">
          Asunto
        </label>
        <input
          id="t-asunto"
          name="asunto"
          required
          minLength={TICKET_RULES.subject.min}
          maxLength={TICKET_RULES.subject.max}
          defaultValue={values.subject}
          placeholder="Resume el problema en una línea"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "t-asunto-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="t-asunto-error" message={errors.subject} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="t-servicio" className="mb-1.5 block text-sm font-medium text-white">
            Servicio relacionado <span className="font-normal text-slate-500">(opcional)</span>
          </label>
          <select
            id="t-servicio"
            name="servicio"
            defaultValue={values.service ?? defaultServiceId ?? ""}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "t-servicio-error" : undefined}
            className={fieldClass}
          >
            <option value="">Ninguno en particular</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <FieldError id="t-servicio-error" message={errors.service} />
        </div>

        <fieldset aria-describedby={errors.priority ? "t-prioridad-error" : "t-prioridad-help"}>
          <legend className="mb-1.5 text-sm font-medium text-white">Prioridad</legend>
          <div className="grid grid-cols-4 gap-1 rounded-md border border-white/[0.12] p-1">
            {TICKET_PRIORITIES.map((priority) => (
              <label key={priority} className="relative">
                <input
                  type="radio"
                  name="prioridad"
                  value={priority}
                  defaultChecked={(values.priority ?? "MEDIA") === priority}
                  className="peer sr-only"
                />
                <span className="flex h-9 cursor-pointer items-center justify-center rounded text-xs text-slate-400 transition-colors peer-checked:bg-white/[0.1] peer-checked:font-semibold peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                  {TICKET_PRIORITY[priority].label}
                </span>
              </label>
            ))}
          </div>
          <p id="t-prioridad-help" className="mt-1.5 text-xs text-slate-500">
            Crítica: la operación está detenida.
          </p>
          <FieldError id="t-prioridad-error" message={errors.priority} />
        </fieldset>
      </div>

      <div>
        <label htmlFor="t-descripcion" className="mb-1.5 block text-sm font-medium text-white">
          Descripción
        </label>
        <textarea
          id="t-descripcion"
          name="descripcion"
          rows={7}
          required
          minLength={TICKET_RULES.body.min}
          maxLength={TICKET_RULES.body.max}
          defaultValue={values.body}
          placeholder="¿Qué pasó, desde cuándo y a quién afecta?"
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? "t-descripcion-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="t-descripcion-error" message={errors.body} />
      </div>

      <AttachmentPicker serverError={errors.attachments} />

      <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:justify-end">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Enviando…" : "Crear ticket"}
        </button>
      </div>
    </form>
  );
}
