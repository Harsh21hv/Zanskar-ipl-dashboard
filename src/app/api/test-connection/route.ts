// src/app/api/test-connection/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      connected: true,
      message: 'MongoDB connected successfully!',
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      {
        connected: false,
        message: 'MongoDB connection failed.',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
