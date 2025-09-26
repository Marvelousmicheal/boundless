'use client';
import PageTransition from '@/components/PageTransition';
import Projects from '@/components/Projects';
import React, { useEffect, useState } from 'react';
import { ProjectsPageSkeleton } from '@/components/skeleton/ProjectsSkeleton';

const Page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading until client-side hydration is complete
  if (!mounted) {
    return <ProjectsPageSkeleton />;
  }

  return (
    <PageTransition>
      <div className='min-h-screen'>
        <div className='mx-auto max-w-7xl p-4 sm:p-6 lg:p-8'>
          <Projects />
        </div>
      </div>
    </PageTransition>
  );
};

export default Page;
