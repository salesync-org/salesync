import React, { ChangeEvent } from 'react';
import { cn } from 'utils/utils';

interface DateInputProps {
  header?: string;
  showHeader?: boolean;
  type: string; // 'date' or 'time'
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  restProps?: React.HTMLAttributes<HTMLInputElement>;
}

const DateInput: React.FC<DateInputProps> = ({
  header,
  showHeader = true,
  type,
  placeholder,
  className,
  disabled,
  value,
  onChange,
  name = '',
  register = () => ({}),
  ...restProps
}) => {
  return (
    <div>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
          'flex h-fit',
          disabled && 'opacity-80',
          'transform-all duration-[50ms] ease-in-out',
          'rounded placeholder:text-opacity-50',
          'bg-input-background-light dark:bg-input-background-dark ',
          'border-[2px] border-input-stroke-light  dark:border-input-background-dark',
          !disabled && 'dark:hover:bg-button-background-dark',
          className
        )}
      >
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full rounded bg-transparent px-1 py-2 placeholder:text-ellipsis placeholder:text-opacity-50 focus:outline-primary'
          )}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...register(name)}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default DateInput;
