import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/lib/media";

/**
 * "La trama": gráfico de marca derivado del isotipo. Toma solo su ÁPICE
 * plegado (dos cintas a 60° que forman una "A", inicial de la marca) y una
 * cinta horizontal tejida por encima y por debajo — los procesos entrelazados.
 *
 * Regla: nunca dibujar los dos triángulos completos superpuestos. A gran
 * escala, el hexagrama completo se lee como un símbolo religioso y deja de
 * ser Evoltica. Tampoco es un sustituto del logo: es un recurso gráfico.
 *
 * Lienzo 1000×1000. Las cintas se trazan una vez con CSS (`animate-draw`);
 * con reduced-motion aparecen ya dibujadas.
 */

// Ápice: cinta que sube a 60° y se pliega hacia abajo.
export const TRAMA_APEX = "M81 1000 L520 240 L959 1000";
const APEX = TRAMA_APEX;
const APEX_RIGHT = "M520 240 L959 1000";
// Cinta horizontal.
export const TRAMA_CROSS = "M-60 640 L1060 640";
const CROSS = TRAMA_CROSS;
// Tramo de la cinta derecha que vuelve a pasar por encima de la horizontal (tejido).
const APEX_RIGHT_OVER = "M700 552 L800 725";
// Separación entre cintas: color del fondo del tema activo.
const GAP = "rgb(var(--c-bg))";
// Ventana triangular interior (en % para clip-path HTML).
const WINDOW = "polygon(52% 30.4%, 69.5% 60.8%, 34.5% 60.8%)";

interface TramaProps {
  id: string;
  className?: string;
  /** Ancho de la cinta en unidades del lienzo. */
  band?: number;
  /** Foto real opcional dentro de la ventana triangular (ver lib/media.ts). */
  photo?: MediaAsset | null;
  /** Rayado a 60° en la ventana cuando no hay foto. */
  hatch?: boolean;
  /** Anima el trazado de las cintas al cargar. */
  draw?: boolean;
}

export function Trama({ id, className, band = 64, photo, hatch = true, draw = true }: TramaProps) {
  const gradientId = `${id}-grad`;
  const outline = band + 16;
  const drawClass = draw ? "trama-band animate-draw" : undefined;
  // El trazado arranca tras --trama-delay (lo define el contenedor; p. ej. la intro del hero).
  const delay = (seconds: number) =>
    draw ? { animationDelay: `calc(var(--trama-delay, 0s) + ${seconds}s)` } : undefined;

  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      {(photo || hatch) && (
        <div className="absolute inset-0" style={{ clipPath: WINDOW }}>
          {photo ? (
            <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
          ) : (
            <div className="hatch-60 h-full w-full" />
          )}
        </div>
      )}

      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="240" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#12D56F" />
            <stop offset="55%" stopColor="#14A4BC" />
            <stop offset="100%" stopColor="#0997D5" />
          </linearGradient>
        </defs>

        {/* Ápice */}
        <path d={APEX} strokeWidth={outline} strokeLinejoin="miter" pathLength={1} className={drawClass} style={{ ...delay(0), stroke: GAP }} />
        <path d={APEX} stroke={`url(#${gradientId})`} strokeWidth={band} strokeLinejoin="miter" pathLength={1} className={drawClass} style={delay(0)} />
        {/* Pliegue: la cinta derecha queda en sombra */}
        <path d={APEX_RIGHT} stroke="#000B16" strokeOpacity={0.3} strokeWidth={band} pathLength={1} className={drawClass} style={delay(0.35)} />

        {/* Cinta horizontal: pasa por encima del lado izquierdo... */}
        <path d={CROSS} strokeWidth={outline} pathLength={1} className={drawClass} style={{ ...delay(0.5), stroke: GAP }} />
        <path d={CROSS} stroke={`url(#${gradientId})`} strokeWidth={band} pathLength={1} className={drawClass} style={delay(0.5)} />

        {/* ...y por debajo del derecho */}
        <path d={APEX_RIGHT_OVER} strokeWidth={outline} pathLength={1} className={drawClass} style={{ ...delay(0.9), stroke: GAP }} />
        <path d={APEX_RIGHT_OVER} stroke={`url(#${gradientId})`} strokeWidth={band} pathLength={1} className={drawClass} style={delay(0.9)} />
        <path d={APEX_RIGHT_OVER} stroke="#000B16" strokeOpacity={0.3} strokeWidth={band} pathLength={1} className={drawClass} style={delay(0.9)} />
      </svg>
    </div>
  );
}
