import { cn } from '@/utils/utils';
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
    <div className={cn(layoutClassName)}>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <button
        className={cn(buttonVariants({ intent, rounded, className }), 'flex items-center justify-center space-x-2')}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
