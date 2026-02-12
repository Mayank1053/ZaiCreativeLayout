import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db';

// JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';
console.log('JWT_SECRET configured:', JWT_SECRET !== 'default-secret-change-in-production');
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

/**
 * Verify admin credentials against the database
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  try {
    const admin = await db.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return false;
    }

    return bcrypt.compare(password, admin.passwordHash);
  } catch (error) {
    console.error('Database auth error:', error);
    return false;
  }
}

/**
 * Generate a JWT token for authenticated admin
 */
export function generateToken(payload: { username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): { username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    console.log('Token verified for:', decoded.username);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extract token from request headers or cookies
 */
export function extractToken(request: Request): string | null {
  // Try Authorization header first (Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    console.log('Token found in Authorization header');
    return authHeader.slice(7);
  }
  
  // Try cookie
  const cookieHeader = request.headers.get('cookie');
  console.log('Cookie header:', cookieHeader ? 'Present' : 'Missing');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const authCookie = cookies.find(c => c.startsWith('auth_token='));
    if (authCookie) {
      console.log('auth_token found in cookies');
      return authCookie.slice(11);
    }
  }
  
  console.log('No token found in request');
  return null;
}

/**
 * Verify admin authentication from request
 */
export function verifyAuth(request: Request): { username: string } | null {
  const token = extractToken(request);
  if (!token) {
    return null;
  }
  
  return verifyToken(token);
}

/**
 * Create auth cookie string for response headers
 */
export function createAuthCookie(token: string): string {
  return `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`;
}

/**
 * Create logout cookie string (expires immediately)
 */
export function createLogoutCookie(): string {
  return 'auth_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0';
}
