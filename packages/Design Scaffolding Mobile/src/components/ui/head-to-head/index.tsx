"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFlagBadge } from "../avatar";
import { Sparkles, MessageCircle } from "lucide-react";

/**
 * HeadToHead - Tennis player head-to-head comparison component
 *
 * Displays two players facing off with their avatars, country flags, and H2H score.
 * Supports five variants:
 * - Simple: avatars + score only
 * - Simple Plus: avatars + names/rankings + score
 * - Medium: Simple Plus + "Overall" label + surface stats + last match
 * - Expanded: Large vertical layout with surface breakdown rows
 * - AI Enhanced: Simple Plus + AI rivalry analysis + follow-up question
 */

const headToHeadVariants = cva(
  "rounded-2xl transition-colors",
  {
    variants: {
      variant: {
        simple: "px-4 py-3",
        simplePlus: "px-4 py-3",
        medium: "px-4 pt-4 pb-1",
        expanded: "px-6 pt-5 pb-2.5",
        aiEnhanced: "px-4 pt-4 pb-4",
      },
    },
    defaultVariants: {
      variant: "simple",
    },
  }
);

export interface PlayerData {
  name: string;
  imageUrl: string;
  countryCode: string;
  ranking?: number;
}

export interface SurfaceStats {
  hard: string;
  clay: string;
  grass: string;
}

export interface ExpandedSurfaceStats {
  hard: { player1: number; player2: number };
  clay: { player1: number; player2: number };
  grass: { player1: number; player2: number };
}

export interface LastMatch {
  winner: "player1" | "player2";
  score: string;
  tournament: string;
}

export interface AIAnalysis {
  title: string;
  content: string;
}

export interface AIFollowUp {
  question: string;
}

export interface HeadToHeadProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headToHeadVariants> {
  player1: PlayerData;
  player2: PlayerData;
  score: { player1: number; player2: number };
  showNames?: boolean;
  surfaceStats?: SurfaceStats;
  lastMatch?: LastMatch;
  expandedSurfaceStats?: ExpandedSurfaceStats;
  aiAnalysis?: AIAnalysis;
  aiFollowUp?: AIFollowUp;
  onAskFollowUp?: (question: string) => void;
}

const TennisBallIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 57.84 57.83"
    className={cn("h-2.5 w-2.5", className)}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M31.57,49.98c-2.98,0-5.64-1.14-7.9-3.39-2.35-2.35-3.02-4.99-3.87-8.33-.05-.21-.11-.42-.16-.64-.34-1.34-.78-2.93-1.44-4.55-1.13-2.78-2.72-5.17-4.87-7.31-2.72-2.74-5.73-4.19-8.7-4.19-.28,0-.56.01-.83.04-1.01.09-2.03.35-3.03.77,1.22-5.29,3.87-10.09,7.7-13.93C12.56,4.34,17.73,1.61,23.42.52c-.34.94-.61,1.82-.81,2.68-.76,3.24-.91,7.88,2.73,11.51,2.96,2.96,6.13,3.57,9.2,4.15.29.05.57.11.85.16,3,.6,5.75,1.32,8.91,4.03.44.38.85.75,1.26,1.16,2.73,2.75,3.8,6.14,3.17,10.08-.57,3.54-2.6,7.27-5.57,10.23-3.53,3.47-7.76,5.46-11.6,5.46h0ZM28.92,57.83h0c-7.72,0-14.99-3.01-20.46-8.46-3.69-3.7-6.31-8.33-7.58-13.39C.09,32.81-.17,29.58.11,26.36c1.55-1.13,3.02-1.67,4.49-1.67,2.08,0,4.21,1.08,6.51,3.3,1.84,1.85,3.14,3.77,4.09,6.05.63,1.51,1.05,3.05,1.4,4.38.07.28.14.56.22.85.83,3.24,1.68,6.59,4.64,9.56,2.8,2.82,6.3,4.32,10.12,4.32.77,0,1.55-.06,2.32-.18,4.03-.63,8.12-2.83,11.5-6.2,6.67-6.69,9.66-17.31,2.48-24.66l-.03-.03s-.04-.04-.05-.06c-4.08-4.11-8.08-5.34-11.79-6.05-.28-.05-.55-.11-.82-.16-2.98-.57-5.33-1.02-7.61-3.3-2.09-2.09-2.71-4.9-1.89-8.59.27-1.19.71-2.48,1.32-3.83.64-.04,1.29-.06,1.94-.06,7.73,0,14.99,3,20.45,8.44,3.61,3.62,6.21,8.15,7.5,13.09,1.26,4.81,1.27,9.89.02,14.7-1.29,4.95-3.89,9.5-7.52,13.15-5.48,5.45-12.74,8.46-20.46,8.46h0Z"
    />
  </svg>
);

