import React, { useState } from 'react';
import { cn } from 'utils/utils';

type ButtonProps = {
  onClick: (value: boolean) => void;
  className?: string;
  checked: boolean;
  disabled?: boolean;
  label?: string;
  header?: string;
  showHeader?: boolean;
};

const Switch: React.FC<ButtonProps> = ({ onClick, className, disabled, label, checked, header, showHeader = true }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleOnClick = () => {
    if (disabled) return;
    const temp = !isChecked
    setIsChecked(temp);
    onClick(temp);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleOnClick();
    }
  };

  return (
    <div className='w-fit'>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <div
        className={cn(
          disabled ? 'opacity-80' : 'cursor-pointer hover:scale-105 active:scale-100',
          'inline-flex items-center rounded-full',
          'border-[1px] border-button-stroke dark:border-button-stroke-dark focus:outline-primary',
          className
        )}
        onClick={handleOnClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? undefined : 0}
      >
        <input
          type='checkbox'
          aria-label={label ? label : ' '}
          value=''
          checked={isChecked}
          disabled={disabled}
          tabIndex={-1}
          className='peer sr-only'
          onChange={() => {}}
        />
        <div
          className={cn(
            'peer relative h-6 w-11 rounded-full',
            'after:h-5 after:w-5 after:transition-all after:ease-in-out',
            'bg-input-stroke-light  dark:border-x-input-stroke-dark dark:bg-input-stroke-dark',
            'peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full',
            "  after:bord-input-stroke after:absolute after:start-[2px] after:top-[2px] after:rounded-full after:border after:bg-white after:content-['']"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
