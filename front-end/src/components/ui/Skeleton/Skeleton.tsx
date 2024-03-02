import React from 'react';

interface SkeletonProps {
  width: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height = '16px', borderRadius = '12px' }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius
      }}
      className='animate-pulse bg-slate-600'
    />
  );
};

export default Skeleton;
