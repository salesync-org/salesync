import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import Icon from '../Icon/Icon';
import { cn } from '../../../utils/utils';

interface TextInputProps {
  value: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
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
  const [inputValue, setInputValue] = useState(value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange!(event.target.value);
    } else {
      setInputValue(event.target.value);
    }
  };

  return (
    <div>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
          'relative flex align-middle',
          disabled ? 'opacity-80' : 'hover:scale-105 hover:focus:scale-100 active:hover:scale-100'
        )}
      >
        <input
          type='text'
          placeholder={placeholder}
          className={cn(
            'rounded py-2 pr-2 placeholder:text-opacity-50',
            'bg-input-background-light dark:bg-input-background-dark',
            'border-2 border-input-stroke-light  dark:border-input-background-dark',
            !disabled && 'hover:bg-button-background-light dark:hover:bg-button-background-dark',
            prefixIcon ? 'pl-10' : 'pl-4',
            className
          )}
          value={inputValue}
          disabled={disabled}
          onChange={handleChange}
          {...restProps}
        />
        <div className='absolute flex h-fit items-center justify-center rounded px-4 py-2'>
          <div className='h-full w-4'>{prefixIcon && <Icon className='mt-[.4rem]' name={prefixIcon} />}</div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
