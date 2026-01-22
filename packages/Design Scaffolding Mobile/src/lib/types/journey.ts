/**
 * Journey Type Definitions
 * 
 * These types define the structure for journeys and their pages
 * in the interactive prototyping environment.
 */

/**
 * Represents a single page within a journey
 */
export interface JourneyPage {
  /** Unique identifier for the page (e.g., 'login', 'dashboard') */
  id: string;
  /** Display name for the page (e.g., 'Login Page', 'User Dashboard') */
  name: string;
  /** Full URL path to the page (e.g., '/prototype/journeys/onboarding/login') */
  path: string;
  /** Optional description of what this page does */
  description?: string;
  /** Optional custom height for the iframe in pixels (defaults to 812px mobile height) */
  height?: number;
}

/**
 * Configuration for a journey (collection of related pages)
 */
export interface JourneyConfig {
  /** Unique identifier for the journey (e.g., 'onboarding', 'match-discovery') */
  id: string;
  /** Display title for the journey (e.g., 'Onboarding Flow') */
  title: string;
  /** Description of what this journey covers */
  description: string;
  /** Current status of the journey */
  status: 'in-progress' | 'draft' | 'completed';
  /** List of pages in this journey */
  pages: JourneyPage[];
}

/**
 * Type for the journey metadata file export
 * Each journey folder contains a _journey.ts file that exports this
 */
export type JourneyMetadata = JourneyConfig;
