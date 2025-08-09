import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen absolute -top-8 -left-16 -right-16 -bottom-8 bg-[rgba(28,28,28,0.64)]  backdrop-blur-[7px]'>
      <LoadingSpinner size='xl' className='text-white' />
    </div>
  );
};

export default Loading;
