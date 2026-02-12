// Admin token verification API
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = verifyAuth(request);
    console.log('Verification request, user found:', !!user);
    
    if (!user) {
      return NextResponse.json({
        valid: false, 
        error: 'Invalid or expired token' 
      }, { status: 401 });
    }
    
    console.log('Token is valid for:', user.username);
    return NextResponse.json({
      valid: true,
      user: { username: user.username }
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
