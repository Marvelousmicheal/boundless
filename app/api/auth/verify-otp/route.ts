import { verifyOtp } from '@/lib/api/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const response = await verifyOtp({ email, otp });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return NextResponse.json(
        { message: String((error as { message: unknown }).message) },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
