"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { 
  ZoomIn, ZoomOut, Maximize, Home, Sun, Moon, Monitor, 
  ArrowRight, ExternalLink, MessageCircle, X, SwatchBook 
} from "lucide-react";
import { getAllJourneys } from "@/lib/data/journeys-registry";
import { useTheme } from "@/components/ui/gluestack-ui-provider";
import { cn } from "@/lib/utils";
import { useThreads, useEditThreadMetadata } from "@liveblocks/react/suspense";

// Liveblocks components
import { 
  WhiteboardRoom, 
  Cursors, 
  useCursorTracking,
  CommentPin,
  CommentComposer,
  useCommentMode,
  CommentsSidebar,
  PresenceAvatars,
} from "@/components/liveblocks";

// Frame dimensions - can be adjusted for different prototype types
const FRAME_WIDTH = 375; // Mobile width (iPhone)
const FRAME_HEIGHT = 812; // Mobile height (iPhone X/11/12/13)

// Layout constants for navigation calculations
const JOURNEY_GAP = 128; // gap-32 in Tailwind
const SCREEN_GAP = 24; // gap-6 in Tailwind
const CONNECTOR_WIDTH = 88; // px-4 (16px * 2) + w-12 (48px) + arrow icon width (24px)
const CANVAS_PADDING = 32; // p-8 in Tailwind
const JOURNEY_LABEL_HEIGHT = 76; // Approximate height of journey label + mb-8
const SCREEN_LABEL_HEIGHT = 44; // Approximate height of screen label + mb-3

export default function WhiteboardPage() {
  return (
    <WhiteboardRoom roomId="whiteboard-prototype">
      <WhiteboardContent />
    </WhiteboardRoom>
  );
}

