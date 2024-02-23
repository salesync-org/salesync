import React from 'react';

type ButtonProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  header?: string;
  showHeader?: boolean;
  children: React.ReactNode;
};

const PrimaryButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
  header,
  showHeader = true
}) => {
  return (
    <div className='w-fit'>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <button
        className={`rounded border-2 border-primary-stroke bg-primary px-4
                py-2 text-on-primary 
                enabled:scale-100 enabled:hover:scale-105 enabled:hover:bg-primary-hover enabled:active:translate-y-[0.1rem] 
                enabled:active:bg-primary-active enabled:active:text-opacity-80 disabled:opacity-80 dark:border-primary-stroke-dark ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className='flex items-center justify-center space-x-2'>{children}</div>
      </button>
    </div>
  );
};

export default PrimaryButton;
