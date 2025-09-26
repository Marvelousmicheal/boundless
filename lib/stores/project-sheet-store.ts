'use client';

import { create } from 'zustand';
import type { Project } from '@/types/project';

type ProjectSheetMode = 'initialize' | 'validate';

interface ProjectSheetState {
  open: boolean;
  mode: ProjectSheetMode;
  project?: Project;
  openInitialize: () => void;
  openValidate: (project: Project) => void;
  setOpen: (open: boolean) => void;
  reset: () => void;
}

export const useProjectSheetStore = create<ProjectSheetState>(set => ({
  open: false,
  mode: 'initialize',
  project: undefined,
  openInitialize: () =>
    set({ open: true, mode: 'initialize', project: undefined }),
  openValidate: (project: Project) =>
    set({ open: true, mode: 'validate', project }),
  setOpen: (open: boolean) => set({ open }),
  reset: () => set({ open: false, mode: 'initialize', project: undefined }),
}));
