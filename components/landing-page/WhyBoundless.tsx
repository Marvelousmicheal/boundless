import { FileLock, Globe, UserCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const WhyBoundless = () => {
  return (
    <div
      className='h-full w-full px-6 py-5 md:px-10 md:py-20 xl:px-[100px]'
      id='how-boundless-work'
    >
      {/* Heading & Description */}
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='text-3xl leading-[140%] tracking-wide text-white md:text-4xl xl:text-[48px]'>
          Why Builders Choose Boundless
        </h2>
        <p className='gradient-text-2 mx-auto mt-3 max-w-xl text-base leading-[160%] md:text-lg'>
          Boundless combines transparency, accountability, and accessibility,
          giving creators the tools to raise funds confidently and backers the
          security to support with trust.
        </p>
      </div>

      {/* Image + Feature Text */}
      <div className='mt-12 hidden flex-col-reverse items-center justify-between gap-10 lg:flex lg:flex-row'>
        <div className='w-full lg:w-1/2'>
          <Image
            src='/why.png'
            alt='why-boundless'
            width={800}
            height={600}
            unoptimized
            className='h-auto w-full rounded-lg'
          />
        </div>
        <div className='w-full space-y-6 lg:w-1/2'>
          <div className='flex flex-col'>
            <UserCheck size={32} className='text-white' />
            <h4 className='mt-2 text-xl leading-[120%] font-medium tracking-[-0.4px] text-white'>
              Community Validation
            </h4>
          </div>
          <p className='leading-[160%] text-[#B5B5B5]'>
            Every project starts with open feedback and voting, allowing
            builders to refine their ideas and prove demand before funding
            begins.
          </p>
          <p className='leading-[160%] text-[#B5B5B5]'>
            This ensures that only projects with genuine potential and
            credibility move forward, giving backers greater confidence in where
            their support goes.
          </p>
        </div>
      </div>

      {/* Gradient Box with GIF */}
      <div className='mt-16'>
        <div
          className='relative z-10 rounded-xl border border-[rgba(255,255,255,0.48)] px-5 py-5 md:px-10 md:py-10'
          style={{
            background:
              'linear-gradient(258deg, rgba(167, 249, 80, 0.46) 53.09%, rgba(58, 230, 178, 0.92) 103.03%)',
          }}
        >
          <Image
            src='/why.gif'
            unoptimized
            alt='why-boundless'
            width={800}
            height={600}
            className='z-30 mx-auto h-auto w-full max-w-[754px] rounded-xl object-cover'
          />
        </div>

        {/* Features Grid */}
        <div className='mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div className='w-full space-y-6 lg:hidden lg:w-1/2'>
            <div className='flex flex-col'>
              <UserCheck size={32} className='text-white' />
              <h4 className='mt-2 text-xl leading-[120%] font-medium tracking-[-0.4px] text-white'>
                Community Validation
              </h4>
            </div>
            <p className='leading-[160%] text-[#B5B5B5]'>
              Every project starts with open feedback and voting, allowing
              builders to refine their ideas and prove demand before funding
              begins.
            </p>
            <p className='leading-[160%] text-[#B5B5B5]'>
              This ensures that only projects with genuine potential and
              credibility move forward, giving backers greater confidence in
              where their support goes.
            </p>
          </div>
          {/* Milestone Escrow */}
          <div className='space-y-4'>
            <div className='flex flex-col'>
              <FileLock size={32} className='text-white' />
              <h4 className='mt-2 leading-[145%] font-medium tracking-[-0.4px] text-white'>
                Milestone Escrow
              </h4>
            </div>
            <p className='leading-[160%] text-[#B5B5B5]'>
              Funds are locked in smart contracts and released only when
              milestones are completed. Backers know their contributions support
              real progress, while creators stay accountable.
            </p>
          </div>

          {/* Inclusive Opportunities */}
          <div className='space-y-4'>
            <div className='flex flex-col'>
              <Globe size={32} className='text-white' />
              <h4 className='mt-2 leading-[145%] font-medium tracking-[-0.4px] text-white'>
                Inclusive Opportunities
              </h4>
            </div>
            <p className='leading-[160%] text-[#B5B5B5]'>
              From crowdfunding to grants and hackathons, Boundless provides
              builders with multiple ways to access funding and grow their
              ideas, while supporters discover projects that inspire them.
            </p>
          </div>

          {/* Powered by Stellar */}
          <div className='space-y-4'>
            <div className='flex flex-col'>
              <UserCheck size={32} className='text-white' />
              <h4 className='mt-2 leading-[145%] font-medium tracking-[-0.4px] text-white'>
                Powered by Stellar
              </h4>
            </div>
            <p className='leading-[160%] text-[#B5B5B5]'>
              Built on Stellar and Soroban smart contracts, Boundless makes
              funding secure, fast, and affordable. This global infrastructure
              enables builders and backers to connect without barriers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBoundless;
