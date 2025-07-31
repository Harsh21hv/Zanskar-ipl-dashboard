import { useState, useEffect } from 'react';

// Define interfaces for the data structure from your API
interface Point {
  TeamID: number;
  TeamCode: string;
  TeamLogo: string;
  Matches: number;
  Wins: number;
  Loss: number;
  NoResult: number;
  Points: number;
  NetRunRate: string;
  OrderNo: number;
  Status: string;
}

interface Match {
  MatchTime: any;
  MatchID: number;
  MatchStatus: string;
  MatchDate: string;
  GMTMatchDate: string;
  FirstBattingTeamName: string;
  SecondBattingTeamName: string;
  GroundName: string;
  Commentss: string;
  TossDetails: string;
  FirstBattingSummary: any;
  SecondBattingSummary: any;
  // Add other match properties as needed
}

interface IplData {
  points: Point[];
  matches: Match[];
}

export const useIplData = () => {
  const [data, setData] = useState<IplData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/scrape');
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return { data, loading, error };
};