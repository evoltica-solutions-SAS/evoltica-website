"use client";

import { useActionState } from "react";
import { CheckCheck } from "lucide-react";
import { markAllReadAction, type MarkReadState } from "@/app/(portal)/app/notificaciones/actions";

/** "Marcar todo como leído" con el resultado anunciado a lectores de pantalla. */
export function MarkAllReadButton({ ids }: { ids: string[] }) {
  const [state, formAction, pending] = useActionState<MarkReadState, FormData>(markAllReadAction, {});
  return (
    <form action={formAction} className="flex flex-col items-end gap-2">
      {ids.map((id) => (
        <input key={id} type="hidden" name="id" value={id} />
      ))}
      <button type="submit" className="btn-secondary" disabled={pending || ids.length === 0}>
        <CheckCheck className="h-4 w-4" aria-hidden="true" />
        Marcar todo como leído
      </button>
      <p role="status" className="max-w-xs text-right text-xs text-slate-400">
        {state.message}
      </p>
    </form>
  );
}
