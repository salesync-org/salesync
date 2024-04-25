import { cn } from '@/utils/utils';
import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '16px', height = '16px', borderRadius = '12px', className }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius
      }}
      className={cn('animate-pulse bg-slate-600', className)}
    />
  );
};

export default Skeleton;
