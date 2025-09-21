'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MissionText() {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const chars = containerRef.current.querySelectorAll('.char');

      gsap.fromTo(
        chars,
        {
          opacity: 1,
          y: 0,
          color: '#9CA3AF',
          textDecorationColor: 'transparent',
        },
        {
          opacity: 1,
          y: 0,
          color: '#ffffff',
          textDecorationColor: '#ffffff',
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.05,
          delay: 2,
          repeat: -1,
          repeatDelay: 2,
        }
      );
    }
  }, []);

  const firstPhrase = 'Our mission is';
  const rest =
    'to empower anyone, anywhere, to transform bold ideas into impactful projects with transparency, community, and accountability at the core.';

  return (
    <div className='flex max-w-[34rem] flex-col items-center justify-center px-6 text-center sm:h-full sm:w-full sm:text-lg md:h-full md:w-[80%]'>
      <h2
        ref={containerRef}
        className='text-xl leading-relaxed sm:text-3xl md:text-2xl'
      >
        <span className='mr-1 text-white underline decoration-white underline-offset-4'>
          {firstPhrase}
        </span>
        {rest.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className='inline-block whitespace-nowrap'>
            {Array.from(word).map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className='char inline-block whitespace-pre text-gray-400 underline decoration-transparent underline-offset-4'
              >
                {char}
              </span>
            ))}
            <span className='char inline-block whitespace-pre text-gray-400'>
              &nbsp;
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
