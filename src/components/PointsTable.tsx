'use client';

interface TeamStats {
  name: string;
  played: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  nrr: number; 
}

interface PointsTableProps {
  data: TeamStats[];
}

export default function PointsTable({ data }: PointsTableProps) {
  if (!data || data.length === 0) {
    return null;
  }

  // Helper to format NRR with a '+' sign for positive values
  const formatNrr = (nrr: number) => {
    const fixedNrr = nrr.toFixed(3);
    return nrr > 0 ? `+${fixedNrr}` : fixedNrr;
  };

  return (
    <div className="mt-5">
      <h2 className="text-lg  mb-4 text-gray-800 ">Points Table</h2>
      <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="py-3 px-2 md:px-6 text-center">POS</th>
              <th scope="col" className="py-3 px-4 md:px-6">Team</th>
              <th scope="col" className="py-3 px-2 text-center">P</th>
              <th scope="col" className="py-3 px-2 text-center">W</th>
              <th scope="col" className="py-3 px-2 text-center">L</th>
              <th scope="col" className="py-3 px-2 text-center">NR</th>
              <th scope="col" className="py-3 px-2 text-center">NRR</th>
              <th scope="col" className="py-3 px-2 text-center font-bold">PTS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((team, index) => (
              <tr key={team.name} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600/50">
                <td className="py-4 px-2 md:px-6 text-center font-medium text-gray-900 dark:text-white">{index + 1}</td>
                <th scope="row" className="py-4 px-4 md:px-6 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  {team.name}
                </th>
                <td className="py-4 px-2 text-center">{team.played}</td>
                <td className="py-4 px-2 text-center">{team.won}</td>
                <td className="py-4 px-2 text-center">{team.lost}</td>
                <td className="py-4 px-2 text-center">{team.noResult}</td>
                <td className="py-4 px-2 text-center">{formatNrr(team.nrr)}</td>
                <td className="py-4 px-2 text-center font-bold text-gray-900 dark:text-white">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">P: Played, W: Won, L: Lost, NR: No Result, NRR: Net Run Rate, Pts: Points</p>
    </div>
  );
}