const PlayerAvatar = ({
  player,
  size = "lg",
}: {
  player: PlayerData;
  size?: "md" | "lg" | "xl";
}) => (
  <Avatar size={size}>
    <AvatarImage src={player.imageUrl} alt={player.name} />
    <AvatarFlagBadge countryCode={player.countryCode} />
  </Avatar>
);

const ScoreDisplay = ({
  score,
  showNames,
  showOverallLabel,
}: {
  score: { player1: number; player2: number };
  showNames?: boolean;
  showOverallLabel?: boolean;
}) => (
  <div className="flex flex-col items-center w-28">
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "font-semibold text-text-primary",
          showNames ? "text-3xl" : "text-2xl"
        )}
      >
        {score.player1}
      </span>
      <TennisBallIcon className="text-warning-light" />
      <span
        className={cn(
          "font-semibold text-text-primary",
          showNames ? "text-3xl" : "text-2xl"
        )}
      >
        {score.player2}
      </span>
    </div>
    {showOverallLabel && (
      <span className="text-sm text-text-tertiary mt-0.5">Overall</span>
    )}
  </div>
);

const PlayerSectionLeft = ({ player }: { player: PlayerData }) => (
  <div className="flex items-center gap-3">
    <PlayerAvatar player={player} size="lg" />
    <div className="flex items-baseline gap-2">
      <span className="text-base font-semibold text-text-primary">
        {player.name}
      </span>
      {player.ranking && (
        <span className="text-sm text-text-tertiary">{player.ranking}</span>
      )}
    </div>
  </div>
);

const PlayerSectionRight = ({ player }: { player: PlayerData }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-baseline gap-2">
      {player.ranking && (
        <span className="text-sm text-text-tertiary">{player.ranking}</span>
      )}
      <span className="text-base font-semibold text-text-primary">
        {player.name}
      </span>
    </div>
    <PlayerAvatar player={player} size="lg" />
  </div>
);

const SurfaceStatsRow = ({ stats }: { stats: SurfaceStats }) => (
  <div className="flex items-center justify-between px-2 py-3">
    <span className="text-sm text-text-secondary">
      Hard: <span className="text-text-primary font-medium">{stats.hard}</span>
    </span>
    <span className="text-sm text-text-secondary">
      Clay: <span className="text-text-primary font-medium">{stats.clay}</span>
    </span>
    <span className="text-sm text-text-secondary">
      Grass: <span className="text-text-primary font-medium">{stats.grass}</span>
    </span>
  </div>
);

const ExpandedPlayerSectionLeft = ({ player }: { player: PlayerData }) => (
  <div className="flex flex-col items-center w-28">
    <Avatar size="xl">
      <AvatarImage src={player.imageUrl} alt={player.name} />
      <AvatarFlagBadge countryCode={player.countryCode} />
    </Avatar>
    <div className="flex items-center gap-1.5 mt-3">
      <span className="text-lg font-semibold text-text-primary">
        {player.name}
      </span>
      {player.ranking && (
        <span className="text-base text-text-tertiary">{player.ranking}</span>
      )}
    </div>
  </div>
);

