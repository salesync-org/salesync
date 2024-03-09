import { cn } from '@/utils/utils';
import React from 'react';

const Panel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('m-4 rounded-lg bg-panel-light px-10 py-12 dark:bg-panel-dark', className)}>{children}</div>
  );
};

export default Panel;
