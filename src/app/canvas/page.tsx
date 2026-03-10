"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { 
  ZoomIn, ZoomOut, Maximize, Home, Sun, Moon, Monitor, 
  ArrowRight, ExternalLink, X, SwatchBook,
  MousePointer2, Hand, Smartphone, Tablet 
} from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { getAllJourneys } from "@/lib/data/journeys-registry";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

// Frame dimensions - default height fallback (width is now controlled by device mode)
const FRAME_HEIGHT = 812; // Mobile height (iPhone X/11/12/13)

// Device mode presets for toggling between mobile, tablet, and desktop widths
const DEVICE_PRESETS = {
  mobile:  { width: 375,  height: 812,  label: "Mobile",  icon: Smartphone },
  tablet:  { width: 768,  height: 1024, label: "Tablet",  icon: Tablet },
  desktop: { width: 1440, height: 900,  label: "Desktop", icon: Monitor },
} as const;

type DeviceMode = keyof typeof DEVICE_PRESETS;

// Layout constants for navigation calculations
const JOURNEY_GAP = 128; // gap-32 in Tailwind
const SCREEN_GAP = 24; // gap-6 in Tailwind
const CONNECTOR_WIDTH = 88; // px-4 (16px * 2) + w-12 (48px) + arrow icon width (24px)
const CANVAS_PADDING = 32; // p-8 in Tailwind
const JOURNEY_LABEL_HEIGHT = 76; // Approximate height of journey label + mb-8
const SCREEN_LABEL_HEIGHT = 44; // Approximate height of screen label + mb-3

// Initial transform values
const INITIAL_SCALE = 0.8;
const INITIAL_PAN_X = 180;
const INITIAL_PAN_Y = 80;

export default function CanvasPage() {
  return <CanvasContent />;
}

