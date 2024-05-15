import { cn } from '@/utils/utils';
import './style.css';

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center space-x-2 bg-white/80 dark:bg-panel-dark',
        className
      )}
    >
      <div className='spinner scale-75'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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
