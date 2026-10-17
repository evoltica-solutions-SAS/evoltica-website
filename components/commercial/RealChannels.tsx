import { Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

interface RealChannelsProps {
  /** Texto precargado en WhatsApp y en el cuerpo del correo. */
  message: string;
  subject: string;
}

/**
 * Canales reales disponibles hoy (WhatsApp y correo publicados en SITE). La
 * persona envía el mensaje desde su propia aplicación: el sitio no envía nada.
 */
export function RealChannels({ message, subject }: RealChannelsProps) {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a href={getWhatsAppUrl(message || undefined)} target="_blank" rel="noopener noreferrer" className="btn-primary">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Escribir por WhatsApp
      </a>
      <a href={mailto} className="btn-secondary">
        <Mail className="h-4 w-4" aria-hidden="true" />
        Escribir a {SITE.email}
      </a>
    </div>
  );
}