function CanvasContent() {
  const journeys = getAllJourneys();
  const { theme, themePreference, setTheme } = useTheme();
  
  // Device mode state
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("mobile");
  const [isDeviceFlyoutOpen, setIsDeviceFlyoutOpen] = useState(false);
  const [isThemeFlyoutOpen, setIsThemeFlyoutOpen] = useState(false);
  const frameWidth = DEVICE_PRESETS[deviceMode].width;

  // Tool mode state
  const [activeTool, setActiveTool] = useState<"select" | "pan">("select");
  const [spacePressed, setSpacePressed] = useState(false);

  // Transform state tracked from the library for UI display & coordinate math
  const [transformState, setTransformState] = useState({
    scale: INITIAL_SCALE,
    positionX: INITIAL_PAN_X,
    positionY: INITIAL_PAN_Y,
  });
  
  const [isDesignSystemPanelOpen, setIsDesignSystemPanelOpen] = useState(false);
  
  // Keyboard navigation state
  const [focusedPosition, setFocusedPosition] = useState<{ journeyIndex: number; pageIndex: number } | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  // Auto-reset view when device mode changes
  const isInitialMount = useRef(true);
  useEffect(() => {
    // Skip the initial mount so we don't reset on first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Small delay to let the layout reflow with new widths before panning
    const timeout = setTimeout(() => {
      transformRef.current?.setTransform(INITIAL_PAN_X, INITIAL_PAN_Y, INITIAL_SCALE, 350);
    }, 50);
    return () => clearTimeout(timeout);
  }, [deviceMode]);

  // Helper: check if an event target is an editable element (input, textarea, contenteditable, etc.)
  const isEditableElement = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false;
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target.isContentEditable ||
      target.getAttribute("role") === "textbox"
    );
  };

  const isPanEnabled = activeTool === "pan" || spacePressed;

  // Zoom handlers (use library ref with animation)
  const handleZoomIn = useCallback(() => {
    transformRef.current?.zoomIn(0.2, 200);
  }, []);

  const handleZoomOut = useCallback(() => {
    transformRef.current?.zoomOut(0.2, 200);
  }, []);

  const handleResetView = useCallback(() => {
    transformRef.current?.setTransform(INITIAL_PAN_X, INITIAL_PAN_Y, INITIAL_SCALE, 350);
  }, []);

  // Calculate pan position to center a specific frame in the viewport
  const panToFrame = useCallback((journeyIndex: number, pageIndex: number) => {
    const ref = transformRef.current;
    if (!ref?.setTransform) return;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Use current scale from the library
    const currentScale = transformState.scale;

    // Calculate the frame's position on the canvas
    let frameY = CANVAS_PADDING;
    for (let i = 0; i < journeyIndex; i++) {
      const journey = journeys[i];
      const maxHeight = journey.pages.length > 0 
        ? Math.max(...journey.pages.map(p => p.height ?? FRAME_HEIGHT))
        : FRAME_HEIGHT;
      frameY += JOURNEY_LABEL_HEIGHT + SCREEN_LABEL_HEIGHT + maxHeight + JOURNEY_GAP;
    }
    frameY += JOURNEY_LABEL_HEIGHT + SCREEN_LABEL_HEIGHT;

    // Horizontal position: padding + (frame widths + connectors for previous screens)
    const frameX = CANVAS_PADDING + pageIndex * (frameWidth + CONNECTOR_WIDTH);

    // Get the height of the current frame
    const currentJourney = journeys[journeyIndex];
    const currentFrameHeight = currentJourney?.pages[pageIndex]?.height ?? FRAME_HEIGHT;

    // Calculate the center of the frame
    const frameCenterX = frameX + frameWidth / 2;
    const frameCenterY = frameY + currentFrameHeight / 2;

    // Calculate pan to center the frame in viewport (accounting for zoom)
    const targetPanX = viewportWidth / 2 - frameCenterX * currentScale;
    const targetPanY = viewportHeight / 2 - frameCenterY * currentScale;

    ref.setTransform(targetPanX, targetPanY, currentScale, 300);
  }, [journeys, transformState.scale, frameWidth]);

  // Space key listener for temporary pan mode
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isEditableElement(e.target)) {
        e.preventDefault();
        setSpacePressed(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setSpacePressed(false);
        if (!isEditableElement(e.target)) {
          e.preventDefault();
        }
      }
    };
    const onBlur = () => setSpacePressed(false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // Keyboard shortcuts: Arrow keys, V/H tool shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with editable elements (inputs, textareas, contenteditable, etc.)
      if (isEditableElement(e.target)) {
        return;
      }

      // Tool shortcuts
      if (e.key === "v" || e.key === "V") {
        setActiveTool("select");
        return;
      }
      if (e.key === "h" || e.key === "H") {
        setActiveTool("pan");
        return;
      }

      // Arrow key navigation
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
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
            if (pageIndex > 0) {
              pageIndex -= 1;
            }
            break;

          case "ArrowRight":
            if (currentJourney && pageIndex < currentJourney.pages.length - 1) {
              pageIndex += 1;
            }
            break;

          case "ArrowUp":
            for (let i = journeyIndex - 1; i >= 0; i--) {
              if (journeys[i].pages.length > 0) {
                journeyIndex = i;
                pageIndex = Math.min(pageIndex, journeys[i].pages.length - 1);
                break;
              }
            }
            break;

          case "ArrowDown":
            for (let i = journeyIndex + 1; i < journeys.length; i++) {
              if (journeys[i].pages.length > 0) {
                journeyIndex = i;
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
  }, [focusedPosition, journeys, panToFrame]);

  // Theme cycling
  const cycleTheme = () => {
    if (themePreference === "light") setTheme("dark");
    else if (themePreference === "dark") setTheme("system");
    else setTheme("light");
  };

  const ThemeIcon = themePreference === "light" ? Sun : themePreference === "dark" ? Moon : Monitor;

  const getCursorClass = () => {
    if (isPanEnabled) return "cursor-grab";
    return "cursor-default";
  };

  const iframesInteractive = transformState.scale >= 0.8 && activeTool === "select" && !spacePressed;

  return (
    <div className="h-screen w-screen overflow-hidden bg-bg-base relative">
      {/* Floating Left Toolbar + Zoom Sub-menu */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 panningDisabled wheelDisabled">
        {/* Main Toolbar */}
        <div className="flex flex-col gap-1 p-1.5 bg-bg-elevated rounded-lg shadow-lg border border-border-standard">
          {/* Home / Back */}
          <Link href="/">
            <ToolbarButton icon={Home} tooltip="Home" />
          </Link>

          {/* Tool Mode Toggle */}
          <ToolbarButton 
            icon={MousePointer2} 
            onClick={() => setActiveTool("select")} 
            tooltip="Select (V)" 
            active={activeTool === "select"}
          />
          <ToolbarButton 
            icon={Hand} 
            onClick={() => setActiveTool("pan")} 
            tooltip="Pan (H)" 
            active={activeTool === "pan"}
          />

          {/* Device Mode Toggle */}
          <div className="relative">
            <ToolbarButton
              icon={DEVICE_PRESETS[deviceMode].icon}
              onClick={() => setIsDeviceFlyoutOpen(!isDeviceFlyoutOpen)}
              tooltip={DEVICE_PRESETS[deviceMode].label}
              active={isDeviceFlyoutOpen}
            />
            
            {/* Device Flyout */}
            {isDeviceFlyoutOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDeviceFlyoutOpen(false)} />
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 bg-bg-elevated rounded-lg shadow-lg border border-border-standard py-1 min-w-[220px]">
                  {(Object.keys(DEVICE_PRESETS) as DeviceMode[]).map((mode) => {
                    const preset = DEVICE_PRESETS[mode];
                    const Icon = preset.icon;
                    const isActive = deviceMode === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => { setDeviceMode(mode); setIsDeviceFlyoutOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors",
                          "hover:bg-bg-tertiary",
                          isActive ? "text-accent" : "text-text-secondary"
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium flex-1">{preset.label}</span>
                        <span className="text-xs text-text-tertiary tabular-nums">{preset.width} &times; {preset.height}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="relative">
            <ToolbarButton
              icon={ThemeIcon}
              onClick={() => setIsThemeFlyoutOpen(!isThemeFlyoutOpen)}
              tooltip={`Theme: ${themePreference}`}
              active={isThemeFlyoutOpen}
            />
            
            {/* Theme Flyout */}
            {isThemeFlyoutOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsThemeFlyoutOpen(false)} />
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 bg-bg-elevated rounded-lg shadow-lg border border-border-standard py-1 min-w-[160px]">
                  {([
                    { id: "light" as const, label: "Light", icon: Sun },
                    { id: "dark" as const, label: "Dark", icon: Moon },
                    { id: "system" as const, label: "System", icon: Monitor },
                  ]).map((option) => {
                    const Icon = option.icon;
                    const isActive = themePreference === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => { setTheme(option.id); setIsThemeFlyoutOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors",
                          "hover:bg-bg-tertiary",
                          isActive ? "text-accent" : "text-text-secondary"
                        )}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Design System Panel Toggle */}
          <ToolbarButton 
            icon={SwatchBook}
            onClick={() => setIsDesignSystemPanelOpen(true)}
            tooltip="Design System"
            active={isDesignSystemPanelOpen}
          />
        </div>

        {/* Zoom Sub-menu */}
        <div className="flex flex-col gap-1 p-1.5 bg-bg-elevated rounded-lg border border-black/10">
          <ToolbarButton icon={ZoomIn} onClick={handleZoomIn} tooltip="Zoom In" />
          
          {/* Zoom Level Display */}
          <div className="py-1 text-[11px] text-center text-text-secondary font-medium tabular-nums tracking-tight select-none">
            {Math.round(transformState.scale * 100)}%
          </div>
          
          <ToolbarButton icon={ZoomOut} onClick={handleZoomOut} tooltip="Zoom Out" />
          <ToolbarButton icon={Maximize} onClick={handleResetView} tooltip="Reset View" />
        </div>
      </div>

      {/* Canvas Area with TransformWrapper */}
      <TransformWrapper
        initialScale={INITIAL_SCALE}
        minScale={0.2}
        maxScale={2}
        initialPositionX={INITIAL_PAN_X}
        initialPositionY={INITIAL_PAN_Y}
        limitToBounds={false}
        smooth={true}
        panning={{
          disabled: !isPanEnabled,
          excluded: ["panningDisabled"],
          velocityDisabled: false,
        }}
        wheel={{
          excluded: ["wheelDisabled"],
        }}
        onTransformed={(_, state) => {
          setTransformState({
            scale: state.scale,
            positionX: state.positionX,
            positionY: state.positionY,
          });
        }}
        onInit={(ref) => {
          transformRef.current = ref;
          setTransformState({
            scale: ref.state.scale,
            positionX: ref.state.positionX,
            positionY: ref.state.positionY,
          });
        }}
      >
        <div
          ref={canvasRef}
          data-canvas
          className={cn(
            "h-screen w-screen relative",
            getCursorClass()
          )}
          style={{
            backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            backgroundPosition: `${transformState.positionX % 20}px ${transformState.positionY % 20}px`,
          }}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%", overflow: "visible" }}
            contentStyle={{ position: "absolute", left: 0, top: 0 }}
          >
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
                              className="opacity-0 group-hover:opacity-100 transition-opacity panningDisabled"
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
                              width: frameWidth,
                              height: page.height ?? FRAME_HEIGHT,
                            }}
                          >
                            {/* iframe renders the actual page */}
                            <iframe
                              src={page.path}
                              title={page.name}
                              className="w-full h-full border-0"
                              style={{
                                pointerEvents: iframesInteractive ? 'auto' : 'none',
                              }}
                            />
                            
                            {/* Overlay for clicking when zoomed out or in pan mode */}
                            {!iframesInteractive && (
                              <Link 
                                href={page.path}
                                className="absolute inset-0 z-10 panningDisabled"
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
                          width: frameWidth,
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
          </TransformComponent>
        </div>
      </TransformWrapper>

      {/* Design System Panel */}
      <DesignSystemPanel 
        isOpen={isDesignSystemPanelOpen} 
        onClose={() => setIsDesignSystemPanelOpen(false)} 
      />
      
      {/* Help Text */}
      <div className="fixed bottom-4 right-4 text-xs text-text-tertiary bg-bg-elevated/90 px-3 py-2 rounded-lg backdrop-blur-sm border border-border-subtle z-50 panningDisabled wheelDisabled">
        {`V Select • H Pan • Space+Drag to pan • Scroll to zoom • Arrow keys to navigate • ${transformState.scale >= 0.8 && activeTool === "select" ? "Interact with screens" : "Select mode at 80%+ to interact"}`}
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
          "p-2.5 rounded-md transition-all duration-200",
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

