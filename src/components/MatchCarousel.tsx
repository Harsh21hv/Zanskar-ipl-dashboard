// components/MatchCarousel.tsx
'use client';

import MatchCard from './MatchCard';
import type { Match } from '@/types/Match';

interface MatchCarouselProps {
  title: string;
  matches: Match[];
  status: 'upcoming' | 'completed';
  layout?: 'horizontal' | 'responsive';
}

export default function MatchCarousel({
  title,
  matches,
  status,
  layout = 'horizontal',
}: MatchCarouselProps) {
  if (!matches || matches.length === 0) {
    return null;
  }

  const containerClasses =
    layout === 'responsive'
      ? 'space-y-4 md:flex md:space-x-4 md:space-y-0 md:overflow-x-auto md:pb-4 md:hide-scrollbar'
      : 'flex overflow-x-auto space-x-4 pb-4 hide-scrollbar';

  return (
    <div className='my-8'>
      <h2 className='text-lg  mb-4 text-gray-800'>{title}</h2>
      {/* Add the 'hide-scrollbar' class to this div */}
      <div className={containerClasses}>
        {matches.map((match) => (
          <MatchCard key={match.MatchID} match={match} status={status} />
        ))}
      </div>
    </div>
  );
}
