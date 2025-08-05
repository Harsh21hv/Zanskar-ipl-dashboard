import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/dbConnect';
import Scraped from '@/models/Match'; 


export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const allData = await Scraped.find({});

    const data = allData[0] || {};


    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Failed to fetch scrape data:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data from the database.' }, { status: 500 });
  }
}
