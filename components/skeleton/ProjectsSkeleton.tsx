import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export const ProjectsPageSkeleton = () => {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-7xl p-4 sm:p-6 lg:p-8'>
        <ProjectsSkeleton />
      </div>
    </div>
  );
};

export const ProjectsSkeleton = () => {
  return (
    <>
      <motion.div
        className='flex flex-col items-start justify-between gap-3 sm:gap-4 xl:flex-row xl:items-center xl:gap-0'
        variants={fadeInUp}
      >
        <div className='flex items-center gap-2 sm:gap-3 xl:gap-5'>
          <Skeleton className='h-6 w-32 sm:h-7 sm:w-40' />
        </div>
        <div className='flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:w-auto'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-24' />
        </div>
      </motion.div>

      <motion.div
        className='grid grid-cols-1 gap-4 sm:grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'
        variants={staggerContainer}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className='rounded-[12px] border border-[#484848] bg-[#2B2B2B] p-4'
            variants={fadeInUp}
            custom={index}
          >
            <div className='mb-3 flex items-start gap-3'>
              <Skeleton className='h-16 w-16 flex-shrink-0 rounded-lg' />
              <div className='min-w-0 flex-1'>
                <Skeleton className='mb-2 h-5 w-3/4' />
                <Skeleton className='mb-1 h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-1/2' />
              <div className='flex gap-2'>
                <Skeleton className='h-6 w-16 rounded-full' />
                <Skeleton className='h-6 w-20 rounded-full' />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
