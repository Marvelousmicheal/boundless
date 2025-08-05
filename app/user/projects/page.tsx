'use client';

import AnimatedCounter from '@/components/AnimatedCounter';
import LoadingSpinner from '@/components/LoadingSpinner';
import LoadingSpinnerDemo from '@/components/LoadingSpinnerDemo';
import PageTransition from '@/components/PageTransition';
import React from 'react';

const page = () => {
  return (
    <PageTransition>
      <div className='bg-whites'>
        <AnimatedCounter value={100} duration={1000} />
        <LoadingSpinner size='xl' className='text-white' />
      </div>
      <LoadingSpinnerDemo />
    </PageTransition>
  );
};

export default page;
