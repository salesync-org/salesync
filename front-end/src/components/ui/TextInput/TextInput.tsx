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
  prefixIconNode?: React.ReactNode;
  paddingLeft?: string;
  postfixIcon?: string;
  isError?: boolean;
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
  prefixIconNode = null,
  paddingLeft = 'pl-[55px]',
  postfixIcon,
  isPassword = false,
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
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          className={cn(
            'absolute h-full w-full rounded bg-transparent py-2 pr-2 placeholder:text-ellipsis placeholder:text-[13px] placeholder:text-opacity-50 focus:outline-primary',
            prefixIcon ? 'pl-10' : cn(prefixIconNode ? paddingLeft : 'pl-4'),
            postfixIcon ? 'pr-10' : 'pr-2',
            isError && 'placeholder:font-medium placeholder:text-red-500 focus-visible:outline-red-400'
          )}
          value={value}
          disabled={disabled}
          onChange={onChange}
          {...register(name)}
          {...restProps}
        />
        <div className='relative flex h-full items-center justify-start rounded px-4'>
          <div className=' absolute bottom-0 top-0 flex w-4 items-center'>
            {prefixIcon && <Icon className='' name={prefixIcon} />}
          </div>
        </div>

        <div className='absolute bottom-0 top-0 -left-3 flex h-full items-center justify-start rounded px-4'>
          {prefixIconNode}
        </div>

        <div className='absolute right-3 flex h-full items-center justify-start rounded px-4'>
          <div className=' absolute bottom-0 top-0 flex w-4 items-center'>
            {postfixIcon && <Icon className='' name={postfixIcon} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
