"use client";

import React from "react";
import {
  InstaStories,
  Configurable,
  Page,
  Pages,
  Preview,
  Stories,
  Story,
  useViewerContext,
  useTimerContext,
} from "@react-instastories/base";
import { Controls, Events } from "@react-instastories/external";

import "@react-instastories/base/index.css";
import "@react-instastories/external/index.css";

// Custom styles to override library defaults
const customStyles = `
  @keyframes fadeInBackground {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 1);
    }
  }
  .instastories-viewer {
    position: fixed !important;
    inset: 0 !important;
    z-index: 100 !important;
    background: black !important;
    animation: fadeInBackground 0.3s ease-out !important;
  }
  .instastories-story {
    height: 100% !important;
    width: 100% !important;
  }
  .instastories-page {
    height: 100% !important;
    width: 100% !important;
  }
  .instastories-indicator {
    position: absolute !important;
    top: 8px !important;
    left: 16px !important;
    right: 16px !important;
    z-index: 10 !important;
    display: flex !important;
    gap: 4px !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }
  .instastories-indicator-item {
    flex: 1 1 0% !important;
    min-width: 0 !important;
    height: 3px !important;
    background: rgba(255,255,255,0.4) !important;
    border-radius: 2px !important;
    overflow: hidden !important;
  }
  .instastories-indicator-item-bar {
    height: 100% !important;
    background: white !important;
    border-radius: 2px !important;
  }
  .instastories-button-stories-control {
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    z-index: 10 !important;
    background: rgba(0,0,0,0.5) !important;
    border-radius: 50% !important;
    padding: 8px !important;
  }
  .instastories-button-stories-control--next {
    right: 8px !important;
  }
  .instastories-button-stories-control--previous {
    left: 8px !important;
  }
  .instastories-preview {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    cursor: pointer !important;
  }
  .instastories-preview:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  .instastories-preview:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }
  .instastories-stories--grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important;
    gap: 0.9rem !important;
    overflow-x: hidden !important;
    overflow-y: visible !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 1rem 1rem !important;
  }
  .instastories-stories--grid > * {
    min-width: 0 !important;
    max-width: 100% !important;
  }
  .instastories-stories--full {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.5rem !important;
    padding: 0 0.5rem 0.5rem !important;
    width: 100% !important;
    max-width: 100% !important;
    justify-items: center !important;
  }
  .instastories-stories--full .instastories-preview {
    width: 100% !important;
    max-width: 288px !important;
    aspect-ratio: 3/4 !important;
    height: auto !important;
  }
  .instastories-stories--full .instastories-preview > div {
    width: 100% !important;
    height: 100% !important;
  }
  @media (min-width: 640px) {
    .instastories-stories--full {
      gap: 1rem !important;
      padding: 0 1rem 1rem !important;
    }
    .instastories-stories--full .instastories-preview {
      width: 288px !important;
      height: 384px !important;
      min-width: 288px !important;
      min-height: 384px !important;
      max-width: 288px !important;
      max-height: 384px !important;
      aspect-ratio: unset !important;
    }
  }
`;

import { Button } from "../button";
import { Heading } from "../text-heading";
import { Text } from "../text";
import { X, Share2, Pause, Play, ChevronRight } from "lucide-react";
import Image from "next/image";

// Category Logo Component
function CategoryLogo({
  category,
  size = "default",
}: {
  category: string;
  size?: "small" | "default" | "large";
}) {
  const isATP = category.toUpperCase() === "ATP";
  const logoSrc = isATP ? "/images/ATP_Logo_White.svg" : "/images/WTA_Logo_White.svg";
  
  const dimensions =
    size === "small"
      ? { width: isATP ? 28 : 24, height: 8, className: "h-2 w-auto" }
      : size === "large"
        ? { width: isATP ? 52 : 46, height: 16, className: "h-4 w-auto" }
        : { width: isATP ? 40 : 34, height: 12, className: "h-3 w-auto" };
  
  return (
    <Image
      src={logoSrc}
      alt={category}
      width={dimensions.width}
      height={dimensions.height}
      className={dimensions.className}
    />
  );
}

// Types
export interface InstaStoryData {
  id: string;
  category: string;
  headline: string;
  summary: string;
  localImage: string;
  date: string;
  ctaLabel: string;
}

export interface InstaStoriesSectionProps {
  stories: InstaStoryData[];
  title?: string;
  layout?: "horizontal" | "grid" | "full";
  showTitle?: boolean;
}

