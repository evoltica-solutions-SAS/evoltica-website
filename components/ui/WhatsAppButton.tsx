"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    const tooltipTimer = setTimeout(() => {
      setShowBubble(true);
      const hideTimer = setTimeout(() => setShowBubble(false), 5000);
      return () => clearTimeout(hideTimer);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleClick = () => {
    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Chat bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative bg-[#1E293B] border border-white/[0.1] rounded-2xl rounded-br-md p-4 max-w-[240px] shadow-xl"
              >
                {/* Close bubble */}
                <button
                  onClick={() => setShowBubble(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-500 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-none">
                      EVOLTICA SOLUTIONS
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <p className="text-[10px] text-slate-400">En línea</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ¡Hola! 👋 ¿Quieres saber cómo podemos transformar digitalmente
                  tu empresa?
                </p>

                {/* Tail */}
                <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-0 w-3 h-3 bg-[#1E293B] border-r border-b border-white/[0.1]" style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Pulse rings */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full bg-[#25D366]"
            />
            <motion.div
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3,
              }}
              className="absolute inset-0 rounded-full bg-[#25D366]"
            />

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && !showBubble && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1E293B] border border-white/[0.1] text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
                >
                  Chatea con nosotros
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#1E293B]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-colors"
              aria-label="Contactar por WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 fill-white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
