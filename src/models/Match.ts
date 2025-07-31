import mongoose, { Schema, model, models } from 'mongoose';


// POINTS INTERFACE
interface Point {
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

// MATCH INTERFACE
interface Match {
  MatchID: number;
  MatchStatus: string;
  MatchDate: string;
  MatchDateNew: string;
  MatchName: string;
  MatchTime: string;
  GMTMatchTime: string;
  GMTMatchDate: string;
  GMTMatchEndTime: string;
  GMTMatchEndDate: string;
  FirstBattingTeamName: string;
  SecondBattingTeamName: string;
  GroundName: string;
  Commentss: string;
  TossDetails: string;
  FirstBattingSummary: string;
  SecondBattingSummary: string;
}

// MAIN DOCUMENT INTERFACE
export interface IScraped {
  points: Point[];
  matches: Match[];
}

// POINT SCHEMA
const PointSchema: Schema = new Schema<Point>({
  TeamID: { type: String, required: true },
  TeamCode: { type: String, required: true },
  TeamLogo: { type: String, required: true },
  Matches: { type: String, required: true },
  Wins: { type: String, required: true },
  Loss: { type: String, required: true },
  NoResult: { type: String, required: true },
  Points: { type: String, required: true },
  NetRunRate: { type: String, required: true },
  OrderNo: { type: String, required: true },
  Status: { type: String, required: true },
});

// MATCH SCHEMA
const MatchSchema: Schema = new Schema<Match>({
  MatchID: { type: Number, required: true },
  MatchStatus: { type: String, required: true },
  MatchDate: { type: String, required: true },
  MatchDateNew: { type: String, required: true },
  MatchName: { type: String, required: true },
  MatchTime: { type: String, required: true },
  GMTMatchTime: { type: String, required: true },
  GMTMatchDate: { type: String, required: true },
  GMTMatchEndTime: { type: String, required: true },
  GMTMatchEndDate: { type: String, required: true },
  FirstBattingTeamName: { type: String, required: true },
  SecondBattingTeamName: { type: String, required: true },
  GroundName: { type: String, required: true },
  Commentss: { type: String, required: true },
  TossDetails: { type: String, required: true },
  FirstBattingSummary: { type: mongoose.Schema.Types.Mixed, default: {} },
  SecondBattingSummary: { type: mongoose.Schema.Types.Mixed, default: {} },
});

// MAIN SCHEMA with collection name "scrape"
const ScrapedSchema: Schema = new Schema<IScraped>(
  {
    points: { type: [PointSchema], required: true },
    matches: { type: [MatchSchema], required: true },
  },
  {
    collection: 'scrape',
  }
);

export default models.Scraped || model<IScraped>('Scraped', ScrapedSchema);
