export interface Match {
  MatchID: number;
  FirstBattingTeamName: string;
  SecondBattingTeamName: string;
  MatchDate: string;
  MatchTime: string;
  GroundName: string;
  Commentss?: string;
  FirstBattingSummary?: string;
  SecondBattingSummary?: string;
  TossDetails?: string;
  [key: string]: any; // Allows for other potential properties
}

export interface Point {
  TeamID: string;
  TeamCode: string;
  TeamLogo: string;
  Matches: string;
  Wins: string;
  Loss: string;
  NoResult: string;
  Points: string;
  NetRunRate: string;
  OrderNo: string;
  Status: string;
}
