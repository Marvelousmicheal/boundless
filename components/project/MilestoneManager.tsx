'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import MilestoneForm, { Milestone } from './MilestoneForm';
import { toast } from 'sonner';
import { Label } from '../ui/label';

interface MilestoneManagerProps {
  milestones: Milestone[];
  onNext?: (milestones: Milestone[]) => void;
  onChange?: (milestones: Milestone[], isValid: boolean) => void;
}

const MilestoneManager: React.FC<MilestoneManagerProps> = ({
  milestones,
  onChange,
}) => {
  const isValid = (ms: Milestone[]) =>
    ms.length >= 3 &&
    ms.length <= 6 &&
    ms.every(m => m.title.trim() && m.description.trim() && m.deliveryDate);

  const allocateFundPercentages = (ms: Milestone[]): Milestone[] => {
    const count = ms.length;
    if (count === 0) return ms;

    // Exponential growth weights to bias later milestones
    const growthFactor = 1.35;
    const weights = Array.from({ length: count }, (_, i) =>
      Math.pow(growthFactor, i)
    );
    const sumWeights = weights.reduce((a, b) => a + b, 0);
    const rawPercents = weights.map(w => (w / sumWeights) * 100);

    // Ensure first milestone gets at least a minimal percentage
    const MIN_FIRST = 8; // minimum 8%
    if (rawPercents[0] < MIN_FIRST) {
      const delta = MIN_FIRST - rawPercents[0];
      rawPercents[0] = MIN_FIRST;
      // subtract delta from the last milestone (most weighted)
      rawPercents[count - 1] = Math.max(0, rawPercents[count - 1] - delta);
    }

    // Largest Remainder Method to make integers summing to 100
    const floors = rawPercents.map(p => Math.floor(p));
    const remainder = 100 - floors.reduce((a, b) => a + b, 0);
    const remainders = rawPercents.map((p, i) => ({ i, frac: p - floors[i] }));
    remainders.sort((a, b) => b.frac - a.frac);
    for (let k = 0; k < remainder; k += 1) {
      floors[remainders[k % remainders.length].i] += 1;
    }

    return ms.map((m, i) => ({ ...m, fundPercentage: String(floors[i]) }));
  };

  const handleAddMilestone = () => {
    if (milestones.length >= 6) {
      toast.error('Maximum 6 milestones allowed');
      return;
    }

    const newMilestone: Milestone = {
      id: (milestones.length + 1).toString(),
      title: '',
      description: '',
      deliveryDate: '',
      fundPercentage: '',
      isExpanded: true,
    };

    // Expand only the newly added milestone
    let updated = [
      ...milestones.map(m => ({ ...m, isExpanded: false })),
      newMilestone,
    ];
    updated = allocateFundPercentages(updated);
    onChange?.(updated, isValid(updated));
  };

  const handleUpdateMilestone = (updatedMilestone: Milestone) => {
    // If the updated milestone is being expanded, collapse others
    if (updatedMilestone.isExpanded) {
      const updated = milestones.map(m =>
        m.id === updatedMilestone.id
          ? { ...updatedMilestone, isExpanded: true }
          : { ...m, isExpanded: false }
      );
      onChange?.(updated, isValid(updated));
      return;
    }

    // Otherwise, just update the fields without changing others
    const updated = milestones.map(m =>
      m.id === updatedMilestone.id ? updatedMilestone : m
    );
    onChange?.(updated, isValid(updated));
  };

  const handleDeleteMilestone = (id: string) => {
    let remaining = milestones.filter(m => m.id !== id);
    if (remaining.length === 0) {
      onChange?.(remaining, isValid(remaining));
      return;
    }

    // Ensure at least one remains expanded
    const anyExpanded = remaining.some(m => m.isExpanded);
    if (!anyExpanded) {
      remaining[0] = { ...remaining[0], isExpanded: true };
    }
    remaining = allocateFundPercentages(remaining);
    onChange?.(remaining, isValid(remaining));
  };

  // Keep onNext for backward compatibility (not used when parent renders actions)

  return (
    <div className='w-full  mx-auto space-y-6'>
      {/* Milestones List */}
      <div className='space-y-4'>
        {milestones.map(milestone => (
          <MilestoneForm
            key={milestone.id}
            milestone={milestone}
            onUpdate={handleUpdateMilestone}
            onDelete={handleDeleteMilestone}
            totalMilestones={milestones.length}
          />
        ))}
      </div>

      {/* Add Milestone Button */}
      {milestones.length < 6 && (
        <div className=''>
          <Label className='text-xs font-medium text-white flex justify-between items-center mb-3'>
            Milestone {milestones.length + 1}
          </Label>
          <Button
            onClick={handleAddMilestone}
            className='!w-full  p-5 rounded-[12px] bg-[#1C1C1C] border border-[#2B2B2B] text-[#787878] flex justify-between items-center'
          >
            <span>Add Milestone</span>
            <Plus className='w-4 h-4' />
          </Button>
        </div>
      )}

      {/* Actions are rendered by parent (Initialize) */}
    </div>
  );
};

export default MilestoneManager;
