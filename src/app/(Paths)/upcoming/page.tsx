'use client';

import { useIplStore } from '@/stores/iplStore';
import MatchCarousel from '@/components/MatchCarousel';
import { useMemo, useEffect } from 'react';

export default function UpcomingPage() {
  // Get data and fetchData function
  const { data, loading, fetchData } = useIplStore();
  
  // Initialize data if not already loaded
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const upcomingMatches = useMemo(() => {
    if (!data?.matches) return [];
    return data.matches.filter(m => new Date(`${m.MatchDate}T${m.MatchTime}:00`) > new Date())
      .sort((a, b) => new Date(`${a.MatchDate}T${a.MatchTime}:00`).getTime() - new Date(`${b.MatchDate}T${b.MatchTime}:00`).getTime());
  }, [data]);

  if (loading) return <p className="text-center">Loading Upcoming Matches...</p>;
  return <MatchCarousel title="All Upcoming Matches" matches={upcomingMatches} status="upcoming" layout="responsive" />;
}