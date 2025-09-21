import React from 'react';
import AboutUsMission from './Aboutmissionbg';
import MissionText from './text';

export default function Missionpage() {
  return (
    <div className='relative mx-6 my-5 h-full min-h-[80vh] overflow-hidden bg-black text-white md:mx-12 md:my-16 lg:mx-[100px]'>
      <div className='absolute inset-0 z-0'>
        <AboutUsMission />
      </div>

      <div className='absolute inset-0 z-10 flex min-h-[60vh] items-center justify-center'>
        <MissionText />
      </div>
    </div>
  );
}
