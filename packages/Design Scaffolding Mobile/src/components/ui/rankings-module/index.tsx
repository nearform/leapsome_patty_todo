"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight, Search, TrendingUp, TrendingDown, Sparkles, MessageCircle } from "lucide-react";
import { useTheme } from "../gluestack-ui-provider";
import { Link, LinkText } from "../gluestack/link";
import { Avatar, AvatarImage, AvatarFallback, AvatarFlagBadge } from "../avatar";
import { Tabs, type Tab } from "../tabs";
import { Button } from "../button";

/**
 * RankingsModule - Tennis player rankings display component
 *
 * Displays ATP and WTA player rankings side-by-side in a compact widget format.
 * The Simple variant shows ranked players with minimal information (flag, abbreviated name, ranking position).
 *
 * @example
 * ```tsx
 * <RankingsModule
 *   atpPlayers={[
 *     { name: "C. Alcaraz", countryCode: "ES", rank: 1 },
 *     { name: "J. Sinner", countryCode: "IT", rank: 2 },
 *     // ...
 *   ]}
 *   wtaPlayers={[
 *     { name: "A. Sabalenka", countryCode: "BY", rank: 1 },
 *     { name: "I. Swiatek", countryCode: "PL", rank: 2 },
 *     // ...
 *   ]}
 *   onFullRankingsClick={() => console.log("View full rankings")}
 * />
 * ```
 */

const rankingsModuleVariants = cva(
  "rounded-2xl transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        simple: "px-5 py-4",
        medium: "px-5 py-4",
        expanded: "px-5 py-4",
        "ai-enhanced": "px-5 py-5",
      },
    },
    defaultVariants: {
      variant: "simple",
    },
  }
);

/**
 * PIF Logo component - uses text-primary color via CSS mask
 */
const PIFLogo = () => (
  <div
    className="h-5 w-[52px] bg-text-primary transition-colors duration-200"
    style={{
      maskImage: "url(/images/PIF-logo.svg)",
      maskSize: "contain",
      maskRepeat: "no-repeat",
      maskPosition: "left center",
      WebkitMaskImage: "url(/images/PIF-logo.svg)",
      WebkitMaskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "left center",
    }}
    role="img"
    aria-label="PIF"
  />
);

/**
 * Country flag component using circle-flags CDN
 */
const CountryFlag = ({
  countryCode,
  className,
}: {
  countryCode: string;
  className?: string;
}) => (
  <img
    src={`https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`}
    alt={`${countryCode} flag`}
    className={cn("h-4 w-4 rounded-full object-cover", className)}
  />
);

export interface RankedPlayer {
  /** Abbreviated player name (e.g., "C. Alcaraz") */
  name: string;
  /** ISO country code for flag (e.g., "ES", "IT") */
  countryCode: string;
  /** Numeric ranking position */
  rank: number;
  /** Player avatar/photo URL (required for medium variant) */
  avatarUrl?: string;
  /** Ranking points (e.g., 10990 - required for medium variant) */
  points?: number;
  /** Previous rank position (for showing movement) */
  previousRank?: number;
  /** Rank change (positive = moved up, negative = moved down) */
  rankChange?: number;
}

/** Top mover data for AI Enhanced variant */
export interface TopMover {
  /** Player data */
  player: RankedPlayer;
  /** Whether this is an upward movement (true) or downward (false) */
  isUpward: boolean;
  /** Change in rank positions */
  positionsChanged: number;
  /** New ranking position */
  newRank: number;
}

/** AI Summary data for AI Enhanced variant */
export interface AISummary {
  /** Title for the summary (e.g., "This Week in Rankings") */
  title: string;
  /** Summary text describing the major changes */
  description: string;
}

/** Ranking category type for expanded variant */
export type RankingCategory = "singles" | "doubles" | "race-singles" | "race-doubles";

