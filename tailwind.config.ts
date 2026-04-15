import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        headline: ["var(--font-space-grotesk)", "var(--font-manrope)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
        label: ["var(--font-space-grotesk)", "var(--font-manrope)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#FF3333",
        background: "#0A0A0A",
        "surface-container": "#1A1A1A",
        "surface-container-low": "#111111",
        "surface-container-highest": "#2A2A2A",
        "outline-variant": "#442222",
        "on-surface": "#FFFFFF",
        "on-surface-variant": "#CCCCCC",
      },
    },
  },
  plugins: [],
};

export default config;
