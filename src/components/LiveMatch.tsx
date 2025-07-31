import MatchCard from './MatchCard';

import { Match } from '@/types/Match';

interface LiveMatchProps {
  matches: Match[];
  nextUpcomingMatch?: Match; // Optional prop to show next upcoming match details
}

export default function LiveMatch({
  matches,
  nextUpcomingMatch,
}: LiveMatchProps) {
  const matchDateTime = new Date(
    `${nextUpcomingMatch?.MatchDate}T${nextUpcomingMatch?.MatchTime}:00`
  );
  return (
    <div>
      <h2 className='text-lg  mb-4 text-gray-800'>Live Now</h2>
      {matches.length > 0 ? (
        <div className='space-y-4'>
          {matches.map((match) => (
            <div
              key={match.MatchID}
              className='border-2 border-red-500 rounded-lg p-1 animate-pulse'
            >
              <MatchCard match={match} status='live' />
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500 py-8'>
          There are no live matches right now. The next upcoming Match is on{' '}
          <span className='font-bold '>
            {matchDateTime.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
          </span>
          at{' '}
          <span className='font-bold'>
            {matchDateTime.toLocaleString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </span>
        </p>
      )}
    </div>
  );
}
