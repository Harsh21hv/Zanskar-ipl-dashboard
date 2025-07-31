import type { Match } from '@/types/Match';

interface MatchCardProps {
  match: Match;
  status?: 'upcoming' | 'live' | 'completed';
}

export default function MatchCard({ match, status = 'upcoming' }: MatchCardProps) {
  const matchDateTime = new Date(`${match.MatchDate}T${match.MatchTime}:00`);
  const isSpecialCase = match.Commentss?.includes('Abandoned') || match.Commentss?.includes('No Result');

  return (
    <div className="min-w-[300px] md:min-w-[340px] snap-start bg-white shadow-md rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-800">{match.FirstBattingTeamName}</span>
        <span className="text-xs font-bold text-red-500 px-2">vs</span>
        <span className="text-sm font-semibold text-gray-800">{match.SecondBattingTeamName}</span>
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <p>📍 {match.GroundName}</p>
        <p>📅 {matchDateTime.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        {status === 'upcoming' && (
          <p>⏰ {matchDateTime.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
        )}
      </div>

      {/* Show Toss details for Live matches */}
      {status === 'live' && match.TossDetails && match.TossDetails !== 'TBD' && (
        <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs font-semibold text-green-800 bg-green-50 p-2 rounded text-center">
              {match.TossDetails}
            </p>
        </div>
      )}

      {/* Show full results for Completed matches */}
      {status === 'completed' && match.Commentss && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          {isSpecialCase ? (
            <p className="text-xs font-bold text-yellow-800 bg-yellow-100 p-2 rounded text-center">
              {match.Commentss}
            </p>
          ) : (
            <>
              {match.TossDetails && match.TossDetails !== 'TBD' && (
                 <p className="text-xs font-semibold text-green-800 bg-green-50 p-2 rounded text-center mb-3">
                    {match.TossDetails}
                 </p>
              )}
              <div className="grid grid-cols-2 gap-2 text-center mb-3">
                <div>
                  <p className="text-xs text-gray-500">{match.FirstBattingTeamName}</p>
                  <p className="font-bold text-sm text-gray-800">{match.FirstBattingSummary}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{match.SecondBattingTeamName}</p>
                  <p className="font-bold text-sm text-gray-800">{match.SecondBattingSummary}</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-blue-700 bg-blue-50 p-2 rounded text-center">
                {match.Commentss}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}