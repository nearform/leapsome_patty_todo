import type { ColorToken } from "@/lib/types/trip-planner";

export interface ColorPreset {
  token: ColorToken;
  label: string;
  bgClass: string;
  textClass: string;
  dotClass: string;
}

/**
 * Full class strings so Tailwind's scanner can include them.
 * Person and cover colours follow the TripTogether palette.
 */
export const COLOR_PRESETS: ColorPreset[] = [
  { token: "info", label: "Dusty Blue", bgClass: "bg-tt-dusty-blue", textClass: "text-tt-ivory", dotClass: "bg-tt-dusty-blue" },
  { token: "success", label: "Sage", bgClass: "bg-tt-sage", textClass: "text-tt-charcoal", dotClass: "bg-tt-sage" },
  { token: "warning", label: "Sand", bgClass: "bg-tt-sand", textClass: "text-tt-charcoal", dotClass: "bg-tt-sand" },
  { token: "error", label: "Terracotta", bgClass: "bg-tt-terracotta", textClass: "text-tt-ivory", dotClass: "bg-tt-terracotta" },
  { token: "accent", label: "Moss", bgClass: "bg-tt-moss", textClass: "text-tt-charcoal", dotClass: "bg-tt-moss" },
  { token: "decorative", label: "Charcoal", bgClass: "bg-tt-charcoal", textClass: "text-tt-ivory", dotClass: "bg-tt-charcoal" },
];

export function getColorPreset(token: ColorToken): ColorPreset {
  return COLOR_PRESETS.find((preset) => preset.token === token) ?? COLOR_PRESETS[0];
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
