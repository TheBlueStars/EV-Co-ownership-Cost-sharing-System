import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#effdf5",
          100: "#d3fbe6",
          200: "#a8f5cf",
          300: "#6aebaf",
          400: "#36dd91",
          500: "#16c47f",  // primary (xanh EV)
          600: "#0fa36a",
          700: "#0a8257",
          800: "#0a6848",
          900: "#0a553c",
        },
        ink:   "#0f172a",   // text đậm
        mist:  "#f1f5f9",  // nền nhạt
        sky:   "#2563eb",  // nhấn
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp .6s ease-out both",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.08)",
      },
      backgroundSize: {
        "gradient-200": "200% 200%",
      },
    },
  },
  plugins: [],
};
export default config;
