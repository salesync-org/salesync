import * as RadioGroup from '@radix-ui/react-radio-group';
import { cn } from '@/utils/utils';

interface RadioGroupProps {
  labels: string[];
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  size?: 'small' | 'medium' | 'big';
}

const RadioGroupInput: React.FC<RadioGroupProps> = ({ labels, className, value, onValueChange, size = 'medium' }) => {
  return (
    <RadioGroup.Root
      className={cn('flex flex-col gap-1', className)}
      defaultValue='default'
      aria-label='View density'
      value={value}
      onValueChange={onValueChange}
    >
      {labels.map((label, index) => (
        <div className='flex items-center'>
          <RadioGroup.Item
            className={cn(
              size === 'medium'
                ? 'h-[20px] w-[20px]'
                : cn(size === 'small' ? 'h-[16px] w-[16px]' : 'h-[24px] w-[24px]'),
              'rounded-full border border-text bg-panel outline-none',
              'focus:border-primary focus:shadow-[0_0_2px_2px] focus:shadow-blue-200'
            )}
            value={label}
            id={index.toString()}
          >
            <RadioGroup.Indicator
              className={cn(
                'relative flex h-full w-full items-center justify-center',
                "after:block after:rounded-[50%] after:bg-primary after:content-['']",
                size === 'medium'
                  ? 'after:h-[10px] after:w-[10px]'
                  : cn(size === 'small' ? 'after:h-[8px] after:w-[8px]' : 'after:h-[12px] after:w-[12px]')
              )}
            />
          </RadioGroup.Item>
          <label className='pl-3' htmlFor={index.toString()}>
            {label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  );
};

export default RadioGroupInput;
