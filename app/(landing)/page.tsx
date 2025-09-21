'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef } from 'react';
import BeamBackground from '@/components/landing-page/BeamBackground';
import { Hero } from '@/components/landing-page';
import HowBoundlessWork from '@/components/landing-page/HowBoundlessWork';
import WhyBoundless from '@/components/landing-page/WhyBoundless';
import BackedBy from '@/components/landing-page/BackedBy';
import NewsLetter from '@/components/landing-page/NewsLetter';
import BlogSection from '@/components/landing-page/blog/BlogSection';
import { Footer } from '@/components/landing-page/footer';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: containerRef.current,
        content: contentRef.current,
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className='relative overflow-hidden'>
      <BeamBackground />
      <div
        ref={contentRef}
        className='relative z-10 mx-auto max-w-[1300px] space-y-[23px] md:space-y-[80px]'
      >
        <Hero />
        <WhyBoundless />
        <BackedBy />
        <NewsLetter />
        <BlogSection />
        <HowBoundlessWork />
        <Footer />
      </div>
    </div>
  );
}
