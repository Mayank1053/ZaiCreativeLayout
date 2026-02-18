import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import AdminLayoutClient from './admin-layout-client';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const user = token ? verifyToken(token) : null;
  const isAuthenticated = !!user;

  return (
    <AdminLayoutClient isAuthenticated={isAuthenticated}>
      {children}
    </AdminLayoutClient>
  );
}
