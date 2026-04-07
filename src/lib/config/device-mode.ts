import { Smartphone, Tablet, Monitor } from "lucide-react";

export const DEVICE_PRESETS = {
  mobile:  { width: 375,  height: 812,  label: "Mobile",  icon: Smartphone },
  tablet:  { width: 768,  height: 1024, label: "Tablet",  icon: Tablet },
  desktop: { width: 1440, height: 900,  label: "Desktop", icon: Monitor },
} as const;

export type DeviceMode = keyof typeof DEVICE_PRESETS;

/**
 * Change this value to switch the global device mode.
 * Affects: screenshot viewport, prototype card aspect ratio, home page indicator.
 */
export const DEFAULT_DEVICE_MODE: DeviceMode = "mobile";
