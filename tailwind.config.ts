import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
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
        slate: {
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(18,213,111,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(9,151,213,0.15), transparent), radial-gradient(ellipse 60% 40% at 20% 60%, rgba(20,164,188,0.12), transparent)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "border-flow": "borderFlow 3s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(18, 213, 111, 0.3)",
        "glow-teal": "0 0 20px rgba(20, 164, 188, 0.3)",
        "glow-blue": "0 0 20px rgba(9, 151, 213, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "card-hover": "0 20px 60px rgba(18, 213, 111, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
