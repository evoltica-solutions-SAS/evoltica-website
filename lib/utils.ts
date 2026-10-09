import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Registra la escala tipográfica propia (tailwind.config.ts → fontSize) para que
// tailwind-merge no la confunda con colores (`text-lead` vs `text-slate-400`).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-hero", "display-xl", "display-lg", "display-md", "display-sm", "lead"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + "…";
}

export const WHATSAPP_NUMBER = "573144036151";
export const WHATSAPP_MESSAGE =
  "Hola, me interesa una solución tecnológica para mi empresa y quisiera recibir asesoría.";

export function getWhatsAppUrl(
  message: string = WHATSAPP_MESSAGE,
  number: string = WHATSAPP_NUMBER
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
