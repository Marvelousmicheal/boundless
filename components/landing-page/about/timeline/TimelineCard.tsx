import Image from 'next/image';
import React from 'react';

interface props {
  img: string;
  year: string;
  title: string;
  subTitle: string;
  backgroundImage: string;
  isActive?: boolean;
}

const TimelineCard = ({
  img,
  year,
  title,
  subTitle,
  backgroundImage,
  isActive = false,
}: props) => {
  return (
    <div className='relative'>
      {/* Blur gradient background */}
      <div
        className='absolute -inset-0.5 z-0 rounded-[12px] mix-blend-hard-light blur-[15px]'
        style={{
          background:
            'linear-gradient(273deg, rgba(167, 249, 80, 0.10) 93.84%, rgba(58, 230, 178, 0.4) 3.28%)',
        }}
      />

      {/* Article content */}
      <article
        className={`${backgroundImage} time-card-general-background-positioning relative z-10 flex min-h-[350px] w-full flex-col gap-8 overflow-hidden rounded-lg bg-[#101010] px-6 pt-6 pb-8 text-white md:min-h-[400px] md:gap-20 md:pb-[91px]`}
      >
        <div className='flex items-center justify-between'>
          <div className='my-gradient-box flex h-16 w-16 items-center justify-center rounded-xl md:h-20 md:w-20'>
            <Image
              src={img}
              width={48}
              height={48}
              className='size-10 md:size-12'
              alt='Timeline Icon'
            />
          </div>

          <p
            className='bg-clip-text text-sm leading-[120%] font-medium tracking-[-2%] text-transparent uppercase md:text-base'
            style={{
              backgroundImage:
                'linear-gradient(273deg, rgba(167, 249, 80, 0.80) 13.84%, #3AE6B2 73.28%)',
            }}
          >
            {year}
          </p>
        </div>
        <div className='flex flex-col gap-6 md:gap-11'>
          <h2 className='text-xl leading-[120%] font-medium tracking-[-2%] uppercase md:text-2xl'>
            {title}
          </h2>
          {isActive && (
            <p className='text-sm leading-[160%] font-normal text-[#B5B5B5] md:text-base'>
              {subTitle}
            </p>
          )}
        </div>
      </article>
    </div>
  );
};

export default TimelineCard;
