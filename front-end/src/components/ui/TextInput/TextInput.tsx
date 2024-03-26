import React, { ChangeEvent, FocusEvent } from 'react';
import { Icon } from '@/components/ui';
import { cn } from 'utils/utils';

interface TextInputProps {
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
  restProps?: React.HTMLAttributes<HTMLInputElement>;
  isPassword?: boolean;
}
const TextInput: React.FC<TextInputProps> = ({
  value,
  placeholder,
  className,
  disabled = false,
  header,
  showHeader = true,
  prefixIcon,
  isPassword = false,
  onChange,
  name = '',
  register = () => ({}),
  ...restProps
}) => {
  return (
    <>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
          'relative flex h-10 items-center justify-start align-middle w-64',
          disabled ? 'opacity-80' : 'active:scale-x-[99%] active:scale-y-[99%]',
          'transform-all duration-[50ms] ease-in-out',
          'rounded placeholder:text-opacity-50',
          'bg-input-background-light dark:bg-input-background-dark ',
          'border-[1px] border-input-stroke-light  dark:border-input-background-dark',
          !disabled && 'hover:bg-button-background-light dark:hover:bg-button-background-dark',
          className
        )}
      >
        <input
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          className={cn(
            'h-full w-full absolute rounded bg-transparent py-2 pr-2 placeholder:text-opacity-50 focus:outline-primary',
            prefixIcon ? 'pl-10' : 'pl-4'
          )}
          value={value}
          disabled={disabled}
          onChange={onChange}
          {...register(name)}
          {...restProps}
        />
        <div className='relative flex h-full items-center justify-start rounded px-4'>
          <div className=' absolute flex items-center top-0 bottom-0 w-4'>{prefixIcon && <Icon className='' name={prefixIcon} />}</div>
        </div>
      </div>
    </>
  );
};

export default TextInput;
