"use client";

import { useState } from "react";
import { Composer } from "@liveblocks/react-ui";
import { useCreateThread } from "@liveblocks/react/suspense";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentComposerProps {
  x: number;
  y: number;
  onClose: () => void;
  onSubmit?: () => void;
}

export function CommentComposer({ x, y, onClose, onSubmit }: CommentComposerProps) {
  const createThread = useCreateThread();

  return (
    <div
      className="absolute z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, 0)",
      }}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
    >
      <div 
        className={cn(
          "w-80 bg-bg-elevated rounded-lg shadow-xl border border-border-standard",
          "overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle bg-bg-secondary">
          <span className="text-xs font-medium text-text-secondary">
            New Comment
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Composer */}
        <div className="p-2">
          <Composer
            onComposerSubmit={({ body }, event) => {
              event.preventDefault();
              createThread({
                body,
                metadata: {
                  x,
                  y,
                  resolved: false,
                },
              });
              onSubmit?.();
              onClose();
            }}
            autoFocus
          />
        </div>
      </div>
      
      {/* Pin indicator pointing to the exact spot */}
      <div 
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-2 border-white shadow-md"
      />
    </div>
  );
}

// Hook to manage comment creation mode
export function useCommentMode() {
  const [isCommentMode, setIsCommentMode] = useState(false);
  const [pendingComment, setPendingComment] = useState<{ x: number; y: number } | null>(null);

  const startCommentMode = () => setIsCommentMode(true);
  const cancelCommentMode = () => {
    setIsCommentMode(false);
    setPendingComment(null);
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (isCommentMode) {
      setPendingComment({ x, y });
      setIsCommentMode(false);
    }
  };

  const clearPendingComment = () => setPendingComment(null);

  return {
    isCommentMode,
    pendingComment,
    startCommentMode,
    cancelCommentMode,
    handleCanvasClick,
    clearPendingComment,
  };
}
