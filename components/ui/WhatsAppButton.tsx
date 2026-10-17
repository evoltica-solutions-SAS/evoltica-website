"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

const BUBBLE_SEEN_KEY = "evoltica-wa-bubble-seen";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Botón flotante de WhatsApp: aparece con retraso y muestra el globo de
 * mensaje una sola vez por sesión (asistencia proactiva pero no invasiva).
 * Usa los colores oficiales de WhatsApp — excepción documentada en DESIGN_SYSTEM.md.
 */
export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setIsVisible(true), 1500));

    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(BUBBLE_SEEN_KEY) === "1";
    } catch {
      // sessionStorage puede no estar disponible (modo privado); se muestra igual.
    }

    if (!alreadySeen) {
      timers.push(
        setTimeout(() => {
          setShowBubble(true);
          try {
            window.sessionStorage.setItem(BUBBLE_SEEN_KEY, "1");
          } catch {
            // Ignorado: solo afecta a que el globo pueda repetirse.
          }
        }, 4000)
      );
      timers.push(setTimeout(() => setShowBubble(false), 9000));
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: "spring", damping: 22, stiffness: 300 }}
                className="absolute bottom-full right-0 mb-3 w-[250px] rounded-md border border-white/10 bg-surface-raised p-4 shadow-nav"
                role="status"
              >
                <button
                  type="button"
                  onClick={() => setShowBubble(false)}
                  aria-label="Cerrar mensaje"
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white transition-colors hover:bg-slate-600"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <p className="text-xs font-semibold text-white">{SITE.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  ¡Hola! 👋 ¿Quieres saber cómo podemos ordenar y automatizar la operación de tu empresa?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp (abre en una pestaña nueva)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/25"
          >
            <WhatsAppIcon className="relative h-7 w-7 fill-white" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