export interface RankingsModuleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rankingsModuleVariants> {
  /** Top ATP players to display (max 5 recommended) */
  atpPlayers: RankedPlayer[];
  /** Top WTA players to display (max 5 recommended) */
  wtaPlayers: RankedPlayer[];
  /** Callback when "Full Rankings" link is clicked */
  onFullRankingsClick?: () => void;
  /** Last updated date string (e.g., "Jan 15, 2025") - used in expanded variant */
  updatedDate?: string;
  /** Callback when search icon is clicked - used in expanded variant */
  onSearchClick?: () => void;
  /** Default active category for expanded variant */
  defaultCategory?: RankingCategory;
  /** Callback when category tab changes - used in expanded variant */
  onCategoryChange?: (category: RankingCategory) => void;
  /** AI Summary for ai-enhanced variant */
  aiSummary?: AISummary;
  /** Top movers for ai-enhanced variant */
  topMovers?: TopMover[];
  /** Callback when "Explain this week's changes" button is clicked */
  onExplainChangesClick?: () => void;
  /** Tour type for ai-enhanced variant header (defaults to ATP) */
  tour?: "atp" | "wta";
  /** Category type for ai-enhanced variant header (defaults to singles) */
  category?: RankingCategory;
}

/**
 * Header section with PIF logo, title, and link
 */
