import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostsStreaming } from '@/lib/data/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const result = await getBlogPostsStreaming(page, limit);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
