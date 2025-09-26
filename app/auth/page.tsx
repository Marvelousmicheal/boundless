'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthModeNav } from '@/components/auth/AuthModeNav';
import LoginWrapper from '@/components/auth/LoginWrapper';
import SignupWrapper from '@/components/auth/SignupWrapper';
import AuthLoadingState from '@/components/auth/AuthLoadingState';

export default function AuthPage() {
  const [loadingState, setLoadingState] = useState(false);
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') || 'signin';
  const [currentMode, setCurrentMode] = useState<'signin' | 'signup'>(
    mode as 'signin' | 'signup'
  );

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setCurrentMode(newMode);
  };

  return (
    <>
      {loadingState && <AuthLoadingState message='Signing in...' />}
      <div className='relative z-10 flex min-h-screen items-center justify-center p-4'>
        <div className='w-full max-w-[600px]'>
          <div className='group relative rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-2 hover:border-white/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]'>
            <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-50'></div>

            <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30'></div>

            <div className='relative z-10'>
              <AuthModeNav
                currentMode={currentMode}
                onModeChange={handleModeChange}
              />

              <div className='mt-2'>
                {currentMode === 'signin' ? (
                  <LoginWrapper setLoadingState={setLoadingState} />
                ) : (
                  <SignupWrapper setLoadingState={setLoadingState} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