const RankingsHeader = ({
  onFullRankingsClick,
}: {
  onFullRankingsClick?: () => void;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <PIFLogo />
      <span className="text-xl font-semibold text-text-primary">
        Rankings
      </span>
    </div>
    {onFullRankingsClick && (
      <Link href="#" size="sm" onPress={onFullRankingsClick}>
        <LinkText>Full Rankings</LinkText>
      </Link>
    )}
  </div>
);

/**
 * Tour logos row showing ATP and WTA logos
 * Uses theme-aware logos: Color (dark) for light mode, White for dark mode
 */
const TourLogosRow = ({ theme }: { theme: string }) => (
  <div className="flex items-center justify-between mb-3">
    {/* ATP Logo */}
    <div className="flex-1 flex justify-start">
      <div className="relative h-5 w-12">
        {/* Color logo for light mode */}
        <Image
          src="/images/ATP_Logo_Color.svg"
          alt="ATP"
          fill
          className={cn(
            "object-contain transition-opacity duration-200",
            theme === "dark" ? "opacity-0" : "opacity-100"
          )}
        />
        {/* White logo for dark mode */}
        <Image
          src="/images/ATP_Logo_White.svg"
          alt="ATP"
          fill
          className={cn(
            "object-contain transition-opacity duration-200",
            theme === "dark" ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </div>

    {/* WTA Logo */}
    <div className="flex-1 flex justify-end">
      <div className="relative h-5 w-10">
        {/* Color logo for light mode */}
        <Image
          src="/images/WTA_Logo_Color.svg"
          alt="WTA"
          fill
          className={cn(
            "object-contain transition-opacity duration-200",
            theme === "dark" ? "opacity-0" : "opacity-100"
          )}
        />
        {/* White logo for dark mode */}
        <Image
          src="/images/WTA_Logo_White.svg"
          alt="WTA"
          fill
          className={cn(
            "object-contain transition-opacity duration-200",
            theme === "dark" ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
    </div>
  </div>
);

/**
 * Single ranking row displaying both ATP and WTA players for a position
 */
const RankingRow = ({
  atpPlayer,
  wtaPlayer,
  position,
  isLast,
}: {
  atpPlayer?: RankedPlayer;
  wtaPlayer?: RankedPlayer;
  position: number;
  isLast: boolean;
}) => (
  <div
    className={cn(
      "flex items-center py-2.5",
      !isLast && "border-b border-border-decorative"
    )}
  >
    {/* ATP Player (Left side) */}
    <div className="flex-1 flex items-center gap-2">
      {atpPlayer ? (
        <>
          <CountryFlag countryCode={atpPlayer.countryCode} />
          <span className="text-sm font-medium text-text-primary truncate">
            {atpPlayer.name}
          </span>
        </>
      ) : (
        <span className="text-sm text-text-tertiary">—</span>
      )}
    </div>

    {/* Center Rank Number */}
    <div className="w-10 flex items-center justify-center">
      <span className="text-sm font-light text-text-primary">
        {position}
      </span>
    </div>

    {/* WTA Player (Right side - mirrored layout) */}
    <div className="flex-1 flex items-center justify-end gap-2">
      {wtaPlayer ? (
        <>
          <span className="text-sm font-medium text-text-primary truncate text-right">
            {wtaPlayer.name}
          </span>
          <CountryFlag countryCode={wtaPlayer.countryCode} />
        </>
      ) : (
        <span className="text-sm text-text-tertiary">—</span>
      )}
    </div>
  </div>
);

/**
 * Tour logo component using CSS mask for dynamic coloring
 */
const TourLogo = ({
  tour,
  isActive,
}: {
  tour: "atp" | "wta";
  isActive: boolean;
}) => {
  const logoSrc = tour === "atp" ? "/images/ATP_Logo_White.svg" : "/images/WTA_Logo_White.svg";
  const width = tour === "atp" ? 40 : 34;
  
  return (
    <div
      className={cn(
        "h-3 transition-colors duration-200",
        isActive ? "bg-white" : "bg-text-tertiary"
      )}
      style={{
        width: `${width}px`,
        maskImage: `url(${logoSrc})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${logoSrc})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
      role="img"
      aria-label={tour.toUpperCase()}
    />
  );
};

/**
 * Tour toggle component for medium variant with ATP/WTA logos
 */
const TourToggle = ({
  activeTour,
  onTourChange,
}: {
  activeTour: "atp" | "wta";
  onTourChange: (tour: "atp" | "wta") => void;
}) => (
  <div className="inline-flex bg-bg-secondary rounded-full p-1 gap-1">
    <button
      type="button"
      onClick={() => onTourChange("atp")}
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-200",
        activeTour === "atp"
          ? "bg-accent"
          : "hover:bg-bg-tertiary"
      )}
      aria-pressed={activeTour === "atp"}
      aria-label="Show ATP rankings"
    >
      <TourLogo tour="atp" isActive={activeTour === "atp"} />
    </button>
    <button
      type="button"
      onClick={() => onTourChange("wta")}
      className={cn(
        "px-4 py-2 rounded-full transition-all duration-200",
        activeTour === "wta"
          ? "bg-accent"
          : "hover:bg-bg-tertiary"
      )}
      aria-pressed={activeTour === "wta"}
      aria-label="Show WTA rankings"
    >
      <TourLogo tour="wta" isActive={activeTour === "wta"} />
    </button>
  </div>
);

/**
 * Medium variant ranking row with avatar, flag badge, name, and points
 */
const MediumRankingRow = ({
  player,
  position,
  isLast,
}: {
  player: RankedPlayer;
  position: number;
  isLast: boolean;
}) => {
  // Get initials from name for avatar fallback
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Format points with commas (e.g., 10990 -> "10,990")
  const formattedPoints = player.points?.toLocaleString() ?? "—";

  return (
    <div
      className={cn(
        "flex items-center py-3",
        !isLast && "border-b border-border-decorative"
      )}
    >
      {/* Rank number */}
      <span className="w-6 text-base font-medium text-text-primary">
        {position}
      </span>

      {/* Avatar with flag badge */}
      <div className="relative mx-3">
        <Avatar size="sm">
          {player.avatarUrl ? (
            <AvatarImage src={player.avatarUrl} alt={player.name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <AvatarFlagBadge countryCode={player.countryCode} size="sm" />
      </div>

      {/* Player name */}
      <span className="flex-1 text-base font-medium text-text-primary truncate">
        {player.name}
      </span>

      {/* Points */}
      <span className="text-base font-normal text-text-secondary">
        {formattedPoints}
      </span>
    </div>
  );
};

/**
 * Footer link for medium variant - "See all rankings" with arrow
 */
const MediumFooterLink = ({
  onFullRankingsClick,
}: {
  onFullRankingsClick?: () => void;
}) => (
  <div className="flex justify-end pt-1">
    <Link href="#" size="sm" onPress={onFullRankingsClick}>
      <LinkText>See all rankings</LinkText>
      <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

/**
 * Header for medium variant with PIF logo, title, and tour toggle
 */
const MediumRankingsHeader = ({
  activeTour,
  onTourChange,
}: {
  activeTour: "atp" | "wta";
  onTourChange: (tour: "atp" | "wta") => void;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <PIFLogo />
      <span className="text-xl font-semibold text-text-primary">Rankings</span>
    </div>
    <TourToggle activeTour={activeTour} onTourChange={onTourChange} />
  </div>
);

/**
 * Tour logo for expanded header (WTA only for now)
 */
const ExpandedTourLogo = ({ tour }: { tour: "atp" | "wta" }) => {
  const { theme } = useTheme();
  const logoColor = tour === "wta" ? "/images/WTA_Logo_Color.svg" : "/images/ATP_Logo_Color.svg";
  const logoWhite = tour === "wta" ? "/images/WTA_Logo_White.svg" : "/images/ATP_Logo_White.svg";
  
  return (
    <div className="relative h-4 w-9">
      <Image
        src={logoColor}
        alt={tour.toUpperCase()}
        fill
        className={cn(
          "object-contain transition-opacity duration-200",
          theme === "dark" ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        src={logoWhite}
        alt={tour.toUpperCase()}
        fill
        className={cn(
          "object-contain transition-opacity duration-200",
          theme === "dark" ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

/**
 * Header for expanded variant with PIF logo, tour logo, title, subtitle, and search icon
 */
const ExpandedRankingsHeader = ({
  tour,
  category,
  updatedDate,
  onSearchClick,
}: {
  tour: "atp" | "wta";
  category: RankingCategory;
  updatedDate?: string;
  onSearchClick?: () => void;
}) => {
  // Format category for display (e.g., "race-singles" -> "Singles Race")
  const getCategoryLabel = (cat: RankingCategory): string => {
    switch (cat) {
      case "singles":
        return "Singles";
      case "doubles":
        return "Doubles";
      case "race-singles":
        return "Race to the Finals";
      case "race-doubles":
        return "Doubles Race";
      default:
        return "Singles";
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PIFLogo />
          <span className="text-lg font-semibold text-text-primary">
            {tour.toUpperCase()} {getCategoryLabel(category)} Rankings
          </span>
        </div>
        {onSearchClick && (
          <button
            type="button"
            onClick={onSearchClick}
            className="p-2 rounded-full hover:bg-bg-tertiary transition-colors"
            aria-label="Search rankings"
          >
            <Search className="h-5 w-5 text-text-primary" />
          </button>
        )}
      </div>
      {updatedDate && (
        <p className="text-sm text-text-tertiary mt-1">Updated {updatedDate}</p>
      )}
    </div>
  );
};

/**
 * Ranking category tabs for expanded variant
 */
const rankingCategoryTabs: Tab[] = [
  { id: "singles", label: "Singles" },
  { id: "doubles", label: "Doubles" },
  { id: "race-singles", label: "Race Singles" },
  { id: "race-doubles", label: "Race Doubles" },
];

// ============================================
// AI ENHANCED VARIANT COMPONENTS
// ============================================

/**
 * PIF Logo for AI Enhanced header - uses mask technique for theme-aware coloring
 */
const AIEnhancedPIFLogo = () => (
  <div
    className="h-6 w-[62px] bg-text-primary transition-colors duration-200"
    style={{
      maskImage: "url(/images/PIF-logo.svg)",
      maskSize: "contain",
      maskRepeat: "no-repeat",
      maskPosition: "left center",
      WebkitMaskImage: "url(/images/PIF-logo.svg)",
      WebkitMaskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "left center",
    }}
    role="img"
    aria-label="PIF"
  />
);

/**
 * Header for AI Enhanced variant with PIF logo and title
 */
const AIEnhancedHeader = ({
  tour,
  category,
}: {
  tour: "atp" | "wta";
  category: RankingCategory;
}) => {
  const getCategoryLabel = (cat: RankingCategory): string => {
    switch (cat) {
      case "singles":
        return "Singles";
      case "doubles":
        return "Doubles";
      case "race-singles":
        return "Race";
      case "race-doubles":
        return "Doubles Race";
      default:
        return "Singles";
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <AIEnhancedPIFLogo />
      <span className="text-2xl font-semibold text-text-primary">
        {tour.toUpperCase()} {getCategoryLabel(category)} Rankings
      </span>
    </div>
  );
};

/**
 * AI Summary Card with gradient background and sparkle icon
 */
const AISummaryCard = ({ summary }: { summary: AISummary }) => (
  <div className="relative mb-4 rounded-2xl overflow-hidden bg-gradient-to-r from-accent-dark via-accent to-accent-light p-4">
    {/* Sparkle icon container */}
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-light/30 flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white mb-0.5">
          {summary.title}
        </h3>
        <p className="text-sm text-white/90 leading-relaxed">
          {summary.description}
        </p>
      </div>
    </div>
  </div>
);

/**
 * Top Mover Card showing player movement
 */
const TopMoverCard = ({ mover }: { mover: TopMover }) => {
  const { player, isUpward, positionsChanged, newRank } = mover;
  
  // Get initials for avatar fallback
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex-1 rounded-xl border-b-2 border-b-accent bg-bg-secondary p-3 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-2">
        {/* Avatar with flag */}
        <div className="relative">
          <Avatar size="sm">
            {player.avatarUrl ? (
              <AvatarImage src={player.avatarUrl} alt={player.name} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
          <AvatarFlagBadge countryCode={player.countryCode} size="sm" />
        </div>
        
        {/* Player name */}
        <span className="text-base font-semibold text-text-primary truncate">
          {player.name}
        </span>
      </div>
      
      {/* Movement indicator */}
      <div className="flex items-center gap-1.5">
        {isUpward ? (
          <TrendingUp className="h-4 w-4 text-success" />
        ) : (
          <TrendingDown className="h-4 w-4 text-error" />
        )}
        <span className="text-sm font-medium text-text-primary">
          {positionsChanged} to #{newRank}
        </span>
      </div>
    </div>
  );
};

/**
 * Top Movers Row showing two mover cards side by side
 */
const TopMoversRow = ({ movers }: { movers: TopMover[] }) => {
  if (!movers || movers.length === 0) return null;
  
  return (
    <div className="flex gap-3 mb-4">
      {movers.slice(0, 2).map((mover, index) => (
        <TopMoverCard key={`${mover.player.name}-${index}`} mover={mover} />
      ))}
    </div>
  );
};

/**
 * AI Enhanced ranking row with avatars and points
 */
const AIEnhancedRankingRow = ({
  player,
  position,
  isLast,
}: {
  player: RankedPlayer;
  position: number;
  isLast: boolean;
}) => {
  // Get initials from name for avatar fallback
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Format points with commas (e.g., 10990 -> "10,990")
  const formattedPoints = player.points?.toLocaleString() ?? "—";

  return (
    <div
      className={cn(
        "flex items-center py-4",
        !isLast && "border-b border-border-decorative"
      )}
    >
      {/* Rank number */}
      <span className="w-6 text-lg font-semibold text-text-primary">
        {position}
      </span>

      {/* Avatar with flag badge */}
      <div className="relative mx-3">
        <Avatar size="sm">
          {player.avatarUrl ? (
            <AvatarImage src={player.avatarUrl} alt={player.name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <AvatarFlagBadge countryCode={player.countryCode} size="sm" />
      </div>

      {/* Player name */}
      <span className="flex-1 text-base font-medium text-text-primary truncate">
        {player.name}
      </span>

      {/* Points */}
      <span className="text-base font-normal text-text-secondary">
        {formattedPoints}
      </span>
    </div>
  );
};

/**
 * Explain Changes Button for AI Enhanced variant
 */
const ExplainChangesButton = ({
  onClick,
}: {
  onClick?: () => void;
}) => (
  <Button
    variant="outline"
    action="secondary"
    size="sm"
    isFullWidth
    className="mt-4 rounded-xl h-[38px]"
    onClick={onClick}
    leftIcon={MessageCircle}
  >
    Explain this week&apos;s changes
  </Button>
);

/**
 * Expanded ranking row - same as medium but with slightly different styling
 */
const ExpandedRankingRow = ({
  player,
  position,
  isLast,
}: {
  player: RankedPlayer;
  position: number;
  isLast: boolean;
}) => {
  // Get initials from name for avatar fallback
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Format points with commas (e.g., 10990 -> "10,990")
  const formattedPoints = player.points?.toLocaleString() ?? "—";

  return (
    <div
      className={cn(
        "flex items-center py-4",
        !isLast && "border-b border-border-decorative"
      )}
    >
      {/* Rank number */}
      <span className="w-7 text-lg font-medium text-text-primary">
        {position}
      </span>

      {/* Avatar with flag badge */}
      <div className="relative mx-3">
        <Avatar size="sm">
          {player.avatarUrl ? (
            <AvatarImage src={player.avatarUrl} alt={player.name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <AvatarFlagBadge countryCode={player.countryCode} size="sm" />
      </div>

      {/* Player name */}
      <span className="flex-1 text-base font-medium text-text-primary truncate">
        {player.name}
      </span>

      {/* Points */}
      <span className="text-lg font-normal text-text-secondary">
        {formattedPoints}
      </span>
    </div>
  );
};

const RankingsModule = React.forwardRef<HTMLDivElement, RankingsModuleProps>(
  (
    {
      className,
      variant = "simple",
      atpPlayers,
      wtaPlayers,
      onFullRankingsClick,
      updatedDate,
      onSearchClick,
      defaultCategory = "singles",
      onCategoryChange,
      aiSummary,
      topMovers,
      onExplainChangesClick,
      tour = "atp",
      category = "singles",
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [activeTour, setActiveTour] = useState<"atp" | "wta">("wta");
    const [activeCategory, setActiveCategory] = useState<RankingCategory>(defaultCategory);

    // Simple variant: Display side-by-side rankings
    if (variant === "simple") {
      // Determine the number of rows to display (max of both arrays, up to 5)
      const rowCount = Math.min(
        Math.max(atpPlayers.length, wtaPlayers.length),
        5
      );
      const positions = Array.from({ length: rowCount }, (_, i) => i + 1);

      return (
        <div
          ref={ref}
          className={cn(
            rankingsModuleVariants({ variant }),
            "bg-bg-elevated",
            className
          )}
          role="region"
          aria-label="PIF Rankings"
          {...props}
        >
          {/* Header with title and link */}
          <RankingsHeader onFullRankingsClick={onFullRankingsClick} />

          {/* Tour logos */}
          <TourLogosRow theme={theme} />

          {/* Rankings list */}
          <div>
            {positions.map((position, index) => (
              <RankingRow
                key={position}
                position={position}
                atpPlayer={atpPlayers.find((p) => p.rank === position)}
                wtaPlayer={wtaPlayers.find((p) => p.rank === position)}
                isLast={index === positions.length - 1}
              />
            ))}
          </div>
        </div>
      );
    }

    // Expanded variant: Full rankings with tabs for categories
    if (variant === "expanded") {
      // For expanded, we use WTA players by default (as per the screenshot)
      const players = wtaPlayers;
      // Get top 3 players sorted by rank
      const topPlayers = [...players]
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 3);

      const handleCategoryChange = (tabId: string) => {
        const cat = tabId as RankingCategory;
        setActiveCategory(cat);
        onCategoryChange?.(cat);
      };

      return (
        <div
          ref={ref}
          className={cn(
            rankingsModuleVariants({ variant }),
            "bg-bg-elevated",
            className
          )}
          role="region"
          aria-label="PIF WTA Rankings"
          {...props}
        >
          {/* Header with PIF logo, WTA logo, title, and search icon */}
          <ExpandedRankingsHeader
            tour="wta"
            category={activeCategory}
            updatedDate={updatedDate}
            onSearchClick={onSearchClick}
          />

          {/* Category tabs */}
          <div className="mb-4 -mx-5">
            <Tabs
              tabs={rankingCategoryTabs}
              activeTab={activeCategory}
              onTabChange={handleCategoryChange}
              variant="underline"
              showScrollIndicators={false}
            />
          </div>

          {/* Rankings list with avatars */}
          <div>
            {topPlayers.map((player, index) => (
              <ExpandedRankingRow
                key={player.rank}
                player={player}
                position={player.rank}
                isLast={index === topPlayers.length - 1}
              />
            ))}
          </div>
        </div>
      );
    }

    // AI Enhanced variant: Rankings with AI insights, top movers, and explain button
    if (variant === "ai-enhanced") {
      // Use the specified tour's players
      const players = tour === "atp" ? atpPlayers : wtaPlayers;
      // Get top 3 players sorted by rank
      const rankedPlayers = [...players]
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 3);

      return (
        <div
          ref={ref}
          className={cn(
            rankingsModuleVariants({ variant }),
            "bg-bg-elevated",
            className
          )}
          role="region"
          aria-label={`PIF ${tour.toUpperCase()} ${category} Rankings`}
          {...props}
        >
          {/* Header with tennis ball logo and title */}
          <AIEnhancedHeader tour={tour} category={category} />

          {/* AI Summary Card */}
          {aiSummary && <AISummaryCard summary={aiSummary} />}

          {/* Top Movers */}
          {topMovers && topMovers.length > 0 && (
            <TopMoversRow movers={topMovers} />
          )}

          {/* Rankings list with avatars */}
          <div>
            {rankedPlayers.map((player, index) => (
              <AIEnhancedRankingRow
                key={player.rank}
                player={player}
                position={player.rank}
                isLast={index === rankedPlayers.length - 1}
              />
            ))}
          </div>

          {/* Explain Changes Button */}
          <ExplainChangesButton onClick={onExplainChangesClick} />
        </div>
      );
    }

    // Medium variant: Toggle between ATP/WTA with avatars and points
    const currentPlayers = activeTour === "atp" ? atpPlayers : wtaPlayers;
    // Get top 3 players sorted by rank
    const topPlayers = [...currentPlayers]
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 3);

    return (
      <div
        ref={ref}
        className={cn(
          rankingsModuleVariants({ variant }),
          "bg-bg-elevated",
          className
        )}
        role="region"
        aria-label="PIF Rankings"
        {...props}
      >
        {/* Header with PIF logo, title, and tour toggle */}
        <MediumRankingsHeader
          activeTour={activeTour}
          onTourChange={setActiveTour}
        />

        {/* Rankings list with avatars */}
        <div>
          {topPlayers.map((player, index) => (
            <MediumRankingRow
              key={player.rank}
              player={player}
              position={player.rank}
              isLast={index === topPlayers.length - 1}
            />
          ))}
        </div>

        {/* Footer link */}
        <MediumFooterLink onFullRankingsClick={onFullRankingsClick} />
      </div>
    );
  }
);

RankingsModule.displayName = "RankingsModule";

export { RankingsModule, rankingsModuleVariants };
