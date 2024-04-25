import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';

type ToggleButtonProps = {
  onToggle?: () => void;
  isToggled: boolean;
  className?: string;
  children?: React.ReactNode;
  rest?: any;
};

const ToggleButton = ({ onToggle, isToggled, rest, children, className }: ToggleButtonProps) => {
  return (
    <button
      type='button'
      onClick={onToggle}
      className={cn(
        'duration-1 00 rounded-full border-2 border-primary-bold/40 bg-transparent px-4 py-2 font-medium text-primary-bold transition-all ',
        isToggled ? 'bg-primary text-on-primary' : 'hover:bg-primary-bold/20',
        className
      )}
      {...rest}
    >
      <div className='flex items-center justify-center space-x-2'>
        <Check
          size='1rem'
          className={cn(
            'w-0 text-on-primary opacity-0 transition-all duration-300',
            isToggled ? 'w-fit opacity-100' : 'hidden'
          )}
        ></Check>
        <div>{children}</div>
      </div>
    </button>
  );
};

export default ToggleButton;
