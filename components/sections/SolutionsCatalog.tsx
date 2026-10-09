"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { MODE_META, PUBLISHED_SOLUTIONS } from "@/lib/catalog";
import { SERVICES } from "@/lib/services-data";
import type { CommercialMode } from "@/lib/domain";
import { cn } from "@/lib/utils";

const LINE_INFO = new Map(SERVICES.map((line) => [line.slug, { number: line.number, title: line.title }]));
const MODES_PRESENT = Array.from(new Set(PUBLISHED_SOLUTIONS.map((s) => s.mode))) as CommercialMode[];

const normalize = (text: string) =>
  text.toLocaleLowerCase("es").normalize("NFD").replace(/[̀-ͯ]/g, "");

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 border px-3.5 py-2 text-sm transition-colors",
        active
          ? "border-primary bg-primary/10 font-medium text-white"
          : "border-white/[0.14] text-slate-300 hover:border-white/40 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

/**
 * Catálogo filtrable. El HTML del servidor trae TODAS las soluciones (SEO y sin
 * JavaScript); los filtros solo ocultan tarjetas en el navegador y se reflejan
 * en la URL (?linea=…&modalidad=…&q=…) para poder compartir la vista.
 */
export function SolutionsCatalog() {
  const [query, setQuery] = useState("");
  const [line, setLine] = useState<string | null>(null);
  const [mode, setMode] = useState<CommercialMode | null>(null);

  // Estado inicial desde la URL (tras hidratar, para no romper el render estático).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialLine = params.get("linea");
    const initialMode = params.get("modalidad") as CommercialMode | null;
    if (initialLine && LINE_INFO.has(initialLine)) setLine(initialLine);
    if (initialMode && MODES_PRESENT.includes(initialMode)) setMode(initialMode);
    setQuery((params.get("q") ?? "").slice(0, 60));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (line) params.set("linea", line);
    if (mode) params.set("modalidad", mode);
    if (query.trim()) params.set("q", query.trim());
    const search = params.toString();
    window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
  }, [line, mode, query]);

  const visible = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    return PUBLISHED_SOLUTIONS.filter((solution) => {
      if (line && solution.line !== line) return false;
      if (mode && solution.mode !== mode) return false;
      if (!terms.length) return true;
      const haystack = normalize(`${solution.title} ${solution.summary} ${LINE_INFO.get(solution.line)?.title ?? ""}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [query, line, mode]);

  const filtered = Boolean(line || mode || query.trim());
  const reset = () => {
    setLine(null);
    setMode(null);
    setQuery("");
  };

  return (
    <section className="section-padding relative border-t border-white/[0.06] !pt-12" aria-labelledby="catalog-title">
      <h2 id="catalog-title" className="sr-only">
        Catálogo de soluciones
      </h2>
      <div className="container-custom">
        <div role="search" className="flex flex-col gap-6 border-b border-white/[0.08] pb-8">
          <div className="relative max-w-xl">
            <label htmlFor="catalog-search" className="sr-only">
              Buscar soluciones
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="catalog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value.slice(0, 60))}
              placeholder="Busca por necesidad: inventario, backups, correo, nómina…"
              className="h-12 w-full border border-white/[0.14] bg-transparent pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <fieldset>
              <legend className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Línea</legend>
              <div className="flex flex-wrap gap-2">
                <Chip active={!line} onClick={() => setLine(null)}>
                  Todas
                </Chip>
                {SERVICES.map((service) => (
                  <Chip key={service.slug} active={line === service.slug} onClick={() => setLine(line === service.slug ? null : service.slug)}>
                    <span className="font-mono text-xs text-slate-400">{service.number}</span>
                    {service.title}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">Modalidad</legend>
              <div className="flex flex-wrap gap-2">
                {MODES_PRESENT.map((m) => (
                  <Chip key={m} active={mode === m} onClick={() => setMode(mode === m ? null : m)}>
                    {MODE_META[m].label}
                  </Chip>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p aria-live="polite" className="text-sm text-slate-400">
            {visible.length === 1 ? "1 solución" : `${visible.length} soluciones`}
            {filtered && ` de ${PUBLISHED_SOLUTIONS.length}`}
          </p>
          {filtered && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white">
              <X className="h-4 w-4" aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="mt-10 border border-dashed border-white/[0.16] px-6 py-14 text-center">
            <p className="text-lg font-medium text-white">No encontramos soluciones con esos filtros.</p>
            <p className="mt-2 text-slate-400">
              Cuéntanos qué necesitas y te orientamos:{" "}
              <Link href="/contacto" className="text-white underline underline-offset-4">
                escríbenos
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((solution) => {
              const lineInfo = LINE_INFO.get(solution.line);
              return (
                <li key={solution.slug}>
                  <Link
                    href={`/soluciones/${solution.slug}`}
                    className="card card-interactive group flex h-full flex-col p-7"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="icon-tile">
                        <solution.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:text-primary-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                      {lineInfo?.number} · {lineInfo?.title}
                    </span>
                    <span className="mt-2 text-lg font-semibold text-white">{solution.title}</span>
                    <span className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-slate-400">{solution.summary}</span>
                    <span className="mt-6 self-start border border-white/[0.14] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400">
                      {MODE_META[solution.mode].label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
