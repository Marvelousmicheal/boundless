import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/api/auth';

export interface ServerUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
  isVerified?: boolean;
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export async function getServerUser(): Promise<ServerUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return null;
    }

    const user = await getMe(accessToken);

    return {
      id: (user._id || user.id) as string,
      email: user.email as string,
      name: (user.profile?.firstName || user.name) as string | null,
      image: (user.profile?.avatar || user.image) as string | null,
      role: user.roles?.[0] === 'ADMIN' ? 'ADMIN' : 'USER',
      isVerified: user.isVerified,
      profile: user.profile,
    };
  } catch {
    // Silently handle auth errors
    return null;
  }
}

export async function requireServerAuth(): Promise<ServerUser> {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return user;
}

export async function getServerAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function isServerAuthenticated(): Promise<boolean> {
  const user = await getServerUser();
  return !!user;
}

// Utility for protected server components
export async function withServerAuth<T extends unknown[]>(
  fn: (user: ServerUser, ...args: T) => Promise<React.ReactNode>,
  ...args: T
): Promise<React.ReactNode> {
  const user = await requireServerAuth();
  return fn(user, ...args);
}
