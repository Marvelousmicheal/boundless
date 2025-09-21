import Image from 'next/image';

function AboutUsDifferent() {
  return (
    <section className='relative flex flex-col items-center gap-8 overflow-hidden px-4 py-8 sm:px-6 md:gap-10 md:px-8 md:py-16 lg:px-12 xl:px-16'>
      <Image
        src='bg-header-about.svg'
        alt='Header background'
        width={1240}
        height={1324}
        className='absolute top-0 left-1/2 h-auto w-full max-w-none -translate-x-1/2 transform opacity-80'
      />

      {/* Header Section */}
      <div className='relative flex w-full max-w-6xl items-center justify-center pb-4 md:pb-6'>
        <h1 className='text-center text-2xl leading-tight font-normal text-white sm:text-3xl md:text-4xl lg:text-5xl'>
          What Makes Boundless
          <br className='sm:hidden' />
          <span className='hidden sm:inline'> </span>Different
        </h1>
      </div>

      {/* Cards Grid */}
      <div className='flex w-full max-w-6xl flex-col gap-4 md:gap-6'>
        {/* First Row */}
        <div className='flex flex-col items-stretch gap-4 md:gap-6 lg:flex-row'>
          <div className='flex-1 rounded-[12px] bg-gradient-to-b from-white/48 to-white/8 p-[1px] lg:flex-[1.4]'>
            <div className='flex h-full w-full flex-col items-center gap-4 rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-center bg-no-repeat p-4 backdrop-blur-2xl md:gap-6 md:p-6'>
              <div className='flex h-[200px] w-full max-w-[520px] items-center justify-center md:h-[240px]'>
                <Image
                  src='card1.svg'
                  width={520}
                  height={241}
                  alt='Validation First'
                  className='h-auto max-h-full w-full max-w-full object-contain'
                />
              </div>
              <div className='flex flex-col gap-2 px-4 py-4 md:gap-2.5 md:px-8 md:py-6'>
                <h4 className='text-base font-semibold text-white md:text-lg'>
                  Validation First
                </h4>
                <p className='text-stepper-text-inactive text-sm leading-relaxed font-normal md:text-base'>
                  Ideas are filtered through community-driven voting and
                  feedback before funds are raised.
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 rounded-[12px] bg-gradient-to-b from-white/48 to-white/8 p-[1px] lg:flex-1'>
            <div className='flex h-full w-full flex-col items-center gap-4 rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-center bg-no-repeat p-4 backdrop-blur-2xl md:gap-6 md:p-6'>
              <div className='flex h-[200px] w-full max-w-[452px] items-center justify-center md:h-[240px]'>
                <Image
                  src='card2.svg'
                  width={452}
                  height={205}
                  alt='Milestone Escrow'
                  className='h-auto max-h-full w-full max-w-full object-contain'
                />
              </div>
              <div className='flex flex-col gap-2 px-4 py-4 md:gap-2.5 md:px-8 md:py-6'>
                <h4 className='text-base font-semibold text-white md:text-lg'>
                  Milestone Escrow
                </h4>
                <p className='text-stepper-text-inactive text-sm leading-relaxed font-normal md:text-base'>
                  Backers are protected. Funds are only released when project
                  milestones are achieved and verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className='flex flex-col items-stretch gap-4 md:gap-6 lg:flex-row'>
          <div className='flex-1 rounded-[12px] bg-gradient-to-b from-white/48 to-white/8 p-[1px] lg:flex-1'>
            <div className='flex h-full w-full flex-col items-center gap-4 rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-center bg-no-repeat p-4 backdrop-blur-2xl md:gap-6 md:p-6'>
              <div className='flex h-[200px] w-full max-w-[452px] items-center justify-center md:h-[240px]'>
                <Image
                  src='card3.svg'
                  width={452}
                  height={205}
                  alt='Inclusive Growth'
                  className='h-auto max-h-full w-full max-w-full object-contain'
                />
              </div>
              <div className='flex flex-col gap-2 px-4 py-4 md:gap-2.5 md:px-8 md:py-6'>
                <h4 className='text-base font-semibold text-white md:text-lg'>
                  Inclusive Growth
                </h4>
                <p className='text-stepper-text-inactive text-sm leading-relaxed font-normal md:text-base'>
                  Crowdfunding, grants, and hackathons all opportunities in one
                  ecosystem.
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 rounded-[12px] bg-gradient-to-b from-white/48 to-white/8 p-[1px] lg:flex-[1.4]'>
            <div className='flex h-full w-full flex-col items-center gap-4 rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-center bg-no-repeat p-4 backdrop-blur-2xl md:gap-6 md:p-6'>
              <div className='flex h-[200px] w-full max-w-[620px] items-center justify-center md:h-[240px]'>
                <Image
                  src='card4.svg'
                  width={620}
                  height={258}
                  alt='Blockchain-Powered'
                  className='h-auto max-h-full w-full max-w-full object-contain'
                />
              </div>
              <div className='flex flex-col gap-2 px-4 py-4 md:gap-2.5 md:px-8 md:py-6'>
                <h4 className='text-base font-semibold text-white md:text-lg'>
                  Blockchain-Powered
                </h4>
                <p className='text-stepper-text-inactive text-sm leading-relaxed font-normal md:text-base'>
                  Built on Stellar and integrated with Trustless Work for
                  secure, transparent funding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsDifferent;
