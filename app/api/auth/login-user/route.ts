import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { login } from '@/lib/api/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Call the login function
    const response = await login({ email, password });

    if (response && response.accessToken) {
      // Set cookies using Next.js cookies
      const cookieStore = await cookies();

      // Set access token cookie
      cookieStore.set('accessToken', response.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      });

      // Set refresh token cookie
      if (response.refreshToken) {
        cookieStore.set('refreshToken', response.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 604800, // 7 days
          path: '/',
        });
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          data: {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
