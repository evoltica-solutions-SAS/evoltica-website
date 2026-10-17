"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const MAX_LENGTH = 2000;

/**
 * Campo "Cuéntanos qué quieres mejorar": envía el texto al formulario de
 * contacto (/contacto?mensaje=...) para que el visitante no lo escriba dos veces.
 * No hay IA detrás: es un atajo honesto hacia una persona del equipo.
 * Sin dictado por voz: se retiró el 2026-10-10 porque `Permissions-Policy:
 * microphone=()` lo bloqueaba (botón visible e inoperante) y no tenía un
 * propósito de negocio aprobado.
 */
export function HeroPrompt() {
  const router = useRouter();
  const [text, setText] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = text.trim();
    router.push(message ? `/contacto?mensaje=${encodeURIComponent(message)}` : "/contacto");
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full items-center gap-2 rounded-xl border border-white/20 bg-background/60 p-1.5 pl-4 backdrop-blur transition-colors focus-within:border-primary/70"
    >
      <label htmlFor="hero-prompt" className="sr-only">
        Cuéntanos qué quieres mejorar en tu empresa
      </label>
      <input
        id="hero-prompt"
        value={text}
        onChange={(event) => setText(event.target.value.slice(0, MAX_LENGTH))}
        placeholder="Cuéntanos qué quieres mejorar y te mostramos cómo."
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] text-white placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Enviar y continuar al formulario de contacto"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-ink-950 transition-colors hover:bg-snow"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
