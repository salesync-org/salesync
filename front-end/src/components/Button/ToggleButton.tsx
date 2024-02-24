import React, { useState } from 'react';

type ButtonProps = {
  onClick: () => void;
  className?: string;
  checked: boolean;
  disabled?: boolean;
  label?: string;
  header?: string;
  showHeader?: boolean;
};

const ToggleButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  label,
  checked,
  header,
  showHeader = true
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleOnClick = () => {
    if (disabled) return;
    setIsChecked(!isChecked);
    onClick();
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
        className={`${className} ${disabled ? 'opacity-80' : 'cursor-pointer hover:scale-105 active:scale-100'} inline-flex items-center rounded-full border-2 border-button-stroke dark:border-button-stroke-dark`}
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
        <div className="after:bord-input-stroke peer relative h-6 w-11 rounded-full bg-input-stroke-light after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-x-input-stroke-dark dark:bg-input-stroke-dark rtl:peer-checked:after:-translate-x-full"></div>
      </div>
    </div>
  );
};

export default ToggleButton;
