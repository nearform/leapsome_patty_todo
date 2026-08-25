import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  Camera,
  Droplets,
  IdCard,
  Key,
  List,
  Map,
  Pill,
  Plane,
  Plug,
  Shirt,
  Sun,
  Tag,
  Ticket,
  Umbrella,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import type { TodoIconKey } from "@/lib/types/trip-planner";

export const TODO_ICON_COMPONENTS: Record<TodoIconKey, LucideIcon> = {
  "id-card": IdCard,
  sun: Sun,
  plug: Plug,
  droplet: Droplets,
  shirt: Shirt,
  camera: Camera,
  plane: Plane,
  ticket: Ticket,
  book: BookOpen,
  pill: Pill,
  key: Key,
  umbrella: Umbrella,
  utensils: UtensilsCrossed,
  wallet: Wallet,
  calendar: Calendar,
  tag: Tag,
  map: Map,
  list: List,
};

const KEYWORD_TO_ICON: Array<{ keywords: string[]; icon: TodoIconKey }> = [
  { keywords: ["passport", "visa", "id"], icon: "id-card" },
  { keywords: ["sun", "sunscreen", "spf", "hat"], icon: "sun" },
  { keywords: ["charger", "phone", "adapter", "plug", "cable"], icon: "plug" },
  { keywords: ["swim", "towel", "water", "bottle", "beach"], icon: "droplet" },
  { keywords: ["shirt", "clothes", "socks", "jumper", "laundry"], icon: "shirt" },
  { keywords: ["camera", "photo", "lens"], icon: "camera" },
  { keywords: ["flight", "plane", "check in", "boarding", "airport"], icon: "plane" },
  { keywords: ["ticket", "booking", "reserve", "tour"], icon: "ticket" },
  { keywords: ["book", "read", "guide", "magazine"], icon: "book" },
  { keywords: ["meds", "medicine", "pill", "vitamin", "pharmacy"], icon: "pill" },
  { keywords: ["key", "keys", "lock"], icon: "key" },
  { keywords: ["umbrella", "rain", "coat"], icon: "umbrella" },
  { keywords: ["snack", "food", "dinner", "lunch", "restaurant", "groceries"], icon: "utensils" },
  { keywords: ["cash", "money", "card", "euro", "currency"], icon: "wallet" },
];

export function suggestTodoIcon(title: string): TodoIconKey {
  const normalized = title.toLowerCase();
  for (const entry of KEYWORD_TO_ICON) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.icon;
    }
  }
  return "tag";
}

export const TODO_ICON_OPTIONS: TodoIconKey[] = [
  "id-card",
  "sun",
  "plug",
  "droplet",
  "shirt",
  "camera",
  "plane",
  "ticket",
  "book",
  "pill",
  "key",
  "umbrella",
  "utensils",
  "wallet",
  "calendar",
  "tag",
  "map",
  "list",
];
