import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/dbConnect';
import Match from '@/models/Match';
import Scraped from '@/models/Match'; // Assuming this is your model for the 'scraped' collection

// function toIST(date: Date) {
//   return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
// }

// function istDateOnly(date: Date) {
//   return new Date(toIST(date).toISOString().split('T')[0]);
// }

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch all documents from the collection
    const allData = await Scraped.find({});

    // The collection seems to hold a single document with 'points' and 'matches' arrays
    // Return the first document found, or an empty object if none exists
    const data = allData[0] || {};


    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Failed to fetch scrape data:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data from the database.' }, { status: 500 });
  }
}
