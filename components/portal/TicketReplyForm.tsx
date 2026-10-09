"use client";

import { useActionState } from "react";
import { replyTicketAction, type TicketFormState } from "@/app/(portal)/app/tickets/actions";
import { TICKET_RULES } from "@/lib/portal/ticket-validation";
import { AttachmentPicker } from "./AttachmentPicker";
import { FormMessage } from "./FormMessage";

const INITIAL: TicketFormState = { status: "idle" };

/** Respuesta del cliente en un ticket propio. */
export function TicketReplyForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(replyTicketAction, INITIAL);
  const bodyError = state.fieldErrors?.body;

  return (
    <form action={formAction} noValidate className="space-y-4">
      <input type="hidden" name="ticket" value={ticketId} />
      <FormMessage state={state} />
      <div>
        <label htmlFor="t-respuesta" className="mb-1.5 block text-sm font-medium text-white">
          Tu respuesta
        </label>
        <textarea
          id="t-respuesta"
          name="respuesta"
          rows={4}
          required
          minLength={TICKET_RULES.body.min}
          maxLength={TICKET_RULES.body.max}
          defaultValue={state.values?.body}
          aria-invalid={Boolean(bodyError)}
          aria-describedby={bodyError ? "t-respuesta-error" : undefined}
          className="w-full rounded-md border border-white/[0.12] bg-background px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none aria-[invalid=true]:border-white"
        />
        {bodyError && (
          <p id="t-respuesta-error" className="mt-1.5 text-sm font-medium text-white">
            {bodyError}
          </p>
        )}
      </div>
      <AttachmentPicker serverError={state.fieldErrors?.attachments} />
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Enviando…" : "Responder"}
        </button>
      </div>
    </form>
  );
}
