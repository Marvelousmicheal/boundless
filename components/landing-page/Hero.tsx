'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react';
import { BoundlessButton } from '@/components/buttons';
import Image from 'next/image';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  useGSAP(
    () => {
      if (heroRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: '100 80%',
            end: 'bottom 20%',
            scrub: 1,
            // markers: true,
          },
        });

        const ellipseImg = heroRef.current.querySelector('.ellipse-image');
        if (ellipseImg) {
          heroTl.set(ellipseImg, {
            rotation: 0,
            scale: 1,
          });
          heroTl.to(
            ellipseImg,
            {
              rotation: 30,
              scale: 1.2,
              ease: 'none',
            },
            0
          );
        }

        const sphereImg = heroRef.current.querySelector('.sphere-image');
        if (sphereImg) {
          heroTl.to(
            sphereImg,
            {
              rotation: -30,
              scale: 1.2,
              ease: 'none',
            },
            0
          );
        }

        gsap.to(heroRef.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(heroRef.current.querySelector('.ellipse-container'), {
          y: -15,
          ease: 'power2.inOut',
          duration: 4,
          repeat: -1,
          yoyo: true,
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    },
    { scope: heroRef }
  );

  return (
    <div
      className='relative mx-5 flex h-screen min-h-screen items-stretch justify-between pb-[36] md:mx-[116px] md:items-end md:pb-[66px]'
      id='hero'
    >
      <div
        ref={heroRef}
        className='absolute top-1/2 left-1/2 z-10 mt-[-80px] h-full w-full -translate-x-1/2 -translate-y-1/2'
      >
        <Image
          src='/sphere.svg'
          alt='glow'
          unoptimized
          className='sphere-image absolute top-1/2 left-1/2 z-10 h-[369px] w-[508px] -translate-x-1/2 -translate-y-1/2'
          width={1920}
          height={1080}
          quality={100}
        />
        <Image
          src='/glow.svg'
          alt='glow'
          unoptimized
          className='glow-element absolute top-1/2 left-1/2 z-10 h-full !w-screen !max-w-screen -translate-x-1/2 -translate-y-1/2'
          width={1920}
          height={1080}
        />
        <Image
          src='/elipse.svg'
          alt='glow'
          unoptimized
          className='ellipse-image absolute top-1/2 left-1/2 z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2'
          width={1920}
          height={1080}
        />
        {/* <div
          className='absolute bottom-0 left-0 !w-screen !max-w-screen h-[150px] z-10 bg-gradient-to-t from-transparent to-background'
          style={{
            background:
              'linear-gradient(180deg, rgba(3, 3, 3, 0.00) 32.3%, #030303 84.8%)',
          }}
        /> */}
      </div>
      <div className='z-10 mt-[120px] flex h-full w-full flex-col items-end justify-between gap-4 md:h-auto md:flex-row'>
        <h2 className='max-w-[350px] text-left text-[30px] leading-[140%] text-white md:max-w-[579px] lg:text-[32px] xl:text-[48px]'>
          Validate Ideas, <br /> Fund Bold Projects, <br />{' '}
          <span className='gradient-text font-medium'>
            Unlock Boundless Potential
          </span>
        </h2>
        <div className='relative bottom-[150px] md:bottom-0 md:max-w-[466px]'>
          <p
            className='text-[14px] leading-[150%] text-white lg:text-[14px] xl:text-[16px]'
            style={{
              background: 'linear-gradient(93deg, #B5B5B5 15.93%, #FFF 97.61%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Boundless is the milestone-based platform for validating, funding,
            and scaling ideas through community crowdfunding, grants, and
            hackathons built on Stellar.
          </p>
          <div className='mt-7 flex flex-col items-center gap-4 md:flex-row'>
            <BoundlessButton variant='default' size='xl' fullWidth>
              Explore Projects
            </BoundlessButton>
            <BoundlessButton variant='secondary' size='xl' fullWidth>
              Submit Your Idea
            </BoundlessButton>
          </div>
        </div>
      </div>
    </div>
  );
}
