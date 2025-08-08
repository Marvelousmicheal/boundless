import Image from 'next/image';
import React from 'react';

function ProjectSubmissionSuccess() {
  return (
    <main className='w-[600px] flex flex-col gap-6 items-center justify-center'>
      <h5 className='font-medium text-xl text-card'>Project Submitted!</h5>
      <div className=''>
        <Image width={150} height={150} src='/done-check.svg' alt='done' />
      </div>
      <article>
        <p className='text-base font-normal text-card/60 text-center'>
          Your project has been submitted and is now under admin review. You’ll
          receive an update within 72 hours. Once approved, your project will
          proceed to public validation.
        </p>
        <p className='text-base font-normal text-card/60'>
          You can track the status of your submission anytime on the{' '}
          <span className='text-primary'>Projects page.</span>
        </p>
      </article>

      <button className='  w-[198px] mt-4 text-base font-medium text-background bg-primary px-16 py-2 rounded-[10px]'>
        Continue
      </button>
    </main>
  );
}

export default ProjectSubmissionSuccess;
