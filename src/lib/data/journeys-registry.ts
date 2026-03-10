/**
 * Journey Registry
 * 
 * Central registry for all journeys in the prototype.
 * Import journey configs from each journey folder and export them here.
 * 
 * To add a new journey:
 * 1. Create the journey folder at src/app/prototype/journeys/[journey-name]/
 * 2. Create the _journey.ts file with journey metadata
 * 3. Import and add it to the journeys array below
 */

import type { JourneyConfig } from '@/lib/types/journey';
import { journey as banking } from '@/app/prototype/journeys/banking/_journey';

/**
 * All registered journeys
 * Add new journey imports here
 */
export const journeys: JourneyConfig[] = [
  banking,
];

/**
 * Get a specific journey by ID
 */
export function getJourney(id: string): JourneyConfig | undefined {
  return journeys.find(j => j.id === id);
}

/**
 * Get all registered journeys
 */
export function getAllJourneys(): JourneyConfig[] {
  return journeys;
}

/**
 * Get all journey IDs
 */
export function getAllJourneyIds(): string[] {
  return journeys.map(j => j.id);
}

/**
 * Get journeys filtered by status
 */
export function getJourneysByStatus(status: JourneyConfig['status']): JourneyConfig[] {
  return journeys.filter(j => j.status === status);
}
