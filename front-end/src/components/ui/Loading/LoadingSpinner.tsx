import { cn } from '@/utils/utils';

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={cn('flex h-full w-full items-center justify-center space-x-2 bg-white/80', className)}>
      <div className='grid grid-cols-3 gap-y-1'>
        <div className='relative left-[-5px] h-3 w-3 animate-pulse rounded-full bg-primary-color'></div>
        <div className='relative top-[-10px] h-3 w-3 animate-pulse rounded-full bg-primary-color'></div>
        <div className='relative right-[-5px] h-3 w-3 animate-pulse rounded-full bg-primary-color'></div>
        <div className='relative left-[-5px] h-3 w-3 animate-pulse rounded-full bg-primary-color'></div>
        <div className='relative bottom-[-10px] h-3 w-3 animate-pulse rounded-full bg-primary-color'></div>
        <div className='relative right-[-5px] h-3 w-3 animate-pulse rounded-full bg-primary-color'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