const ExpandedPlayerSectionRight = ({ player }: { player: PlayerData }) => (
  <div className="flex flex-col items-center w-28">
    <Avatar size="xl">
      <AvatarImage src={player.imageUrl} alt={player.name} />
      <AvatarFlagBadge countryCode={player.countryCode} />
    </Avatar>
    <div className="flex items-center gap-1.5 mt-3">
      <span className="text-lg font-semibold text-text-primary">
        {player.name}
      </span>
      {player.ranking && (
        <span className="text-base text-text-tertiary">{player.ranking}</span>
      )}
    </div>
  </div>
);

const ExpandedScoreDisplay = ({
  score,
}: {
  score: { player1: number; player2: number };
}) => (
  <div className="flex items-center gap-3">
    <span className="text-4xl font-semibold text-text-primary">
      {score.player1}
    </span>
    <TennisBallIcon className="text-warning-light h-4 w-4" />
    <span className="text-4xl font-semibold text-text-primary">
      {score.player2}
    </span>
  </div>
);

const ExpandedSurfaceRow = ({
  surfaceName,
  player1Score,
  player2Score,
  isFirst,
}: {
  surfaceName: string;
  player1Score: number;
  player2Score: number;
  isFirst?: boolean;
}) => (
  <div className={cn(
    "flex items-center justify-between py-2",
    !isFirst && "border-t border-border-decorative"
  )}>
    <span className="text-base font-medium text-text-primary w-28 text-center">
      {player1Score}
    </span>
    <span className="text-sm text-text-secondary">
      {surfaceName}
    </span>
    <span className="text-base font-medium text-text-primary w-28 text-center">
      {player2Score}
    </span>
  </div>
);

const ExpandedSurfaceStatsSection = ({ stats }: { stats: ExpandedSurfaceStats }) => (
  <div className="mt-4 border-t border-border-decorative">
    <ExpandedSurfaceRow 
      surfaceName="Hard" 
      player1Score={stats.hard.player1} 
      player2Score={stats.hard.player2}
      isFirst
    />
    <ExpandedSurfaceRow 
      surfaceName="Clay" 
      player1Score={stats.clay.player1} 
      player2Score={stats.clay.player2}
    />
    <ExpandedSurfaceRow 
      surfaceName="Grass" 
      player1Score={stats.grass.player1} 
      player2Score={stats.grass.player2}
    />
  </div>
);

const LastMatchRow = ({
  lastMatch,
  player1,
  player2,
}: {
  lastMatch: LastMatch;
  player1: PlayerData;
  player2: PlayerData;
}) => {
  const winnerName = lastMatch.winner === "player1" ? player1.name : player2.name;
  
  return (
    <div className="flex items-center justify-center gap-3 px-2 py-3 border-t border-border-decorative">
      <span className="text-xs font-semibold text-accent">
        LAST
      </span>
      <div className="h-4 w-px bg-border-decorative" />
      <span className="text-sm text-text-secondary">
        <span className="text-text-primary font-medium">{winnerName} won {lastMatch.score}</span>
        {" · "}
        {lastMatch.tournament}
      </span>
    </div>
  );
};

