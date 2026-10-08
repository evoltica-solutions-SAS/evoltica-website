import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MAIN_NAV } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pb-20 pt-40">
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div className="mask-fade-b absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="container-custom relative">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 max-w-3xl text-display-xl font-semibold text-white">
          Esta página no existe. <span className="text-slate-500">Tu operación sí.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lead text-slate-400">
          Es posible que el enlace haya cambiado con la nueva versión del sitio. Estas rutas pueden ayudarte:
        </p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <ButtonLink href="/contacto" variant="secondary">
            Contactar a Evoltica
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-arrow text-slate-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
