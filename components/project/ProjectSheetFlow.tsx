'use client';

import React, { useState } from 'react';
import BoundlessSheet from '../sheet/boundless-sheet';
import { Stepper } from '../stepper';
// import { MilestoneReview } from './';
import Initialize from './Initialize';
import ValidationFlow from './ValidationFlow';
import { useProjectSheetStore } from '@/lib/stores/project-sheet-store';
// import ValidationFlow from './ValidationFlow';

type StepState = 'pending' | 'active' | 'completed';

type Step = {
  title: string;
  description: string;
  state: StepState;
};

const initialSteps: Step[] = [
  {
    title: 'Initialize',
    description:
      'Submit your project idea and define milestones to begin your campaign journey.',
    state: 'active',
  },
  {
    title: 'Validate',
    description: 'Get admin approval and gather public support through voting.',
    state: 'pending',
  },
  {
    title: 'Launch Campaign',
    description: 'Set milestones, activate escrow, and start receiving funds.',
    state: 'pending',
  },
];

interface ProjectSheetFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectSheetFlow: React.FC<ProjectSheetFlowProps> = ({
  open,
  onOpenChange,
}) => {
  // Note: sub-steps handled internally by Initialize and ValidationFlow
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const sheet = useProjectSheetStore();

  const handleFormSuccess = () => {
    setSteps(prevSteps =>
      prevSteps.map((step, index) => {
        if (index === 0) {
          return { ...step, state: 'completed' };
        }
        if (index === 1) {
          return { ...step, state: 'active' };
        }
        return step;
      })
    );
  };

  // Milestone handling moved inside Initialize; no-op here

  const handleClose = () => {
    onOpenChange(false);
    sheet.reset();
    setSteps(initialSteps);
  };

  const renderContent = () => {
    if (sheet.mode === 'validate' && sheet.project) {
      return <ValidationFlow project={sheet.project} />;
    }
    return <Initialize onSuccess={handleFormSuccess} />;
  };

  return (
    <BoundlessSheet open={open} setOpen={handleClose} contentClassName='h-full'>
      <div className='flex justify-between'>
        <div className='flex-1 sticky top-0'>
          <Stepper steps={steps} />
        </div>
        <div className='flex-1'>{renderContent()}</div>
      </div>
    </BoundlessSheet>
  );
};

export default ProjectSheetFlow;
