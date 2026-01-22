declare global {
  interface Liveblocks {
    // Each user's Presence - for live cursors
    Presence: {
      cursor: { x: number; y: number } | null;
      name: string;
      color: string;
    };

    // Storage - not used for comments feature
    Storage: Record<string, never>;

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar?: string;
        color: string;
      };
    };

    // Custom events for real-time communication
    RoomEvent: Record<string, never>;

    // Custom metadata set on threads for pinned comment positions
    ThreadMetadata: {
      x: number;
      y: number;
      resolved: boolean;
    };

    // Custom room info
    RoomInfo: Record<string, never>;
  }
}

export {};
