import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import AboutUsDifferent from '@/components/landing-page/about/AboutUsDifferent';

export const metadata: Metadata = generatePageMetadata('about');

const AboutPage = () => {
  return (
    <div className='text-white text-4xl font-bold text-center mt-10'>
      About Page
      <AboutUsDifferent />
    </div>
  );
};

export default AboutPage;
