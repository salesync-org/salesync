import React, { ChangeEvent, FocusEvent } from 'react';
import { Icon } from '@/components/ui';
import { cn } from 'utils/utils';

interface NumberTextProps {
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  header?: string;
  showHeader?: boolean;
  prefixIcon?: string;
  isError?: boolean;
  defaultValue?: number;
  min?: number;
  restProps?: React.HTMLAttributes<HTMLInputElement>;
}
const NumberText: React.FC<NumberTextProps> = ({
  value,
  placeholder,
  className,
  disabled = false,
  header,
  showHeader = true,
  defaultValue,
  min,
  prefixIcon,
  isError = false,
  onChange,
  name = '',
  register = () => ({}),
  ...restProps
}) => {
  return (
    <div>
      {showHeader && header && <p className={cn('my-1', isError && 'font-medium text-red-500')}>{header}</p>}
      <div
        className={cn(
          'relative flex h-10 w-64 items-center justify-start align-middle',
          disabled && 'opacity-80',
          'transform-all duration-[50ms] ease-in-out',
          'rounded placeholder:text-opacity-50',
          'bg-input-background-light dark:bg-input-background-dark ',
          'border-[2px] border-input-stroke-light  dark:border-input-background-dark',
          !disabled && 'dark:hover:bg-button-background-dark',
          isError && 'border-red-400 ring-1 ring-red-300',
          className
        )}
      >
        <input
          type='number'
          placeholder={placeholder}
          className={cn(
            'absolute h-full w-full rounded bg-transparent py-2 pr-2 placeholder:text-ellipsis placeholder:text-[13px] placeholder:text-opacity-50 focus:outline-primary',
            prefixIcon ? 'pl-10' : 'pl-4',
            isError && 'placeholder:font-medium placeholder:text-red-500 focus-visible:outline-red-400'
          )}
          disabled={disabled}
          onChange={onChange}
          {...register(name)}
          name={name}
          defaultValue={defaultValue}
          min={min}
          {...restProps}
        />
        <div className='relative flex h-full items-center justify-start rounded px-4'>
          <div className=' absolute bottom-0 top-0 flex w-4 items-center'>
            {prefixIcon && <Icon className='' name={prefixIcon} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberText;
