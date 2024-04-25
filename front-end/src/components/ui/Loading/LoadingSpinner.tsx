import { cn } from '@/utils/utils';

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={cn('flex h-full w-full items-center justify-center space-x-2 bg-white/80', className)}>
      <div className='animate-ping'>
        <div className='grid animate-spin grid-cols-3 gap-y-1'>
          <div className='relative left-[-6px] top-[-1px] h-2 w-2 animate-pulse rounded-full bg-primary-color'></div>
          <div className='relative top-[-10px] h-2 w-2 animate-pulse rounded-full bg-primary-color'></div>
          <div className='relative right-[-6px] top-[-1px] h-2 w-2 animate-pulse rounded-full bg-primary-color'></div>
          <div className='relative bottom-[-1px] left-[-6px] h-2 w-2 animate-pulse rounded-full bg-primary-color'></div>
          <div className='relative bottom-[-10px] h-2 w-2 animate-pulse rounded-full bg-primary-color'></div>
          <div className='relative bottom-[-1px] right-[-6px] h-2 w-2 animate-pulse rounded-full bg-primary-color'></div>
        </div>
      </div>
    </div>
  );
};

export const ScreenLoading = () => {
  return (
    <div className='pointer-events-auto fixed inset-0 z-[99999] flex items-center justify-center bg-white bg-opacity-5'>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingSpinner;
