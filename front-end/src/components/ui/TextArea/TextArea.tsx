/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from 'react';
import { FieldName, FieldValues, RegisterOptions } from 'react-hook-form';
import { cn } from 'utils/utils';

interface TextAreaProps {
  header?: string;
  showHeader?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  isRequired?: boolean;
  isError?: boolean;
  validation?: RegisterOptions<FieldValues, FieldName<any>>;
  restProps?: React.HTMLAttributes<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({
  header,
  showHeader = true,
  placeholder,
  className,
  disabled,
  value,
  onChange,
  name = '',
  register = () => ({}),
  isError = false,
  isRequired = false,
  validation = {},
  ...restProps
}) => {
  return (
    <div>
      {showHeader && header && (
        <p className={cn('relative my-1', isError && 'font-medium text-red-500')}>
          {header}
          {isRequired && (
            <span className='ml-2 size-1 rounded-full text-red-400' title='Required'>
              *
            </span>
          )}
        </p>
      )}
      <div
        className={cn(
          'flex',
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
        <textarea
          placeholder={placeholder}
          name={name}
          className={cn(
            'w-full rounded bg-transparent px-4 py-2 placeholder:text-ellipsis placeholder:text-[13px] placeholder:text-opacity-50 focus:outline-primary',
            isError && 'placeholder:font-medium placeholder:text-red-500 focus-visible:outline-red-400'
          )}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...register(name, validation)}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default TextArea;
