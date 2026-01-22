"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../button";
import { Heading } from "../text-heading";
import { Text } from "../text";
import { X, Search, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Category Logo Component
function CategoryLogo({ category }: { category: string }) {
  const isATP = category.toUpperCase() === "ATP";
  const logoSrc = isATP ? "/images/ATP_Logo_White.svg" : "/images/WTA_Logo_White.svg";
  
  return (
    <Image
      src={logoSrc}
      alt={category}
      width={isATP ? 40 : 34}
      height={12}
      className="h-3 w-auto"
    />
  );
}

// Types
export interface StoryData {
  id: string;
  category: string;
  headline: string;
  summary: string;
  localImage: string;
  date: string;
  ctaLabel: string;
}

export interface StoriesViewerProps {
  stories: StoryData[];
  initialStoryIndex?: number;
  onClose: () => void;
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

// Progress Indicator Component
function ProgressIndicator({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  // Don't render if no stories
  if (!total || total <= 0) return null;
  
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex gap-1.5 px-4 py-3">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-1 rounded-full overflow-hidden bg-white/40"
        >
          <div
            className={`h-full rounded-full bg-white transition-all duration-300 ${
              index <= current ? "w-full" : "w-0"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

// Story Page Content Component (NBA-style layout)
interface StoryPageContentProps {
  story: StoryData;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalStories: number;
}

function StoryPageContent({
  story,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  currentIndex,
  totalStories,
}: StoryPageContentProps) {
  return (
    <div className="relative h-full w-full bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${story.localImage})` }}
      />

      {/* Gradient Overlay - fades from transparent to black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Progress Indicator - positioned absolutely at top with high z-index */}
      <ProgressIndicator total={totalStories} current={currentIndex} />

      {/* Content Container */}
      <div className="relative h-full flex flex-col safe-area-inset">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 pt-8 pb-2">
          {/* Title & Time */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <Text
              size="sm"
              weight="medium"
              className="text-white truncate flex-1"
            >
              {story.headline.length > 28
                ? story.headline.substring(0, 28) + "..."
                : story.headline}
            </Text>
            <Text size="sm" className="text-white/60 flex-shrink-0">
              {getRelativeTime(story.date)}
            </Text>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 ml-4">
            <button
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Touch Navigation Areas */}
        <div className="flex-1 flex">
          {/* Previous tap area */}
          <button
            onClick={onPrevious}
            className="w-1/3 h-full"
            disabled={!hasPrevious}
            aria-label="Previous story"
          />
          {/* Next tap area */}
          <button
            onClick={onNext}
            className="w-2/3 h-full"
            disabled={!hasNext}
            aria-label="Next story"
          />
        </div>

        {/* Bottom Content */}
        <div className="px-4 pb-4 space-y-3">
          {/* Category Logo */}
          <CategoryLogo category={story.category} />

          {/* Headline */}
          <Heading
            as="h1"
            size="2xl"
            className="text-white uppercase leading-tight"
          >
            {story.headline}
          </Heading>

          {/* Summary */}
          <Text size="sm" className="text-white/90 leading-relaxed line-clamp-4">
            {story.summary}
          </Text>

          {/* Share Button */}
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
        <div className="px-4 pb-6">
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

      {/* Desktop Navigation Arrows (visible on larger screens) */}
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors hidden md:flex"
          aria-label="Previous story"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors hidden md:flex"
          aria-label="Next story"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

// Main Stories Viewer Component
export function StoriesViewer({
  stories,
  initialStoryIndex = 0,
  onClose,
}: StoriesViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);

  const currentStory = stories[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < stories.length - 1;

  const goToPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [hasPrevious]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Close when reaching the end
      onClose();
    }
  }, [hasNext, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  // Prevent body scroll when viewer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <StoryPageContent
        story={currentStory}
        onClose={onClose}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        currentIndex={currentIndex}
        totalStories={stories.length}
      />
    </div>
  );
}
