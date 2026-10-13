import { PlugZap } from "lucide-react";
import { RealChannels } from "./RealChannels";

interface RequestUnavailableProps {
  /** Mensaje inicial sugerido para WhatsApp y correo. */
  message: string;
  subject: string;
}

/**
 * Lo que se muestra en producción en lugar del formulario: no hay persistencia
 * segura ni canal de recepción, así que no se aceptan solicitudes por aquí.
 */
export function RequestUnavailable({ message, subject }: RequestUnavailableProps) {
  return (
    <div className="card space-y-6 p-6 sm:p-8 lg:p-10">
      <div className="flex h-14 w-14 items-center justify-center border border-secondary/40">
        <PlugZap className="h-6 w-6 text-secondary-400" aria-hidden="true" />
      </div>
      <h2 className="text-display-sm font-semibold text-white">Este formulario todavía no está habilitado</h2>
      <p className="max-w-2xl leading-relaxed text-slate-300">
        Aún no podemos recibir ni guardar solicitudes por aquí de forma segura, así que este formulario no acepta envíos.
        Mientras tanto, escríbenos directamente:
      </p>
      <RealChannels message={message} subject={subject} />
    </div>
  );
}
