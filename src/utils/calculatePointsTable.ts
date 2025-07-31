interface Match {
  FirstBattingTeamName: string;
  SecondBattingTeamName: string;
  Commentss?: string;
  FirstBattingSummary?: string;
  SecondBattingSummary?: string;
}

interface TeamStats {
  name: string;
  played: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  runsFor: number;
  oversFor: number;
  runsAgainst: number;
  oversAgainst: number;
  nrr: number;
}

// Helper function to parse strings like "116/10 (16.2 Ov)"
function parseSummary(summary: string | undefined) {
  if (!summary) return { runs: 0, wickets: 0, overs: 0 };

  const runsWicketsMatch = summary.match(/(\d+)\/(\d+)/);
  const oversMatch = summary.match(/\((\d+\.\d+)/);

  const runs = runsWicketsMatch ? parseInt(runsWicketsMatch[1], 10) : 0;
  const wickets = runsWicketsMatch ? parseInt(runsWicketsMatch[2], 10) : 0;
  
  let overs = 0;
  if (oversMatch) {
    const [whole, decimal] = oversMatch[1].split('.').map(Number);
    overs = whole + (decimal / 6);
  }

  // If a team is all out, they are considered to have faced the full 20 overs for NRR calculation
  if (wickets === 10) {
    overs = 20;
  }

  return { runs, wickets, overs };
}


export function calculatePointsTable(matches: Match[]): TeamStats[] {
  const teamStats: { [key: string]: TeamStats } = {};

  const ensureTeam = (teamName: string) => {
    if (!teamStats[teamName]) {
      teamStats[teamName] = { 
        name: teamName, played: 0, won: 0, lost: 0, noResult: 0, points: 0,
        runsFor: 0, oversFor: 0, runsAgainst: 0, oversAgainst: 0, nrr: 0
      };
    }
  };

  for (const match of matches) {
    const team1Name = match.FirstBattingTeamName;
    const team2Name = match.SecondBattingTeamName;
    const comment = match.Commentss || '';

    // Skip matches with no result for NRR calculation, but count them for points
    if (comment.includes('Abandoned') || comment.includes('No Result')) {
      ensureTeam(team1Name);
      ensureTeam(team2Name);
      teamStats[team1Name].played += 1;
      teamStats[team2Name].played += 1;
      teamStats[team1Name].noResult += 1;
      teamStats[team2Name].noResult += 1;
      teamStats[team1Name].points += 1;
      teamStats[team2Name].points += 1;
      continue; // Go to the next match
    }

    const team1Summary = parseSummary(match.FirstBattingSummary);
    const team2Summary = parseSummary(match.SecondBattingSummary);

    // If summaries are invalid, we can't calculate NRR, so skip
    if (team1Summary.overs === 0 || team2Summary.overs === 0) continue;

    ensureTeam(team1Name);
    ensureTeam(team2Name);

    // Update played count
    teamStats[team1Name].played += 1;
    teamStats[team2Name].played += 1;

    // Update runs and overs
    teamStats[team1Name].runsFor += team1Summary.runs;
    teamStats[team1Name].oversFor += team1Summary.overs;
    teamStats[team1Name].runsAgainst += team2Summary.runs;
    teamStats[team1Name].oversAgainst += team2Summary.overs;

    teamStats[team2Name].runsFor += team2Summary.runs;
    teamStats[team2Name].oversFor += team2Summary.overs;
    teamStats[team2Name].runsAgainst += team1Summary.runs;
    teamStats[team2Name].oversAgainst += team1Summary.overs;

    // Update Win/Loss and Points
    if (comment.includes(team1Name)) { // Team 1 won
      teamStats[team1Name].won += 1;
      teamStats[team1Name].points += 2;
      teamStats[team2Name].lost += 1;
    } else if (comment.includes(team2Name)) { // Team 2 won
      teamStats[team2Name].won += 1;
      teamStats[team2Name].points += 2;
      teamStats[team1Name].lost += 1;
    }
  }

  // Calculate NRR for each team and convert to array
  const table = Object.values(teamStats).map(team => {
    const runRateFor = team.oversFor > 0 ? team.runsFor / team.oversFor : 0;
    const runRateAgainst = team.oversAgainst > 0 ? team.runsAgainst / team.oversAgainst : 0;
    team.nrr = runRateFor - runRateAgainst;
    return team;
  });

  // Sort the final table
  table.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points; // Primary sort: Points
    if (b.nrr !== a.nrr) return b.nrr - a.nrr; // Secondary sort: NRR
    return b.won - a.won; // Tertiary sort: Wins
  });

  return table;
}