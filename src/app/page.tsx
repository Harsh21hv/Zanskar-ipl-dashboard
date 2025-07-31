'use client';

import { useState, useMemo, useEffect } from 'react';
import { useIplData } from '@/utils/hooks/useIplData';
import { calculatePointsTable } from '@/utils/calculatePointsTable';
import MatchCarousel from '@/components/MatchCarousel';
import LiveMatch from '@/components/LiveMatch';
import PointsTable from '@/components/PointsTable';
import DashboardTabs from '@/components/DashboardTabs'; // <-- CORRECTED IMPORT PATH

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('Matches');
  const { data, loading, error } = useIplData();
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const liveDurationInMs = 3 * 60 * 1000;

  const { upcomingMatches, liveMatches, completedMatches, pointsTableData } =
    useMemo(() => {
      if (!data?.matches) {
        return {
          upcomingMatches: [],
          liveMatches: [],
          completedMatches: [],
          pointsTableData: [],
        };
      }
      const now = new Date(currentTime);
      const upcoming = [];
      const live = [];
      const completed = [];

      for (const match of data.matches) {
        const matchStart = new Date(`${match.MatchDate}T${match.MatchTime}:00`);
        const liveWindowEnd = new Date(matchStart.getTime() + liveDurationInMs);
        if (now >= matchStart && now <= liveWindowEnd) live.push(match);
        else if (now > liveWindowEnd) completed.push(match);
        else upcoming.push(match);
      }

      upcoming.sort(
        (a, b) =>
          new Date(`${a.MatchDate}T${a.MatchTime}:00`).getTime() -
          new Date(`${b.MatchDate}T${b.MatchTime}:00`).getTime()
      );
      completed.sort(
        (a, b) =>
          new Date(`${b.MatchDate}T${b.MatchTime}:00`).getTime() -
          new Date(`${a.MatchDate}T${a.MatchTime}:00`).getTime()
      );
      const pointsTable = calculatePointsTable(completed);
      return {
        upcomingMatches: upcoming,
        liveMatches: live,
        completedMatches: completed,
        pointsTableData: pointsTable,
      };
    }, [data, currentTime, liveDurationInMs]);

  useEffect(() => {
    let nextEventTime = Infinity;
    if (upcomingMatches.length > 0)
      nextEventTime = Math.min(
        nextEventTime,
        new Date(
          `${upcomingMatches[0].MatchDate}T${upcomingMatches[0].MatchTime}:00`
        ).getTime()
      );
    if (liveMatches.length > 0) {
      const nextEndTime = Math.min(
        ...liveMatches.map(
          (match: any) =>
            new Date(`${match.MatchDate}T${match.MatchTime}:00`).getTime() +
            liveDurationInMs
        )
      );
      nextEventTime = Math.min(nextEventTime, nextEndTime);
    }
    if (nextEventTime !== Infinity) {
      const timeUntilNextEvent = nextEventTime - Date.now();
      if (timeUntilNextEvent > 0) {
        const timerId = setTimeout(
          () => setCurrentTime(Date.now()),
          timeUntilNextEvent + 1000
        );
        return () => clearTimeout(timerId);
      }
    }
  }, [upcomingMatches, liveMatches, liveDurationInMs]);

  if (loading) return <p className='p-4 text-center'>Loading Dashboard...</p>;
  if (error)
    return (
      <p className='p-4 text-center text-red-500'>Error: {error.message}</p>
    );

  return (
    <>
      <DashboardTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        upcomingCount={upcomingMatches.length}
      />
      <div className='mt-6'>
        {activeTab === 'Matches' && (
          <MatchCarousel
            title='Upcoming Matches'
            matches={upcomingMatches}
            status='upcoming'
          />
        )}
        {activeTab === 'Live' && <LiveMatch matches={liveMatches} nextUpcomingMatch={upcomingMatches[0]} />}
        {activeTab === 'Results' && (
          <MatchCarousel
            title='Match Results'
            matches={completedMatches}
            status='completed'
          />
        )}
      </div>
      <PointsTable data={pointsTableData} />
    </>
  );
}
