import type { Money } from "@/lib/domain";

/** Formatos es-CO del portal. Zona horaria fija para que servidor y navegador coincidan. */
const TIME_ZONE = "America/Bogota";

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: money.currency === "COP" ? 0 : 2,
  }).format(money.amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", year: "numeric", timeZone: TIME_ZONE }).format(
    new Date(iso),
  );
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** Días enteros desde hoy hasta la fecha (negativo si ya pasó). */
export function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / (24 * 60 * 60 * 1000));
}

export function describeDue(iso: string): string {
  const days = daysUntil(iso);
  if (days === 0) return "hoy";
  if (days === 1) return "mañana";
  if (days > 0) return `en ${days} días`;
  return days === -1 ? "hace 1 día" : `hace ${-days} días`;
}

export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000;
    unit += 1;
  }
  return `${value.toLocaleString("es-CO", { maximumFractionDigits: 1 })} ${units[unit]}`;
}
