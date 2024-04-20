import React, { ChangeEvent } from 'react';
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
  ...restProps
}) => {
  return (
    <div>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
          'flex h-20',
          disabled && 'opacity-80',
          'transform-all duration-[50ms] ease-in-out',
          'rounded placeholder:text-opacity-50',
          'bg-input-background-light dark:bg-input-background-dark ',
          'border-[2px] border-input-stroke-light  dark:border-input-background-dark',
          !disabled && 'dark:hover:bg-button-background-dark',
          className
        )}
      >
        <textarea
          placeholder={placeholder}
          className={cn(
            'w-full rounded bg-transparent px-4 py-2 placeholder:text-ellipsis placeholder:text-[13px] placeholder:text-opacity-50 focus:outline-primary'
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

export default TextArea;
