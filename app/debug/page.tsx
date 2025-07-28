'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TestResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export default function DebugPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testPassword, setTestPassword] = useState('');

  const testBackendConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/test');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    if (!testEmail || !testPassword) {
      alert('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: testEmail, password: testPassword }),
      });
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const envVars = {
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing',
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_BASE_URL: process.env.API_BASE_URL || 'Not set',
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Debug & Test Page
          </h1>
          <p className='text-gray-600 mt-2'>
            Test your authentication system and API connectivity
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>
                Check if all required variables are set
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {Object.entries(envVars).map(([key, value]) => (
                  <div key={key} className='flex justify-between items-center'>
                    <span className='text-sm font-medium'>{key}:</span>
                    <Badge
                      variant={
                        value && value !== 'Missing' && value !== 'Not set'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {value || 'Missing'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Connection Test */}
          <Card>
            <CardHeader>
              <CardTitle>Backend Connection Test</CardTitle>
              <CardDescription>
                Test if your backend API is accessible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testBackendConnection}
                disabled={isLoading}
                className='w-full'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Testing...
                  </>
                ) : (
                  'Test Backend Connection'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Login Test */}
          <Card>
            <CardHeader>
              <CardTitle>Login Test</CardTitle>
              <CardDescription>
                Test login with your backend API
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='test-email'>Email</Label>
                <Input
                  id='test-email'
                  type='email'
                  value={testEmail}
                  onChange={e => setTestEmail(e.target.value)}
                  placeholder='test@example.com'
                />
              </div>
              <div>
                <Label htmlFor='test-password'>Password</Label>
                <Input
                  id='test-password'
                  type='password'
                  value={testPassword}
                  onChange={e => setTestPassword(e.target.value)}
                  placeholder='Enter password'
                />
              </div>
              <Button
                onClick={testLogin}
                disabled={isLoading || !testEmail || !testPassword}
                className='w-full'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Testing Login...
                  </>
                ) : (
                  'Test Login'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Results from your tests</CardDescription>
            </CardHeader>
            <CardContent>
              {testResult ? (
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    {testResult.success ? (
                      <CheckCircle className='h-4 w-4 text-green-500' />
                    ) : (
                      <XCircle className='h-4 w-4 text-red-500' />
                    )}
                    <span className='font-medium'>
                      {testResult.success ? 'Success' : 'Failed'}
                    </span>
                  </div>
                  <pre className='text-xs bg-gray-100 p-2 rounded overflow-auto'>
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className='flex items-center space-x-2 text-gray-500'>
                  <AlertCircle className='h-4 w-4' />
                  <span>No test results yet</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>Debugging Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium text-red-600'>
                  Fix Environment Variables:
                </h4>
                <ul className='list-disc list-inside text-sm space-y-1 mt-2'>
                  <li>
                    Fix <code>NEXT_PUBLIC_API_URL</code>: Change from{' '}
                    <code>http:localhost:8000/api</code> to{' '}
                    <code>http://localhost:8000/api</code>
                  </li>
                  <li>
                    Add <code>GOOGLE_CLIENT_SECRET</code> from Google Cloud
                    Console
                  </li>
                  <li>
                    Add <code>API_BASE_URL=http://localhost:8000/api</code>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-medium text-blue-600'>Test Steps:</h4>
                <ol className='list-decimal list-inside text-sm space-y-1 mt-2'>
                  <li>First, test the backend connection</li>
                  <li>
                    If that fails, check your backend is running on port 8000
                  </li>
                  <li>Test login with valid credentials</li>
                  <li>Check the console logs for detailed error messages</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
