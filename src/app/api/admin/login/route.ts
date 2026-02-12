import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyCredentials, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = body.username?.trim();
    const password = body.password; // Don't trim password as it might have intentional spaces.
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Verify credentials
    console.log('Login attempt for:', username);
    const isValid = await verifyCredentials(username, password);
    console.log('Credentials valid:', isValid);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken({ username });
    
    // Set HTTP-only cookie using the cookies() API
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    
    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
