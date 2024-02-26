import React from 'react';
import buttonVariants, { ButtonProps } from 'ui/Button/ButtonProps';

const Button: React.FC<ButtonProps> = ({
  onClick,
  layoutClassName,
  className,
  disabled,
  children,
  intent,
  rounded,
  header,
  showHeader = true,
  type = 'button',
  ...restProps
}) => {
  return (
    <div className={layoutClassName}>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <button
        className={buttonVariants({ intent, rounded, className })}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...restProps}
      >
        <div className='flex items-center justify-center space-x-2'>{children}</div>
      </button>
    </div>
  );
};

export default Button;
