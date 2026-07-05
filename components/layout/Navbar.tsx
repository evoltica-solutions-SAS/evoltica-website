"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { useSectionNav } from "@/hooks/useSectionNav";

type NavLink =
  | { href: string; label: string; type: "anchor" }
  | { href: string; label: string; type: "route" };

const navLinks: NavLink[] = [
  { href: "#sobre-nosotros", label: "Nosotros", type: "anchor" },
  { href: "/servicios", label: "Servicios", type: "route" },
  { href: "#tecnologias", label: "Tecnologías", type: "anchor" },
  { href: "#enfoque", label: "Nuestro Enfoque", type: "anchor" },
  { href: "#proceso", label: "Proceso", type: "anchor" },
  { href: "#faq", label: "FAQ", type: "anchor" },
];

export function Navbar() {
  const pathname = usePathname();
  const { goToSection } = useSectionNav();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname !== "/") return;

      const sections = navLinks
        .filter((link): link is Extract<NavLink, { type: "anchor" }> => link.type === "anchor")
        .map((link) => link.href.replace("#", ""));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (link: NavLink) => {
    setIsMenuOpen(false);
    if (link.type === "anchor") {
      goToSection(link.href);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo />

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.type === "route"
                    ? pathname === link.href
                    : pathname === "/" && activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    {link.type === "route" ? (
                      <Link
                        href={link.href}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-block",
                          isActive
                            ? "text-white bg-white/[0.08]"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        )}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive
                            ? "text-white bg-white/[0.08]"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        )}
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => goToSection("#contacto")}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Solicitar Consultoría
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#0B0F19] border-l border-white/[0.08] flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
                <span className="text-lg font-bold text-white">Menú</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.type === "route" ? (
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors text-left"
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleNavClick(link)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors text-left"
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    goToSection("#contacto");
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Solicitar Consultoría
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
