"use client";

import { useState } from "react";
import { ThreadData } from "@liveblocks/client";
import { Thread } from "@liveblocks/react-ui";
import { MessageCircle, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentPinProps {
  thread: ThreadData;
  onResolve?: (threadId: string) => void;
}

export function CommentPin({ thread, onResolve }: CommentPinProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const metadata = thread.metadata as { x: number; y: number; resolved: boolean };
  const isResolved = metadata.resolved;

  if (!metadata.x || !metadata.y) return null;

  return (
    <div
      className="absolute z-40"
      style={{
        left: metadata.x,
        top: metadata.y,
        transform: "translate(-50%, -100%)",
      }}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
    >
      {/* Pin Icon */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          "shadow-lg border-2 border-white",
          "transition-all duration-200 hover:scale-110",
          isResolved 
            ? "bg-success/80 text-white" 
            : "bg-accent text-white",
          isExpanded && "ring-2 ring-accent ring-offset-2"
        )}
      >
        {isResolved ? (
          <Check className="w-4 h-4" />
        ) : (
          <MessageCircle className="w-4 h-4" />
        )}
      </button>

      {/* Thread Popup */}
      {isExpanded && (
        <div 
          className={cn(
            "absolute top-10 left-1/2 -translate-x-1/2",
            "w-80 bg-bg-elevated rounded-lg shadow-xl border border-border-standard",
            "overflow-hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle bg-bg-secondary">
            <span className="text-xs font-medium text-text-secondary">
              {isResolved ? "Resolved" : "Comment Thread"}
            </span>
            <div className="flex items-center gap-1">
              {!isResolved && onResolve && (
                <button
                  onClick={() => onResolve(thread.id)}
                  className="p-1 rounded hover:bg-bg-tertiary text-text-secondary hover:text-success transition-colors"
                  title="Mark as resolved"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Thread Content */}
          <div className="max-h-96 overflow-y-auto">
            <Thread thread={thread} />
          </div>
        </div>
      )}
    </div>
  );
}