// Helper to format relative time
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Preview Card Component (shown in the horizontal scroll or grid)
function StoryPreviewCard({
  story,
  layout = "horizontal",
}: {
  story: InstaStoryData;
  layout?: "horizontal" | "grid" | "full";
}) {
  const isGrid = layout === "grid";
  const isFull = layout === "full";
  
  // URL encode the image path to handle spaces and special characters
  const encodedImageUrl = encodeURI(story.localImage);
  
  const computedClassName = `relative overflow-hidden cursor-pointer group ${
    isFull
      ? "w-72 h-96 rounded-2xl"
      : isGrid
        ? "w-full aspect-[2/3] rounded-xl"
        : "w-36 h-56 flex-shrink-0 rounded-xl"
  }`;
  
  return (
    <div
      className={computedClassName}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${encodedImageUrl})` }}
      />
      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isFull ? "from-black/85 via-black/40 to-transparent" : "from-black/80 via-black/20 to-transparent"
        }`}
      />
      {/* Content - logo and text at bottom left */}
      <div
        className={`absolute flex flex-col items-start ${
          isFull ? "bottom-4 left-4 gap-2" : "bottom-2 left-2 gap-1"
        }`}
      >
        <div className="flex-shrink-0 drop-shadow">
          <CategoryLogo category={story.category} size={isFull ? "large" : "small"} />
        </div>
        <Text
          size={isFull ? "md" : "sm"}
          weight="medium"
          className={`text-white leading-tight text-left ${
            isFull ? "line-clamp-3 pr-6" : "line-clamp-2"
          }`}
        >
          {story.headline.length > 40
            ? story.headline.substring(0, 40) + "..."
            : story.headline}
        </Text>
      </div>
      {/* Hover ring */}
      <div
        className={`absolute inset-0 ring-2 ring-transparent group-hover:ring-accent/50 transition-all ${
          isFull ? "rounded-2xl" : "rounded-xl"
        }`}
      />
    </div>
  );
}

// Story Page Content Component (fullscreen view)
function StoryPageContent({ story }: { story: InstaStoryData }) {
  // URL encode the image path to handle spaces and special characters
  const encodedImageUrl = encodeURI(story.localImage);
  
  return (
    <div className="relative h-full w-full bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${encodedImageUrl})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col">
        {/* Header with close button */}
        <div className="flex items-center justify-between px-4 pt-12 pb-2">
          <div className="flex-1 flex items-center gap-2">
            <Text size="sm" weight="medium" className="text-white truncate">
              {story.headline.length > 28
                ? story.headline.substring(0, 28) + "..."
                : story.headline}
            </Text>
            <Text size="sm" className="text-white/60">
              {getRelativeTime(story.date)}
            </Text>
          </div>
          <div className="flex items-center">
            <PlayPauseButton />
            <CloseButton />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Content */}
        <div className="px-4 pb-4 space-y-3">
          <CategoryLogo category={story.category} />

          <Heading as="h1" size="2xl" className="text-white uppercase leading-tight">
            {story.headline}
          </Heading>

          <Text size="sm" className="text-white/90 leading-relaxed line-clamp-4">
            {story.summary}
          </Text>

          <div className="flex justify-end pt-1">
            <button
              className="p-2.5 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Share"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-4 pb-8">
          <Button
            variant="solid"
            action="secondary"
            isFullWidth
            className="bg-white text-black hover:bg-white/90"
          >
            {story.ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Play/Pause Button using timer context
function PlayPauseButton() {
  const timer = useTimerContext();

  const handleToggle = () => {
    if (timer.active) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 text-white/80 hover:text-white transition-colors"
      aria-label={timer.active ? "Pause" : "Play"}
    >
      {timer.active ? <Pause size={20} /> : <Play size={20} />}
    </button>
  );
}

// Close Button using viewer context
function CloseButton() {
  const viewer = useViewerContext();

  return (
    <button
      onClick={() => viewer.close()}
      className="p-2 text-white/80 hover:text-white transition-colors"
      aria-label="Close"
    >
      <X size={24} />
    </button>
  );
}

// Main InstaStories Section Component
export function InstaStoriesSection({ 
  stories, 
  title = "More Stories", 
  layout = "horizontal",
  showTitle = true 
}: InstaStoriesSectionProps) {
  const isGrid = layout === "grid";
  const isFull = layout === "full";
  
  return (
    <div className={isGrid || isFull ? "py-4 w-full overflow-x-hidden" : "py-6"}>
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Section Title - only show if showTitle is true */}
      {showTitle && (
        <div className="px-4 mb-1 flex items-center justify-between">
          <Heading as="h2" size="lg" className="text-text-primary">
            {title}
          </Heading>
          {!isGrid && !isFull && (
            <button className="flex items-center gap-1 text-text-primary hover:text-text-secondary transition-colors">
              <Text size="sm" weight="medium">All Stories</Text>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* InstaStories Component */}
      <InstaStories
        config={{
          preview: {
            shouldMount: true,
          },
        }}
      >
        {/* Event handlers */}
        <Events.Keyboard.Close />
        <Events.Keyboard.Stories />
        <Events.Pointer.Stories />
        <Events.Pointer.Close />
        <Events.Mount.AutoClose />

        {/* Configurable container for controls that render inside the viewer */}
        <Configurable.Container>
          <Configurable.Story>
            <Controls.Indicator interactive threshold={1000} />
            <Controls.Stories.Next />
            <Controls.Stories.Previous />
          </Configurable.Story>
        </Configurable.Container>

        {/* Stories with Preview cards - grid or horizontal layout */}
        <Stories
          className={
            isFull
              ? "instastories-stories--full"
              : isGrid
                ? "instastories-stories--grid"
                : "flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide"
          }
        >
          {stories.map((story) => (
            <Story key={story.id}>
              <Preview>
                <StoryPreviewCard story={story} layout={layout} />
              </Preview>
              <Pages>
                <Page>
                  <StoryPageContent story={story} />
                </Page>
              </Pages>
            </Story>
          ))}
        </Stories>
      </InstaStories>
    </div>
  );
}

export type { InstaStoriesSectionProps as InstaStoriesProps };
