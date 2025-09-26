import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  try {
    const response = await fetch(`${apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({
      success: true,
      apiUrl,
      backendStatus: response.status,
      backendOk: response.ok,
      message: 'Backend connectivity test completed',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        apiUrl,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Backend connectivity test failed',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data,
      apiUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
