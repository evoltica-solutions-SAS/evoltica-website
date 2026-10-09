import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Trama } from "@/components/ui/Trama";

export const metadata: Metadata = {
  title: { default: "Acceso", template: "%s | Portal Evoltica" },
  robots: { index: false, follow: false },
};

/**
 * Pantallas de acceso (ADR-012): marca + tarjeta, sin navegación de marketing.
 * El acceso real está en preparación hasta ADR-013.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -right-[30vw] top-[15%] w-[80vw] opacity-20 lg:-right-[8vw] lg:w-[42vw] lg:opacity-40"
        aria-hidden="true"
      >
        <Trama id="auth-trama" />
      </div>
      <header className="relative flex h-16 items-center justify-between px-4 sm:px-8">
        <Logo size={32} />
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden items-center gap-1.5 text-sm text-slate-400 hover:text-white sm:flex">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al sitio
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" className="relative flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
