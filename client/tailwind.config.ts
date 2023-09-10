import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        success: {
          DEFAULT: "rgb(var(--success))",
          alternative: "rgb(var(--success) / 0.15)",
        },
        offline: "var(--offline)",
        danger: {
          DEFAULT: "var(--danger)",
          secondary: "var(--danger-seondary)",
        },
        background: "var(--background)",
        foreground: {
          DEFAULT: "var(--foreground)",
          secondary: "var(--foreground-secondary)",
        },
        "strong-foreground": "var(--strong-foreground)",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "var(--primary-foreground)",
          alternative: "rgb(var(--primary) / 0.15)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      height: {
        header: "var(--header-height)",
        input: "var(--input-height)",
        screen: "100dvh",
      },
      maxHeight: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
      padding: {
        chat: "var(--chat-padding)",
      },
      borderRadius: {
        xsm: "0.125rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
