import Image from "next/image";

/**
 * Intro de marca (~1,6 s): el isotipo REAL se construye a partir de sus piezas y
 * luego abre la página a través de su hexágono central (el que contiene la "E").
 *
 * - Renderizada en el servidor y animada solo con CSS (`.brand-intro*` en
 *   globals.css); JavaScript solo decide si corre (lib/intro.ts, script en <head>).
 * - Solo visible con `html[data-intro="play"]`: primera visita o pasado el
 *   cooldown; nunca con prefers-reduced-motion ni sin JavaScript.
 * - La página ya está pintada debajo: no bloquea la carga ni retrasa el LCP.
 *
 * Geometría: el centro del isotipo está en (50 %, 62,55 %) de public/brand/logo.png
 * (550×530, margen transparente arriba). Las piezas son sectores anulares de la
 * imagen real recortados con clip-path; ensambladas, coinciden píxel a píxel.
 */

const CX = 50; // % del ancho del PNG
const CY = 62.55; // % del alto del PNG
const ASPECT = 530 / 550;
const INNER = 9.5; // radio del hexágono central, % del ancho
const OUTER = 120; // radio exterior de los sectores, % del ancho

const toPoint = (angleDeg: number, radiusPctOfWidth: number) => {
  const a = (angleDeg * Math.PI) / 180;
  const x = CX + Math.cos(a) * radiusPctOfWidth;
  const y = CY + (Math.sin(a) * radiusPctOfWidth) / ASPECT;
  return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
};

// Seis sectores anulares alrededor del centro, cada uno entra desde su dirección.
// Se solapan 1,5° y se meten bajo la pieza central para no dejar costuras.
const OVERLAP = 1.5;
const PIECES = Array.from({ length: 6 }, (_, k) => {
  const a0 = -90 + k * 60 - OVERLAP;
  const a1 = -90 + (k + 1) * 60 + OVERLAP;
  const mid = ((a0 + a1) / 2) * (Math.PI / 180);
  return {
    clip: `polygon(${[toPoint(a0, INNER - 1), toPoint(a0, OUTER), toPoint((a0 + a1) / 2, OUTER), toPoint(a1, OUTER), toPoint(a1, INNER - 1)].join(", ")})`,
    dx: `${(Math.cos(mid) * 26).toFixed(1)}px`,
    dy: `${(Math.sin(mid) * 26).toFixed(1)}px`,
    rot: `${k % 2 === 0 ? -9 : 9}deg`,
    delay: `${(0.1 + k * 0.05).toFixed(2)}s`,
  };
});

const CENTER_CLIP = `polygon(${[-90, -30, 30, 90, 150, 210].map((a) => toPoint(a, INNER + 0.4)).join(", ")})`;

function LogoPiece({ clip, style, className }: { clip: string; style?: React.CSSProperties; className: string }) {
  return (
    <span className={`absolute inset-0 ${className}`} style={{ clipPath: clip, ...style }}>
      <Image src="/brand/logo.png" alt="" fill priority sizes="220px" className="object-fill" />
    </span>
  );
}

export function BrandIntro() {
  return (
    <div className="brand-intro fixed inset-0 z-[70]" aria-hidden="true">
      {/* Velo oscuro: el hexágono central se abre y revela la página */}
      <div className="brand-intro-veil absolute inset-0 bg-ink-950" />

      {/* Contorno del hexágono que acompaña la apertura (la "sorpresa") */}
      {/* 100 unidades = vmax (slice), centrado: el radio inicial coincide con el hexágono de la "E" */}
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="-50 -50 100 100" preserveAspectRatio="xMidYMid slice">
        <g className="brand-intro-ring" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <polygon
            points="0,-1.235 1.0695,-0.6175 1.0695,0.6175 0,1.235 -1.0695,0.6175 -1.0695,-0.6175"
            fill="none"
            stroke="#12D56F"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      {/* Isotipo: su centro (la "E") queda exactamente en el centro de la pantalla */}
      <div
        className="absolute left-1/2 top-1/2 w-[13vmax]"
        style={{ aspectRatio: "550 / 530", transform: `translate(-${CX}%, -${CY}%)` }}
      >
        <div className="brand-intro-logo relative h-full w-full">
          {/* Primer fragmento: una línea a 60°, el ángulo del isotipo */}
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 550 530">
            <line
              x1={275 - 150}
              y1={331.5 + 260}
              x2={275 + 150}
              y2={331.5 - 260}
              stroke="#12D56F"
              strokeWidth={4}
              strokeLinecap="round"
              pathLength={1}
              className="brand-intro-line"
            />
          </svg>
          {PIECES.map((piece, index) => (
            <LogoPiece
              key={index}
              clip={piece.clip}
              className="brand-intro-piece"
              style={
                {
                  "--dx": piece.dx,
                  "--dy": piece.dy,
                  "--rot": piece.rot,
                  animationDelay: piece.delay,
                } as React.CSSProperties
              }
            />
          ))}
          <LogoPiece clip={CENTER_CLIP} className="brand-intro-center" />
        </div>
      </div>
    </div>
  );
}
