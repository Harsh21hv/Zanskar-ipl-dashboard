'use client';

import { useIplStore } from '@/stores/iplStore';
import LiveMatch from '@/components/LiveMatch';
import MatchCarousel from '@/components/MatchCarousel';
import { useMemo, useEffect } from 'react';
import {type Match } from '@/types/Match';

export default function LiveScoresPage() {
  // Get data and fetchData function
  const { data, loading, fetchData } = useIplStore();

  // Initialize data if not already loaded
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { liveMatches, upcomingMatches } = useMemo<{
    liveMatches: Match[];
    upcomingMatches: Match[];
  }>(() => {
    if (!data?.matches) return { liveMatches: [], upcomingMatches: [] };
    const now = new Date();
    const live = data.matches.filter((m) => {
      const start = new Date(`${m.MatchDate}T${m.MatchTime}:00`);
      const end = new Date(start.getTime() + 10 * 60 * 1000);
      return now >= start && now <= end;
    });
    const upcoming = data.matches
      .filter((m) => new Date(`${m.MatchDate}T${m.MatchTime}:00`) > now)
      .sort(
        (a, b) =>
          new Date(`${a.MatchDate}T${a.MatchTime}:00`).getTime() -
          new Date(`${b.MatchDate}T${b.MatchTime}:00`).getTime()
      );
    return { liveMatches: live, upcomingMatches: upcoming };
  }, [data]);

  if (loading) return <p className='text-center'>Loading Live Matches...</p>;

  if (liveMatches.length > 0) {
    return <LiveMatch matches={liveMatches} />;
  }

  return (
    <div>
      <p className='text-center text-gray-500 py-8'>
        No matches are live. Here are the upcoming matches.
      </p>
      <MatchCarousel
        title='Upcoming Matches'
        matches={upcomingMatches}
        status='upcoming'
        layout='responsive'
      />
    </div>
  );
}
