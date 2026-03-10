import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include gluestack-ui components for Tailwind scanning
    "./node_modules/@gluestack-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ========================================
        // Primitive Neutral Scale (Raw Grey Tones)
        // ========================================
        neutral: {
          0: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#0B0F19",
        },

        // ========================================
        // Semantic Colors (Theme-Aware via CSS Variables)
        // ========================================

        // Background colors
        "bg-base": "var(--background-base)",
        "bg-elevated": "var(--background-elevated)",
        "bg-secondary": "var(--background-secondary)",
        "bg-tertiary": "var(--background-tertiary)",

        // Border colors
        "border-standard": "var(--border-standard)",
        "border-subtle": "var(--border-subtle)",
        "border-decorative": "var(--border-decorative)",

        // Text colors
        "text-primary": "var(--text-primary)",
        "text-body": "var(--text-body)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-disabled": "var(--text-disabled)",

        // Accent colors (Dusk)
        accent: {
          DEFAULT: "var(--accent-primary)",
          primary: "var(--accent-primary)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
          hover: "var(--accent-hover)",
        },

        // Success colors
        success: {
          DEFAULT: "var(--success-primary)",
          primary: "var(--success-primary)",
          light: "var(--success-light)",
          dark: "var(--success-dark)",
          bg: "var(--success-background)",
        },

        // Info colors
        info: {
          DEFAULT: "var(--info-primary)",
          primary: "var(--info-primary)",
          light: "var(--info-light)",
          dark: "var(--info-dark)",
          bg: "var(--info-background)",
          "bg-40": "var(--info-background-40)",
        },

        // Warning colors
        warning: {
          DEFAULT: "var(--warning-primary)",
          primary: "var(--warning-primary)",
          light: "var(--warning-light)",
          dark: "var(--warning-dark)",
          bg: "var(--warning-background)",
        },

        // Error colors
        error: {
          DEFAULT: "var(--error-primary)",
          primary: "var(--error-primary)",
          light: "var(--error-light)",
          dark: "var(--error-dark)",
          bg: "var(--error-background)",
        },

        // Ring color
        ring: "var(--ring-color)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Font Sizes from Figma Typography Tokens
      // Format: [fontSize, { lineHeight, letterSpacing? }]
      fontSize: {
        // Size 0 (6px)
        "3xs": ["6px", { lineHeight: "8px" }],
        // Size 1 (8px)
        "2xs": ["8px", { lineHeight: "10px" }],
        // Size 2 (10px)
        xs: ["10px", { lineHeight: "12px" }],
        // Size 3 (11px)
        "xs-plus": ["11px", { lineHeight: "16px" }],
        // Size 4 (12px)
        sm: ["12px", { lineHeight: "16px" }],
        // Size 5 (14px)
        md: ["14px", { lineHeight: "20px" }],
        // Size 6 (16px) - Base
        base: ["16px", { lineHeight: "24px" }],
        lg: ["16px", { lineHeight: "24px" }],
        // Size 7 (18px)
        xl: ["18px", { lineHeight: "28px" }],
        // Size 8 (20px)
        "2xl": ["20px", { lineHeight: "28px" }],
        // Size 9 (24px)
        "3xl": ["24px", { lineHeight: "32px" }],
        // Size 10 (28px)
        "4xl": ["28px", { lineHeight: "36px" }],
        // Size 11 (32px)
        "5xl": ["32px", { lineHeight: "40px" }],
        // Size 12 (36px)
        "6xl": ["36px", { lineHeight: "40px" }],
        // Extended sizes for hero text
        "7xl": ["48px", { lineHeight: "1" }],
        "8xl": ["60px", { lineHeight: "1" }],
        "9xl": ["72px", { lineHeight: "1" }],
      },
      // Font Weights from Figma Typography Tokens
      fontWeight: {
        light: "300",
        regular: "400",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      // Line Heights from Figma Typography Tokens
      lineHeight: {
        none: "1",
        tight: "1.1",
        snug: "1.25",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        // Pixel-based line heights from Figma
        "lh-0": "8px",
        "lh-1": "10px",
        "lh-2": "12px",
        "lh-3": "16px",
        "lh-4": "20px",
        "lh-5": "24px",
        "lh-6": "28px",
        "lh-7": "32px",
        "lh-8": "36px",
        "lh-9": "40px",
      },
      // Letter Spacing from Figma Typography Tokens
      letterSpacing: {
        "tight-xl": "-0.5px",
        "tight-lg": "-0.4px",
        "tight-md": "-0.3px",
        "tight-sm": "-0.2px",
        "tight-xs": "-0.1px",
        normal: "0px",
        "loose-xs": "0.2px",
        "loose-sm": "0.3px",
        "loose-md": "0.4px",
        "loose-lg": "0.5px",
        "loose-xl": "1px",
      },
      // Border Radius from Figma Tokens
      borderRadius: {
        none: "0px",
        "2xs": "2px",
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        "hard-1": "-2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-2": "0px 3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-3": "2px 2px 8px 0px rgba(38, 38, 38, 0.20)",
        "hard-4": "0px -3px 10px 0px rgba(38, 38, 38, 0.20)",
        "hard-5": "0px 2px 10px 0px rgba(38, 38, 38, 0.10)",
        "soft-1": "0px 0px 10px rgba(38, 38, 38, 0.06), 0px 0px 30px rgba(38, 38, 38, 0.04)",
        "soft-2": "0px 0px 60px rgba(38, 38, 38, 0.04), 0px 0px 20px rgba(38, 38, 38, 0.06)",
        "soft-3": "0px 0px 30px rgba(38, 38, 38, 0.10)",
        "soft-4": "0px 0px 30px rgba(38, 38, 38, 0.10)",
        // Dark mode optimized shadows
        "elevated-light": "0px 4px 16px rgba(0, 0, 0, 0.08)",
        "elevated-dark": "0px 4px 16px rgba(0, 0, 0, 0.4)",
      },
      // Spacing from Figma Tokens
      // Uses 4px base unit system
      spacing: {
        "0": "0px",      // space-0
        "1": "4px",      // space-1
        "2": "8px",      // space-2
        "3": "12px",     // space-3
        "4": "16px",     // space-4
        "5": "20px",     // space-5
        "6": "24px",     // space-6
        "7": "28px",     // space-7
        "8": "32px",     // space-8
        "10": "40px",    // space-10
        "12": "48px",    // space-12
        "16": "64px",    // space-16
        "20": "80px",    // space-20
        "24": "96px",    // space-24
        // Extended spacing for larger layouts
        "28": "112px",
        "32": "128px",
        "36": "144px",
        "40": "160px",
        "48": "192px",
        "56": "224px",
        "64": "256px",
        "72": "288px",
        "80": "320px",
        "96": "384px",
        // Half-step spacing for fine-tuning
        "0.5": "2px",
        "1.5": "6px",
        "2.5": "10px",
        "3.5": "14px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
