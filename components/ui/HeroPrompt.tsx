"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

// Tipado mínimo de la Web Speech API (no está en lib.dom de TypeScript).
interface SpeechResultEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

const MAX_LENGTH = 2000;

/**
 * Campo "Cuéntanos qué quieres mejorar": envía el texto al formulario de
 * contacto (/contacto?mensaje=...) para que el visitante no lo escriba dos veces.
 * No hay IA detrás: es un atajo honesto hacia una persona del equipo.
 * El dictado por voz solo aparece si el navegador lo soporta.
 */
export function HeroPrompt() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [speechCtor, setSpeechCtor] = useState<SpeechRecognitionCtor | null>(null);
  const recognition = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    setSpeechCtor(() => w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null);
    return () => recognition.current?.stop();
  }, []);

  const toggleDictation = () => {
    if (!speechCtor) return;
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const rec = new speechCtor();
    rec.lang = "es-CO";
    rec.interimResults = false;
    rec.onresult = (event) => {
      const spoken = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ");
      setText((current) => (current ? `${current} ${spoken}` : spoken).slice(0, MAX_LENGTH));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognition.current = rec;
    setListening(true);
    rec.start();
  };

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
      {speechCtor && (
        <button
          type="button"
          onClick={toggleDictation}
          aria-pressed={listening}
          aria-label={listening ? "Detener dictado" : "Dictar por voz"}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors",
            listening ? "border-primary bg-primary text-ink-950" : "border-white/20 text-white hover:border-white/50"
          )}
        >
          {listening ? <MicOff className="h-4 w-4" aria-hidden="true" /> : <Mic className="h-4 w-4" aria-hidden="true" />}
        </button>
      )}
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
