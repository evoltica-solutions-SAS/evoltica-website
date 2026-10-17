import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Tokens semánticos con tema (valores en app/globals.css, :root y html.light) ──
        // `white` es el color de primer plano: blanco en oscuro, tinta en claro. Así todo
        // `text-white`, `border-white/[0.1]`, `bg-white/[0.04]` se invierte solo con el tema.
        white: "rgb(var(--c-fg) / <alpha-value>)",
        background: "rgb(var(--c-bg) / <alpha-value>)",
        surface: {
          deep: "rgb(var(--c-surface-deep) / <alpha-value>)",
          alt: "rgb(var(--c-surface-alt) / <alpha-value>)",
          raised: "rgb(var(--c-surface-raised) / <alpha-value>)",
        },
        // Blanco fijo: texto sobre superficies que son oscuras en ambos temas (cortinas, botones de tinta).
        snow: "#FFFFFF",
        // Neutros de tinta FIJOS (no cambian con el tema): cortinas, texto sobre verde de marca.
        ink: {
          DEFAULT: "#0B0F19",
          950: "#070A11",
          900: "#080B12",
          800: "#0D1220",
          700: "#121829",
          600: "#1A2133",
        },
        // Verde principal — color dominante de marca, extraído del logo oficial
        primary: {
          DEFAULT: "#12D56F",
          50: "#F1FCF6",
          100: "#E3FAEE",
          200: "#BDF3D7",
          300: "#92ECBD",
          400: "#54E197",
          500: "#12D56F",
          600: "#0FB55E",
          700: "#0C914B",
          800: "#096F3A",
          900: "#064D28",
          950: "#042F18",
        },
        // Verde turquesa — color secundario de marca
        secondary: {
          DEFAULT: "#14A4BC",
          50: "#F1FAFB",
          100: "#E3F4F7",
          200: "#BDE6EC",
          300: "#93D5E0",
          400: "#56BDCF",
          500: "#14A4BC",
          600: "#118BA0",
          700: "#0E7080",
          800: "#0A5562",
          900: "#073B44",
          950: "#042429",
        },
        // Azul — tercer color de marca (reemplaza el antiguo acento morado)
        accent: {
          DEFAULT: "#0997D5",
          50: "#F0F9FC",
          100: "#E1F3FA",
          200: "#BAE2F3",
          300: "#8ECFEC",
          400: "#4EB4E1",
          500: "#0997D5",
          600: "#0880B5",
          700: "#066791",
          800: "#054F6F",
          900: "#03364D",
          950: "#02212F",
        },
        // Azul oscuro — color de marca para profundidad, gradientes y fondos
        navy: {
          DEFAULT: "#001E3D",
          50: "#F0F2F3",
          100: "#E0E4E8",
          200: "#B8C0C9",
          300: "#8A98A6",
          400: "#475D73",
          500: "#001E3D",
          600: "#001A34",
          700: "#001429",
          800: "#001020",
          900: "#000B16",
          950: "#00070D",
        },
        // 200–500 se invierten con el tema (texto secundario); 600+ son fijos.
        slate: {
          200: "rgb(var(--c-slate-200) / <alpha-value>)",
          300: "rgb(var(--c-slate-300) / <alpha-value>)",
          400: "rgb(var(--c-slate-400) / <alpha-value>)",
          500: "rgb(var(--c-slate-500) / <alpha-value>)",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        // Condensada para titulares (ADR-010).
        display: ["var(--font-display)", "Barlow Condensed", "Arial Narrow", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        // Escala display fluida (clamp) — encabezados de hero y secciones.
        "display-hero": ["clamp(3.1rem, 0.6rem + 9.2vw, 10.5rem)", { lineHeight: "0.88", letterSpacing: "-0.055em" }],
        "display-xl": ["clamp(2.6rem, 1.2rem + 5.2vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2.2rem, 1.2rem + 3.6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(1.85rem, 1.2rem + 2.2vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.035em" }],
        "display-sm": ["clamp(1.5rem, 1.15rem + 1.2vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.03em" }],
        lead: ["clamp(1.05rem, 0.98rem + 0.35vw, 1.3rem)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        site: "1360px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brand-line": "linear-gradient(90deg, #12D56F 0%, #14A4BC 50%, #0997D5 100%)",
      },
      animation: {
        // Entradas above-the-fold en CSS: corren desde el primer pintado, sin esperar a React.
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        lift: "lift 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        enter: "enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        // Trazado de las cintas de la trama (una sola vez).
        draw: "draw 1.8s cubic-bezier(0.65, 0, 0.35, 1) both",
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(105%)" },
          "100%": { transform: "translateY(0)" },
        },
        lift: {
          "0%": { transform: "translateY(28px)" },
          "100%": { transform: "translateY(0)" },
        },
        enter: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
        nav: "0 8px 32px -8px rgba(0,0,0,0.55)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
