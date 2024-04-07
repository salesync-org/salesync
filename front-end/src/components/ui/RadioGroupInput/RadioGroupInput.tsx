import * as RadioGroup from '@radix-ui/react-radio-group';
import { cn } from '@/utils/utils';

interface RadioGroupProps {
  labels: string[];
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  inCircleSize?: string;
  outCircleSize?: string;
}

const RadioGroupInput: React.FC<RadioGroupProps> = ({
  labels,
  className,
  value,
  onValueChange,
  outCircleSize = '18px',
  inCircleSize = '10px'
}) => {
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
              `h-[${outCircleSize}] w-[${outCircleSize}]`,
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
                `after:h-[${inCircleSize}] after:w-[${inCircleSize}]`
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
