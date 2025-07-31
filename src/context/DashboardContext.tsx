'use client';

import { createContext, useContext } from 'react';

// Define the shape of your data
interface TeamStats {
  name: string;
  played: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  nrr: number;
}

interface MatchData {
  [key: string]: any; 
}

interface DashboardContextType {
  upcomingMatches: MatchData[];
  liveMatches: MatchData[];
  completedMatches: MatchData[];
  pointsTableData: TeamStats[];
  loading: boolean;
  error: Error | null;
}

// Create the context with a default value
export const DashboardContext = createContext<DashboardContextType>({
  upcomingMatches: [],
  liveMatches: [],
  completedMatches: [],
  pointsTableData: [],
  loading: true,
  error: null,
});

// Create a custom hook for easy consumption of the context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};