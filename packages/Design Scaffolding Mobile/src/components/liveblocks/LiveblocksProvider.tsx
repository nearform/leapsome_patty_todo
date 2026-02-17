"use client";

import { ReactNode } from "react";
import { LiveblocksProvider as Provider } from "@liveblocks/react/suspense";

// Generate random user data for anonymous users
const COLORS = [
  "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
  "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
  "#AED581", "#DCE775", "#FFF176", "#FFD54F", "#FFB74D",
];

const NAMES = [
  "Creative Cat", "Design Dragon", "Pixel Pioneer", "Layout Legend", 
  "Style Sage", "Component Crafter", "UI Unicorn", "Proto Panda",
  "Wireframe Wizard", "Mockup Maven", "Sketch Star", "Flow Fox",
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getRandomName() {
  return NAMES[Math.floor(Math.random() * NAMES.length)];
}

// Store user info in session storage so it persists across page refreshes
function getUserInfo() {
  if (typeof window === "undefined") {
    return { name: getRandomName(), color: getRandomColor() };
  }
  
  const stored = sessionStorage.getItem("liveblocks-user");
  if (stored) {
    return JSON.parse(stored);
  }
  
  const info = { name: getRandomName(), color: getRandomColor() };
  sessionStorage.setItem("liveblocks-user", JSON.stringify(info));
  return info;
}

interface LiveblocksProviderProps {
  children: ReactNode;
}

export function LiveblocksProvider({ children }: LiveblocksProviderProps) {
  return (
    <Provider 
      publicApiKey="pk_dev_kTCEo35UtTQoP_YtkJ-UUVjUp4YgbULzfYNFFcioQ8_yFUmyKbbB542bOxh4hXwp"
      resolveUsers={async ({ userIds }) => {
        // For anonymous users, return placeholder info
        // In production, you'd fetch real user data from your backend
        return userIds.map(() => {
          const userInfo = getUserInfo();
          return {
            name: userInfo.name,
            avatar: undefined,
            color: userInfo.color,
          };
        });
      }}
      resolveMentionSuggestions={async () => {
        // For now, return empty - would integrate with user system in production
        return [];
      }}
    >
      {children}
    </Provider>
  );
}
