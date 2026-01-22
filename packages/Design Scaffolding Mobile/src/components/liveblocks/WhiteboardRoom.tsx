"use client";

import { ReactNode, useMemo } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveblocksProvider } from "./LiveblocksProvider";

// Generate random user data for anonymous users
const COLORS = [
  "#E57373", "#F06292", "#BA68C8", "#9575CD", "#7986CB",
  "#64B5F6", "#4FC3F7", "#4DD0E1", "#4DB6AC", "#81C784",
];

const NAMES = [
  "Anonymous Ace", "Tennis Tiger", "Rally Runner", "Net Ninja", 
  "Court Champion", "Serve Star", "Volley Victor", "Baseline Boss",
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getRandomName() {
  return NAMES[Math.floor(Math.random() * NAMES.length)];
}

interface WhiteboardRoomProps {
  children: ReactNode;
  roomId?: string;
  fallback?: ReactNode;
}

export function WhiteboardRoom({ 
  children, 
  roomId = "whiteboard-prototype",
  fallback = <LoadingSpinner />
}: WhiteboardRoomProps) {
  // Memoize initial presence so it doesn't change on re-renders
  const initialPresence = useMemo(() => ({
    cursor: null,
    name: getRandomName(),
    color: getRandomColor(),
  }), []);

  return (
    <LiveblocksProvider>
      <RoomProvider 
        id={roomId}
        initialPresence={initialPresence}
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

function LoadingSpinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-bg-base">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Connecting to room...</p>
      </div>
    </div>
  );
}
