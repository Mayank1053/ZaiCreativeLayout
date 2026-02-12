// Categories API - public endpoint for fetching categories
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET: List all categories
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
