/** Lectura segura de searchParams: solo valores conocidos llegan al repositorio. */

type Param = string | string[] | undefined;

export function pickEnum<T extends string>(value: Param, allowed: readonly T[]): T | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return allowed.find((option) => option === raw);
}

export function pickText(value: Param, maxLength = 80): string | undefined {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim();
  return raw ? raw.slice(0, maxLength) : undefined;
}

export function pickPage(value: Param): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export type SearchParams = Promise<Record<string, Param>>;
