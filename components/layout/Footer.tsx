"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { useSectionNav } from "@/hooks/useSectionNav";
import { SERVICES } from "@/lib/services-data";
import { Logo } from "@/components/layout/Logo";

const company = [
  { label: "Sobre Nosotros", href: "#sobre-nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nuestro Enfoque", href: "#enfoque" },
  { label: "Proceso", href: "#proceso" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "FAQ", href: "#faq" },
];

const legal = [
  { label: "Política de Privacidad", href: "/privacidad" },
  { label: "Términos y Condiciones", href: "/terminos" },
  { label: "Política de Cookies", href: "/cookies" },
  { label: "Tratamiento de Datos", href: "/datos" },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/evoltica",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://twitter.com/evoltica", label: "Twitter" },
  { icon: Github, href: "https://github.com/evoltica", label: "GitHub" },
];

export function Footer() {
  const { goToSection } = useSectionNav();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#080B12]">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-custom py-16 lg:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Logo className="mb-6" />
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Transformamos procesos. Impulsamos crecimiento. Consultoría,
              ERP, automatización e infraestructura para empresas que quieren
              evolucionar.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:comercial@evoltica.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-primary-400 group-hover:text-primary transition-colors" />
                comercial@evoltica.com
              </a>
              <a
                href="tel:+573144036151"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-primary-400 group-hover:text-primary transition-colors" />
                +57 314 403 6151
              </a>
              <span className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                Colombia
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios#${service.slug}`}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Empresa
            </h3>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => goToSection(item.href)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & CTA */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Legal
            </h3>
            <ul className="space-y-2.5 mb-8">
              {legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-primary-400 transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="p-4 rounded-xl bg-primary/[0.08] border border-primary/[0.2]">
              <p className="text-xs font-semibold text-white mb-1">
                ¿Listo para evolucionar?
              </p>
              <p className="text-xs text-slate-400 mb-3">
                Agenda una consultoría gratuita de 60 minutos.
              </p>
              <button
                onClick={() => goToSection("#contacto")}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-primary/90 hover:bg-primary text-[#04160D] text-xs font-semibold rounded-lg transition-colors"
              >
                Agendar Ahora
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EVOLTICA SOLUTIONS SAS. Todos los
            derechos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Diseñado y desarrollado con{" "}
            <span className="text-primary-400">♦</span> en Colombia
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
