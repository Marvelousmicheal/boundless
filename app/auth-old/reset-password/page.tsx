'use client';

import AuthLoadingState from '@/components/auth/AuthLoadingState';
import { BoundlessButton } from '@/components/buttons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setErrorMessage(
        'Invalid reset link. Please request a new password reset.'
      );
    }
  }, [searchParams]);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(
          'Password reset successfully! You can now sign in with your new password.'
        );
        form.reset();
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      } else {
        setErrorMessage(responseData.message || 'Failed to reset password');
      }
    } catch {
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <Card>
            <CardContent className='pt-6'>
              <Alert variant='destructive'>
                <AlertDescription>
                  Invalid reset link. Please request a new password reset.
                </AlertDescription>
              </Alert>
              <div className='mt-4 text-center'>
                <Link
                  href='/auth/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-500'
                >
                  Request new reset link
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && <AuthLoadingState message='Signing in...' />}
      <div className='bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <h2 className='mt-6 text-[40px] font-medium text-white'>
              Reset your password
            </h2>
            <p className='mt-2 text-[#D9D9D9]'>Enter your new password below</p>
          </div>

          {successMessage && (
            <div className='text-sm text-green-500'>{successMessage}</div>
          )}

          {errorMessage && (
            <div className='text-sm text-red-500'>{errorMessage}</div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-white'>
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter new password'
                          className='w-full border-[#2B2B2B] bg-[#1C1C1C] pr-10 pl-10 text-white caret-white placeholder:text-[#B5B5B5] focus-visible:ring-0 focus-visible:ring-offset-0'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-medium text-white'>
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='Confirm new password'
                          className='w-full border-[#2B2B2B] bg-[#1C1C1C] pr-10 pl-10 text-white caret-white placeholder:text-[#B5B5B5] focus-visible:ring-0 focus-visible:ring-offset-0'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'
                        >
                          {showConfirmPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <BoundlessButton
                type='submit'
                className='w-full'
                disabled={isLoading}
                fullWidth
                loading={isLoading}
              >
                Reset Password
              </BoundlessButton>
            </form>
          </Form>

          <div className='text-center'>
            <Link
              href='/auth/signin'
              className='text-primary hover:text-primary/80 text-sm'
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
