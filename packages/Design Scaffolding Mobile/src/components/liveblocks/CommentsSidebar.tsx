"use client";

import { useThreads, useEditThreadMetadata } from "@liveblocks/react/suspense";
import { Thread } from "@liveblocks/react-ui";
import { X, MessageCircle, Check, CheckCheck, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to extract text from structured comment body
function extractTextFromBody(body: any): string {
  if (!body || !body.content) return "";
  
  const extractText = (node: any): string => {
    if (typeof node === "string") return node;
    if (node.text) return node.text;
    if (node.children) {
      return node.children.map(extractText).join("");
    }
    return "";
  };
  
  return body.content.map(extractText).join(" ").trim();
}

// Helper function to escape CSV values
function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Helper function to format timestamp
function formatTimestamp(timestamp: string | Date): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return date.toISOString();
}

export function CommentsSidebar({ isOpen, onClose }: CommentsSidebarProps) {
  const { threads } = useThreads();
  const editThreadMetadata = useEditThreadMetadata();

  const unresolvedThreads = threads.filter(
    (thread) => !(thread.metadata as { resolved?: boolean }).resolved
  );
  const resolvedThreads = threads.filter(
    (thread) => (thread.metadata as { resolved?: boolean }).resolved
  );

  const handleResolve = (threadId: string) => {
    editThreadMetadata({
      threadId,
      metadata: { resolved: true },
    });
  };

  const handleUnresolve = (threadId: string) => {
    editThreadMetadata({
      threadId,
      metadata: { resolved: false },
    });
  };

  // CSV export function
  const handleDownloadCSV = () => {
    if (unresolvedThreads.length === 0) return;

    // CSV headers
    const headers = ["Thread ID", "Comment", "Author", "Timestamp"];
    const rows: string[][] = [headers];

    // Extract all comments from unresolved threads
    unresolvedThreads.forEach((thread) => {
      thread.comments.forEach((comment) => {
        const commentText = extractTextFromBody(comment.body);
        const author = comment.userId || "Unknown";
        const timestamp = comment.createdAt 
          ? formatTimestamp(comment.createdAt)
          : "";

        rows.push([
          thread.id,
          commentText,
          author,
          timestamp,
        ]);
      });
    });

    // Convert to CSV string
    const csvContent = rows
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `comments-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-full w-96 bg-bg-elevated border-l border-border-standard",
        "shadow-xl z-50 flex flex-col",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-standard">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-text-primary">Comments</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent font-medium">
            {threads.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {unresolvedThreads.length > 0 && (
            <button
              onClick={handleDownloadCSV}
              className="p-2 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
              title="Download Comments (CSV)"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <MessageCircle className="w-12 h-12 text-text-tertiary mb-4" />
            <p className="text-text-secondary font-medium mb-2">No comments yet</p>
            <p className="text-text-tertiary text-sm">
              Click the comment button in the toolbar, then click anywhere on the canvas to leave a comment.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {/* Unresolved Threads */}
            {unresolvedThreads.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-bg-secondary">
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Open ({unresolvedThreads.length})
                  </h3>
                </div>
                {unresolvedThreads.map((thread) => (
                  <div key={thread.id} className="border-b border-border-subtle">
                    <div className="flex items-center justify-end px-3 py-1 bg-bg-secondary/50">
                      <button
                        onClick={() => handleResolve(thread.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-success/10 text-text-secondary hover:text-success transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Resolve
                      </button>
                    </div>
                    <Thread thread={thread} />
                  </div>
                ))}
              </div>
            )}

            {/* Resolved Threads */}
            {resolvedThreads.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-bg-secondary">
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                    <CheckCheck className="w-3.5 h-3.5" />
                    Resolved ({resolvedThreads.length})
                  </h3>
                </div>
                {resolvedThreads.map((thread) => (
                  <div key={thread.id} className="border-b border-border-subtle opacity-60">
                    <div className="flex items-center justify-end px-3 py-1 bg-bg-secondary/50">
                      <button
                        onClick={() => handleUnresolve(thread.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-bg-tertiary text-text-tertiary hover:text-text-secondary transition-colors"
                      >
                        Reopen
                      </button>
                    </div>
                    <Thread thread={thread} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
