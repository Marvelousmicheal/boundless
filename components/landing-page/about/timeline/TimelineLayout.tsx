// components/DashboardLayout.tsx
import React, { ReactNode } from 'react';
type TimelineLayoutProps = {
  children: ReactNode;
};

const TimelineLayout = ({ children }: TimelineLayoutProps) => {
  return (
    <main className='relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-5'>
      {children}
    </main>
  );
};

export default TimelineLayout;