function WhiteboardContent() {
  const journeys = getAllJourneys();
  const { theme, themePreference, setTheme } = useTheme();
  
  // Canvas state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 180, y: 80 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesignSystemPanelOpen, setIsDesignSystemPanelOpen] = useState(false);
  
  // Keyboard navigation state
  const [focusedPosition, setFocusedPosition] = useState<{ journeyIndex: number; pageIndex: number } | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Liveblocks hooks
  const { threads } = useThreads();
  const editThreadMetadata = useEditThreadMetadata();
  const { handlePointerMove, handlePointerLeave } = useCursorTracking(canvasRef);
  const { 
    isCommentMode, 
    pendingComment, 
    startCommentMode, 
    cancelCommentMode, 
    handleCanvasClick: onCommentClick, 
    clearPendingComment 
  } = useCommentMode();

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(1.5, z + 0.2));
  const handleZoomOut = () => setZoom((z) => Math.max(0.2, z - 0.2));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 180, y: 80 });
  };

  // Calculate pan position to center a specific frame in the viewport
  const panToFrame = useCallback((journeyIndex: number, pageIndex: number) => {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate the frame's position on the canvas
    // Vertical position: padding + (journey heights + gaps for previous journeys) + label height
    let frameY = CANVAS_PADDING;
    for (let i = 0; i < journeyIndex; i++) {
      const journey = journeys[i];
      // Get max height of screens in this journey (or default)
      const maxHeight = journey.pages.length > 0 
        ? Math.max(...journey.pages.map(p => p.height ?? FRAME_HEIGHT))
        : FRAME_HEIGHT;
      frameY += JOURNEY_LABEL_HEIGHT + SCREEN_LABEL_HEIGHT + maxHeight + JOURNEY_GAP;
    }
    frameY += JOURNEY_LABEL_HEIGHT + SCREEN_LABEL_HEIGHT;

    // Horizontal position: padding + (frame widths + connectors for previous screens)
    const frameX = CANVAS_PADDING + pageIndex * (FRAME_WIDTH + CONNECTOR_WIDTH);

    // Get the height of the current frame
    const currentJourney = journeys[journeyIndex];
    const currentFrameHeight = currentJourney?.pages[pageIndex]?.height ?? FRAME_HEIGHT;

    // Calculate the center of the frame
    const frameCenterX = frameX + FRAME_WIDTH / 2;
    const frameCenterY = frameY + currentFrameHeight / 2;

    // Calculate pan to center the frame in viewport (accounting for zoom)
    const targetPanX = viewportWidth / 2 - frameCenterX * zoom;
    const targetPanY = viewportHeight / 2 - frameCenterY * zoom;

    setPan({ x: targetPanX, y: targetPanY });
  }, [journeys, zoom]);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      // Scrolling down (deltaY > 0) should zoom out (decrease zoom)
      // Scrolling up (deltaY < 0) should zoom in (increase zoom)
      const zoomSpeed = 0.1;
      const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
      setZoom((z) => {
        const newZoom = z + delta;
        return Math.min(1.5, Math.max(0.1, newZoom));
      });
    }
  }, []);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't pan if in comment mode
    if (isCommentMode) return;
    
    // Only pan if clicking on the canvas background, not on iframes
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('[data-canvas]')) {
      if (e.button === 0) {
        setIsPanning(true);
        setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  }, [isPanning, startPan]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Canvas click handler for comments
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isCommentMode && e.target === e.currentTarget || (e.target as HTMLElement).closest('[data-canvas]')) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        // Get click position relative to the transformed canvas
        const x = (e.clientX - rect.left - pan.x) / zoom;
        const y = (e.clientY - rect.top - pan.y) / zoom;
        onCommentClick(x, y);
      }
    }
  };

  // Handle resolving threads
  const handleResolveThread = (threadId: string) => {
    editThreadMetadata({
      threadId,
      metadata: { resolved: true },
    });
  };

  // Event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleWheel, handleMouseMove, handleMouseUp]);

  // Keyboard shortcuts: Escape for comment mode, Arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cancel comment mode on Escape
      if (e.key === "Escape") {
        cancelCommentMode();
        clearPendingComment();
        return;
      }

      // Arrow key navigation
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        // Don't interfere with input fields
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        
        e.preventDefault();

        // Filter journeys that have pages
        const navigableJourneys = journeys.filter(j => j.pages.length > 0);
        if (navigableJourneys.length === 0) return;

        // Initialize to first frame if no current position
        if (!focusedPosition) {
          const firstJourneyIndex = journeys.findIndex(j => j.pages.length > 0);
          if (firstJourneyIndex !== -1) {
            setFocusedPosition({ journeyIndex: firstJourneyIndex, pageIndex: 0 });
            panToFrame(firstJourneyIndex, 0);
          }
          return;
        }

        let { journeyIndex, pageIndex } = focusedPosition;
        const currentJourney = journeys[journeyIndex];

        switch (e.key) {
          case "ArrowLeft":
            // Move to previous screen in current journey
            if (pageIndex > 0) {
              pageIndex -= 1;
            }
            break;

          case "ArrowRight":
            // Move to next screen in current journey
            if (currentJourney && pageIndex < currentJourney.pages.length - 1) {
              pageIndex += 1;
            }
            break;

          case "ArrowUp":
            // Move to journey above (find previous journey with pages)
            for (let i = journeyIndex - 1; i >= 0; i--) {
              if (journeys[i].pages.length > 0) {
                journeyIndex = i;
                // Clamp pageIndex to new journey's length
                pageIndex = Math.min(pageIndex, journeys[i].pages.length - 1);
                break;
              }
            }
            break;

          case "ArrowDown":
            // Move to journey below (find next journey with pages)
            for (let i = journeyIndex + 1; i < journeys.length; i++) {
              if (journeys[i].pages.length > 0) {
                journeyIndex = i;
                // Clamp pageIndex to new journey's length
                pageIndex = Math.min(pageIndex, journeys[i].pages.length - 1);
                break;
              }
            }
            break;
        }

        // Update position and pan to the new frame
        setFocusedPosition({ journeyIndex, pageIndex });
        panToFrame(journeyIndex, pageIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cancelCommentMode, clearPendingComment, focusedPosition, journeys, panToFrame]);

  // Theme cycling
  const cycleTheme = () => {
    if (themePreference === "light") setTheme("dark");
    else if (themePreference === "dark") setTheme("system");
    else setTheme("light");
  };

  const ThemeIcon = themePreference === "light" ? Sun : themePreference === "dark" ? Moon : Monitor;

  // Filter threads to show only unresolved ones as pins
  const visibleThreads = threads.filter(
    (thread) => !(thread.metadata as { resolved?: boolean }).resolved
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-bg-base relative">
      {/* Floating Left Toolbar */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 p-2 bg-bg-elevated rounded-xl shadow-lg border border-border-standard">
        {/* Home / Back */}
        <Link href="/">
          <ToolbarButton icon={Home} tooltip="Home" />
        </Link>
        
        <ToolbarDivider />
        
        {/* Zoom Controls */}
        <ToolbarButton icon={ZoomIn} onClick={handleZoomIn} tooltip="Zoom In" />
        <ToolbarButton icon={ZoomOut} onClick={handleZoomOut} tooltip="Zoom Out" />
        <ToolbarButton icon={Maximize} onClick={handleResetView} tooltip="Reset View" />
        
        {/* Zoom Level Display */}
        <div className="px-2 py-1 text-xs text-center text-text-secondary font-mono">
          {Math.round(zoom * 100)}%
        </div>
        
        <ToolbarDivider />
        
        {/* Comment Mode Toggle */}
        <ToolbarButton 
          icon={isCommentMode ? X : MessageCircle}
          onClick={isCommentMode ? cancelCommentMode : startCommentMode}
          tooltip={isCommentMode ? "Cancel Comment" : "Add Comment"}
          active={isCommentMode}
        />
        
        <ToolbarDivider />
        
        {/* Theme Toggle */}
        <ToolbarButton 
          icon={ThemeIcon} 
          onClick={cycleTheme} 
          tooltip={`Theme: ${themePreference}`}
          active={themePreference !== "system"}
        />
        
        <ToolbarDivider />
        
        {/* Design System Panel Toggle */}
        <ToolbarButton 
          icon={SwatchBook}
          onClick={() => setIsDesignSystemPanelOpen(true)}
          tooltip="Design System"
          active={isDesignSystemPanelOpen}
        />
      </div>

      {/* Top Right - Presence & Sidebar Toggle */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-3">
        <PresenceAvatars />
        
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg",
            "bg-bg-elevated border border-border-standard shadow-lg",
            "hover:bg-bg-secondary transition-colors",
            "text-text-secondary hover:text-text-primary"
          )}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {threads.length > 0 ? threads.length : ""}
          </span>
        </button>
      </div>

      {/* Canvas Area with Dotted Background */}
      <div
        ref={canvasRef}
        data-canvas
        className={cn(
          "h-full w-full relative",
          isPanning ? "cursor-grabbing" : isCommentMode ? "cursor-crosshair" : "cursor-grab"
        )}
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: `${pan.x % 20}px ${pan.y % 20}px`,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleCanvasClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Live Cursors */}
        <Cursors />

        {/* Transformable Content */}
        <div
          data-canvas
          className="origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Comment Pins */}
          {visibleThreads.map((thread) => (
            <CommentPin 
              key={thread.id} 
              thread={thread}
              onResolve={handleResolveThread}
            />
          ))}

          {/* Pending Comment Composer */}
          {pendingComment && (
            <CommentComposer
              x={pendingComment.x}
              y={pendingComment.y}
              onClose={clearPendingComment}
            />
          )}

          {/* Journey Flows */}
          <div className="flex flex-col gap-32 p-8">
            {journeys.map((journey) => (
              <div key={journey.id} className="relative">
                {/* Journey Label */}
                <div className="mb-8 flex items-center gap-3">
                  <div className={cn(
                    "px-4 py-2 rounded-lg font-semibold text-lg",
                    "bg-bg-elevated border border-border-standard shadow-sm"
                  )}>
                    {journey.title}
                  </div>
                  <span className={cn(
                    "px-3 py-1.5 text-sm rounded-full font-medium",
                    journey.status === 'in-progress' 
                      ? "bg-info/20 text-info" 
                      : journey.status === 'completed' 
                      ? "bg-success/20 text-success" 
                      : "bg-bg-secondary text-text-tertiary"
                  )}>
                    {journey.status === 'in-progress' ? 'Active' : journey.status === 'completed' ? 'Completed' : 'Draft'}
                  </span>
                  <span className="text-sm text-text-tertiary">
                    {journey.pages.length} {journey.pages.length === 1 ? 'screen' : 'screens'}
                  </span>
                </div>
                
                {/* Screens Flow */}
                <div className="flex items-start gap-6">
                  {journey.pages.map((page, pageIndex) => (
                    <div key={page.id} className="flex items-center">
                      {/* Screen Frame with iframe */}
                      <div className="group relative">
                        {/* Screen Label - Above */}
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-text-primary">
                              {page.name}
                            </div>
                            <div className="text-xs text-text-tertiary font-mono">
                              {page.id}
                            </div>
                          </div>
                          <Link 
                            href={page.path} 
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            target="_blank"
                          >
                            <div className="p-1.5 rounded-md bg-bg-secondary hover:bg-accent hover:text-white transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </div>
                          </Link>
                        </div>
                        
                        {/* iframe Container */}
                        <div 
                          className={cn(
                            "relative rounded-lg overflow-hidden",
                            "border-2 border-border-standard",
                            "shadow-lg transition-all duration-200",
                            "group-hover:border-accent group-hover:shadow-xl",
                            "bg-white" // iframe background
                          )}
                          style={{
                            width: FRAME_WIDTH,
                            height: page.height ?? FRAME_HEIGHT,
                          }}
                        >
                          {/* iframe renders the actual page */}
                          <iframe
                            src={page.path}
                            title={page.name}
                            className="w-full h-full border-0"
                            style={{
                              pointerEvents: zoom >= 0.8 ? 'auto' : 'none', // Allow interaction when zoomed in
                            }}
                          />
                          
                          {/* Overlay for clicking when zoomed out */}
                          {zoom < 0.8 && (
                            <Link 
                              href={page.path}
                              className="absolute inset-0 z-10"
                              title={`Open ${page.name}`}
                            />
                          )}
                        </div>
                        
                        {/* Description below */}
                        {page.description && (
                          <div className="mt-2 text-xs text-text-secondary max-w-[300px]">
                            {page.description}
                          </div>
                        )}
                      </div>
                      
                      {/* Connector Arrow */}
                      {pageIndex < journey.pages.length - 1 && (
                        <div className="flex items-center px-4 text-border-standard self-center" style={{ marginTop: -40 }}>
                          <div className="w-12 h-0.5 bg-border-standard" />
                          <ArrowRight className="w-6 h-6 text-text-tertiary" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Empty State */}
                  {journey.pages.length === 0 && (
                    <div 
                      className={cn(
                        "rounded-lg",
                        "border-2 border-dashed border-border-subtle",
                        "flex items-center justify-center",
                        "bg-bg-secondary/50"
                      )}
                      style={{
                        width: FRAME_WIDTH,
                        height: FRAME_HEIGHT,
                      }}
                    >
                      <div className="text-center text-text-tertiary p-8">
                        <div className="text-base font-medium mb-2">No screens yet</div>
                        <div className="text-sm">Add pages to this journey&apos;s _journey.ts file</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Sidebar */}
      <CommentsSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Design System Panel */}
      <DesignSystemPanel 
        isOpen={isDesignSystemPanelOpen} 
        onClose={() => setIsDesignSystemPanelOpen(false)} 
      />
      
      {/* Help Text */}
      <div className="fixed bottom-4 right-4 text-xs text-text-tertiary bg-bg-elevated/90 px-3 py-2 rounded-lg backdrop-blur-sm border border-border-subtle">
        {isCommentMode 
          ? "Click anywhere to add a comment • Press Esc to cancel"
          : `Tab to navigate toolbar • Drag to pan • Ctrl+Scroll to zoom • Arrow keys to navigate • ${zoom >= 0.8 ? 'Interact with screens' : 'Zoom to 80%+ to interact'}`
        }
      </div>
    </div>
  );
}

// Toolbar Button Component
function ToolbarButton({ 
  icon: Icon, 
  onClick, 
  tooltip,
  active = false
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  onClick?: () => void;
  tooltip?: string;
  active?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
      // If no onClick, let the parent Link handle navigation
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={cn(
          "p-2.5 rounded-lg transition-all duration-200",
          "text-text-secondary hover:text-text-primary",
          "hover:bg-bg-tertiary",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-elevated",
          active && "bg-accent/10 text-accent"
        )}
        aria-label={tooltip}
      >
        <Icon className="w-5 h-5" />
      </button>
      {isHovered && tooltip && (
        <div className="absolute left-full ml-[18px] top-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-gray-800 border-b-4 border-b-transparent" />
            <div className="bg-gray-800 text-white text-sm px-3 py-2.5 rounded-lg whitespace-nowrap shadow-lg">
              {tooltip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Toolbar Divider Component
function ToolbarDivider() {
  return <div className="h-px bg-border-standard my-1" />;
}

// Design System Panel Component
function DesignSystemPanel({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-2xl",
          "transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col bg-bg-elevated shadow-2xl border-l border-border-standard">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-standard">
            <div className="flex items-center gap-3">
              <SwatchBook className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-text-primary">Design System</h2>
            </div>
            <button
              onClick={onClose}
              className={cn(
                "p-2 rounded-lg transition-colors",
                "text-text-secondary hover:text-text-primary",
                "hover:bg-bg-tertiary"
              )}
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close panel</span>
            </button>
          </div>
          
          {/* Content - Design System iframe */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src="/design-system"
              title="Design System"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}
