import React from 'react';

type ButtonProps = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  type?: 'button' | 'submit' | 'reset';
};
const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
  header,
  showHeader = true,
  type = 'button'
}) => {
  return (
    <div>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <button
        className={`rounded border-2 border-button-stroke bg-button-background px-4 py-2 text-text-light
                enabled:scale-100 enabled:hover:scale-105
                enabled:hover:bg-button-background-hover enabled:active:translate-y-[0.1rem] enabled:active:scale-100
                enabled:active:bg-button-background-active enabled:active:text-opacity-80 disabled:opacity-80 dark:border-button-stroke-dark dark:bg-button-background-dark
                dark:text-text-dark dark:enabled:hover:bg-button-background-hover-dark dark:enabled:active:bg-button-background-active-dark ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <div className='flex items-center justify-center space-x-2'>{children}</div>
      </button>
    </div>
  );
};

export default Button;
