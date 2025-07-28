'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function TestAuthPage() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Auth System Test</h1>
          <p className='text-gray-600 mt-2'>
            This page tests the authentication system functionality
          </p>
        </div>

        <div className='space-y-6'>
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>Current authentication state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center space-x-4'>
                {isLoading ? (
                  <>
                    <Loader2 className='h-6 w-6 animate-spin text-blue-500' />
                    <span>Loading...</span>
                  </>
                ) : isAuthenticated ? (
                  <>
                    <CheckCircle className='h-6 w-6 text-green-500' />
                    <span>Authenticated</span>
                    <Badge variant='secondary'>Success</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className='h-6 w-6 text-red-500' />
                    <span>Not Authenticated</span>
                    <Badge variant='destructive'>Failed</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session Data */}
          {isAuthenticated && session && (
            <Card>
              <CardHeader>
                <CardTitle>Session Data</CardTitle>
                <CardDescription>
                  User information from the session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='font-medium'>User ID:</span>
                    <span className='font-mono text-sm'>{session.user.id}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-medium'>Email:</span>
                    <span>{session.user.email}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-medium'>Name:</span>
                    <span>{session.user.name || 'Not provided'}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-medium'>Role:</span>
                    <Badge variant='outline' className='capitalize'>
                      {session.user.role}
                    </Badge>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-medium'>Has Access Token:</span>
                    <span>{session.user.accessToken ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Test Actions</CardTitle>
              <CardDescription>
                Test authentication functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Button asChild className='w-full'>
                    <Link href='/auth/signin'>Go to Sign In</Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/auth/signup'>Go to Sign Up</Link>
                  </Button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/dashboard'>Go to Dashboard</Link>
                  </Button>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/'>Go to Home</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Check */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Check</CardTitle>
              <CardDescription>
                Verify required environment variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>NEXTAUTH_URL:</span>
                  <Badge
                    variant={
                      process.env.NEXT_PUBLIC_NEXTAUTH_URL
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {process.env.NEXT_PUBLIC_NEXTAUTH_URL ? 'Set' : 'Missing'}
                  </Badge>
                </div>
                <div className='flex justify-between'>
                  <span>NEXTAUTH_SECRET:</span>
                  <Badge
                    variant={
                      process.env.NEXTAUTH_SECRET ? 'secondary' : 'destructive'
                    }
                  >
                    {process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing'}
                  </Badge>
                </div>
                <div className='flex justify-between'>
                  <span>GOOGLE_CLIENT_ID:</span>
                  <Badge
                    variant={
                      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
                      ? 'Set'
                      : 'Missing'}
                  </Badge>
                </div>
                <div className='flex justify-between'>
                  <span>API_BASE_URL:</span>
                  <Badge
                    variant={
                      process.env.NEXT_PUBLIC_API_URL
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {process.env.NEXT_PUBLIC_API_URL ? 'Set' : 'Missing'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