const AIAnalysisCard = ({ analysis }: { analysis: AIAnalysis }) => (
  <div className="mt-4 relative overflow-hidden">
    <div className="flex gap-3 bg-bg-secondary rounded-xl p-4 border-l-4 border-accent">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-text-primary mb-1">
          {analysis.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {analysis.content}
        </p>
      </div>
    </div>
  </div>
);

const AIFollowUpButton = ({
  followUp,
  onClick,
}: {
  followUp: AIFollowUp;
  onClick?: (question: string) => void;
}) => (
  <button
    type="button"
    onClick={() => onClick?.(followUp.question)}
    className={cn(
      "mt-3 w-full flex items-center justify-center gap-2.5 px-4 py-3",
      "bg-bg-secondary hover:bg-bg-tertiary",
      "border border-border-decorative hover:border-border-subtle",
      "rounded-xl transition-all duration-200",
      "group cursor-pointer"
    )}
  >
    <MessageCircle className="h-4 w-4 text-text-tertiary group-hover:text-text-secondary transition-colors" />
    <span className="text-sm font-medium text-text-primary">
      {followUp.question}
    </span>
  </button>
);

const HeadToHead = React.forwardRef<HTMLDivElement, HeadToHeadProps>(
  (
    { 
      className, 
      player1, 
      player2, 
      score, 
      showNames = false, 
      surfaceStats,
      lastMatch,
      expandedSurfaceStats,
      aiAnalysis,
      aiFollowUp,
      onAskFollowUp,
      ...props 
    },
    ref
  ) => {
    const isAIEnhanced = aiAnalysis !== undefined;
    const isExpanded = expandedSurfaceStats !== undefined && !isAIEnhanced;
    const isMedium = surfaceStats !== undefined && !isExpanded && !isAIEnhanced;
    const variant = isAIEnhanced
      ? "aiEnhanced"
      : isExpanded 
        ? "expanded" 
        : isMedium 
          ? "medium" 
          : showNames 
            ? "simplePlus" 
            : "simple";

    if (isExpanded) {
      return (
        <div
          ref={ref}
          className={cn(
            headToHeadVariants({ variant: "expanded" }),
            "bg-bg-elevated",
            className
          )}
          role="region"
          aria-label={`Head to head: ${player1.name} ${score.player1} - ${score.player2} ${player2.name}`}
          {...props}
        >
          <div className="flex items-start justify-between">
            <ExpandedPlayerSectionLeft player={player1} />
            <div className="flex flex-col items-center pt-4">
              <ExpandedScoreDisplay score={score} />
            </div>
            <ExpandedPlayerSectionRight player={player2} />
          </div>
          <ExpandedSurfaceStatsSection stats={expandedSurfaceStats} />
        </div>
      );
    }

    if (isAIEnhanced) {
      return (
        <div
          ref={ref}
          className={cn(
            headToHeadVariants({ variant: "aiEnhanced" }),
            "bg-bg-elevated",
            className
          )}
          role="region"
          aria-label={`AI-enhanced head to head: ${player1.name} ${score.player1} - ${score.player2} ${player2.name}`}
          {...props}
        >
          {/* Main content row with players and score - vertical layout */}
          <div className="flex items-start justify-between">
            <ExpandedPlayerSectionLeft player={player1} />
            <div className="flex flex-col items-center pt-4">
              <ExpandedScoreDisplay score={score} />
            </div>
            <ExpandedPlayerSectionRight player={player2} />
          </div>
          <AIAnalysisCard analysis={aiAnalysis} />
          {aiFollowUp && (
            <AIFollowUpButton followUp={aiFollowUp} onClick={onAskFollowUp} />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          headToHeadVariants({ variant }),
          "bg-bg-elevated",
          className
        )}
        role="region"
        aria-label={`Head to head: ${player1.name} ${score.player1} - ${score.player2} ${player2.name}`}
        {...props}
      >
        <div className={cn(
          "flex items-center justify-between",
          variant === "simple" && "gap-4",
          variant === "simplePlus" && "gap-6",
          variant === "medium" && "gap-6"
        )}>
          {showNames || isMedium ? (
            <>
              <PlayerSectionLeft player={player1} />
              <ScoreDisplay score={score} showNames showOverallLabel={isMedium} />
              <PlayerSectionRight player={player2} />
            </>
          ) : (
            <>
              <PlayerAvatar player={player1} size="lg" />
              <ScoreDisplay score={score} />
              <PlayerAvatar player={player2} size="lg" />
            </>
          )}
        </div>
        {surfaceStats && <SurfaceStatsRow stats={surfaceStats} />}
        {lastMatch && (
          <LastMatchRow 
            lastMatch={lastMatch} 
            player1={player1} 
            player2={player2} 
          />
        )}
      </div>
    );
  }
);

HeadToHead.displayName = "HeadToHead";

export { HeadToHead, headToHeadVariants, TennisBallIcon };
