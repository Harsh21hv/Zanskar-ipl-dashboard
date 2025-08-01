import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Scraped from '@/models/Match'; // Your combined schema (points + matches)

const STANDINGS_URL =
  'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js';

const SCHEDULE_URL =
  'https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/203-matchschedule.js';

export async function POST() {
  try {
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // 🟠 Fetch group standings and clean JSONP
    const standingsRes = await fetch(STANDINGS_URL);
    if (!standingsRes.ok) {
      throw new Error(`Failed to fetch standings: ${standingsRes.statusText}`);
    }

    const standingsText = await standingsRes.text();
    // console.log('Raw standings text:', standingsText.substring(0, 100)); // Debug log
    
    const standingsJson = JSON.parse(
      standingsText.replace(/^ongroupstandings\(/, '').replace(/\);?\s*$/, '')
    );
    const rawPoints = standingsJson.points || [];

    const points = rawPoints.map((team: any) => ({
      TeamID: team.TeamID,
      TeamCode: team.TeamCode,
      TeamLogo: team.TeamLogo,
      Matches: team.Matches,
      Wins: team.Wins,
      Loss: team.Loss,
      NoResult: team.NoResult,
      Points: team.Points,
      NetRunRate: team.NetRunRate,
      OrderNo: team.OrderNo,
      Status: team.Status,
    }));

    // 🟠 Fetch match schedule and clean JSONP
    const scheduleRes = await fetch(SCHEDULE_URL);
    if (!scheduleRes.ok) {
      throw new Error(`Failed to fetch schedule: ${scheduleRes.statusText}`);
    }

    const scheduleText = await scheduleRes.text();
    // console.log('Raw schedule text:', scheduleText.substring(0, 100)); // Debug log
    
    const scheduleJson = JSON.parse(
      scheduleText.replace(/^MatchSchedule\(/, '').replace(/\);?\s*$/, '')
    );
    const rawMatches = scheduleJson.Matchsummary || [];

    const matches = rawMatches.map((match: any) => ({
      MatchID: match.MatchID,
      MatchStatus: match.MatchStatus,
      MatchDate: match.MatchDate,
      MatchDateNew: match.MatchDateNew,
      MatchName: match.MatchName,
      MatchTime: match.MatchTime,
      GMTMatchTime: match.GMTMatchTime,
      GMTMatchDate: match.GMTMatchDate,
      GMTMatchEndTime: match.GMTMatchEndTime,
      GMTMatchEndDate: match.GMTMatchEndDate,
      FirstBattingTeamName: match.FirstBattingTeamName,
      SecondBattingTeamName: match.SecondBattingTeamName,
      GroundName: match.GroundName,
      Commentss: match.Commentss || '', // Provide default empty string
      TossDetails: match.TossDetails || 'TBD', // Provide default value
      FirstBattingSummary: match.FirstBattingSummary || {}, // FIX: Use empty object {}
      SecondBattingSummary: match.SecondBattingSummary || {}, // FIX: Use empty object {}
    }));

    // 🧹 Clear and seed the collection
    await Scraped.deleteMany({});
    const inserted = await Scraped.insertMany([{ points, matches }]);

    return NextResponse.json({
      message: 'Scrape data seeded successfully',
      pointsCount: points.length,
      matchesCount: matches.length,
    });
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
