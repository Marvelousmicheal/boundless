import React from 'react';

const ProjectSubmissionLoading = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary'></div>
      <p className='text-lg font-medium text-white'>
        Submitting your project...
      </p>
    </div>
  );
};

export default ProjectSubmissionLoading;
