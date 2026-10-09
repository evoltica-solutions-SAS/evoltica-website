"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_STORAGE_KEY = "evoltica-theme";

/**
 * Interruptor claro/oscuro. Oscuro es el tema de marca por defecto; la elección
 * se guarda en localStorage y el script de app/layout.tsx la aplica antes del
 * primer pintado (sin parpadeo).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    const root = document.documentElement;
    root.classList.toggle("light", next);
    root.classList.toggle("dark", !next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // Sin almacenamiento disponible: el tema solo dura esta visita.
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Tema claro"
      onClick={toggle}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-white/20 transition-colors hover:border-white/40",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-background transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          light && "translate-x-6"
        )}
      >
        {light ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}
