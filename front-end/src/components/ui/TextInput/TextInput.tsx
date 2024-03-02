import React, { ChangeEvent, useRef } from 'react';
import Icon from 'ui/Icon/Icon';
import { cn } from 'utils/utils';

interface TextInputProps {
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  header?: string;
  showHeader?: boolean;
  prefixIcon?: string;
  restProps?: React.HTMLAttributes<HTMLInputElement>;
}
const TextInput: React.FC<TextInputProps> = ({
  value,
  placeholder,
  className,
  disabled = false,
  header,
  showHeader = true,
  prefixIcon,
  onChange,
  ...restProps
}) => {
  return (
    <>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
            'flex align-middle items-center justify-start h-10',
          disabled ? 'opacity-80' : 'active:scale-x-[99%] active:scale-y-[99%]',
          'transform-all duration-[50ms] ease-in-out',
          'rounded placeholder:text-opacity-50',
          'bg-input-background-light dark:bg-input-background-dark',
          'border-2 border-input-stroke-light  dark:border-input-background-dark',
          !disabled && 'hover:bg-button-background-light dark:hover:bg-button-background-dark',
          className
        )}
      >
        <input
          type='text'
          placeholder={placeholder}
          className={cn('w-full h-full rounded py-2 pr-2 placeholder:text-opacity-50 bg-transparent',
          prefixIcon ? 'pl-10' : 'pl-4')}
          value={value}
          disabled={disabled}
          onChange={onChange}
          {...restProps}
        />
        <div className='absolute flex h-fit items-center justify-center rounded px-4 py-2'>
          <div className='h-full w-4'>{prefixIcon && <Icon className='mt-[.4rem]' name={prefixIcon} />}</div>
        </div>
      </div>
    </>
  );
};

export default TextInput;
