'use client';
import { PriceDisplay } from '@/components/PriceDisplay';
import Card from '@/components/card';
import RecentProjects from '@/components/overview/RecentProjects';
import PageTransition from '@/components/PageTransition';
import { Coins, History } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import CampaignTable from '@/components/campaigns/CampaignTable';
import { useEffect, useState } from 'react';
import { UserPageSkeleton } from '@/components/skeleton/UserPageSkeleton';

export default function UserPage() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading until client-side hydration is complete
  if (!mounted || isLoading) {
    return <UserPageSkeleton />;
  }

  return (
    <PageTransition>
      <div className='min-h-screen'>
        <div className='mx-auto max-w-7xl p-4 sm:p-6 lg:p-8'>
          {/* Header Section */}
          <div className='mb-8'>
            <h1 className='text-2xl leading-[120%] font-medium tracking-[-0.64px] text-white sm:text-3xl lg:text-[32px]'>
              Hello, {user?.name?.split(' ')[0] || 'User'}
            </h1>
          </div>
          {/* Stats Cards Grid */}
          <div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            <Card
              title='Pending Submissions'
              value='0'
              bottomText={
                <div className='flex items-center gap-2'>
                  <History className='h-4 w-4 text-white/60' />
                  <span className='text-sm text-white/60'>
                    No recent submissions
                  </span>
                </div>
              }
            />
            <Card
              title='Active Projects'
              value='0'
              bottomText={
                <div className='flex items-center gap-2'>
                  <span className='text-white/90'>0</span>
                  <span className='text-sm text-white/90'>
                    Approved Submissions
                  </span>
                </div>
              }
            />
            <Card
              title='Available Grants'
              value={<PriceDisplay price={0} className='!tracking-[-0.06px]' />}
              bottomText={
                <div className='flex items-center gap-2 text-white/90'>
                  <span className='text-sm'>6 grants available</span>
                </div>
              }
            />
            <Card
              title='Active Campaigns'
              value='10'
              bottomText={
                <div className='flex items-center gap-2'>
                  <Coins className='h-4 w-4 text-white/60' />
                  <PriceDisplay
                    price={0}
                    className='!text-xs !tracking-[-0.06px]'
                  />
                </div>
              }
            />
          </div>

          {/* Main Content Grid */}
          <div className='space-y-8'>
            {/* Recent Projects - Full Width */}
            <RecentProjects />
            <div className='flex w-full flex-col gap-6 rounded-[12px] bg-[#1C1C1C] p-4 sm:gap-8 sm:p-6'>
              <CampaignTable limit={5} showPagination={false} />
            </div>

            {/* Recent Contributions and Grant History - Side by Side on larger screens */}
            {/* <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
              <RecentContributions projects={[]} />
              <GrantHistory projects={[]} />
            </div> */}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
