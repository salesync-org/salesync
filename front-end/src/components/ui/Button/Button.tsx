import { cn } from '@/utils/utils';
import React from 'react';
import buttonVariants, { ButtonProps } from 'ui/Button/ButtonProps';

const Button: React.FC<ButtonProps> = ({
  layoutClassName,
  className,
  disabled,
  children,
  intent,
  rounded,
  zoom,
  header,
  showHeader = true,
  type = 'button',
  onClick,
  ...restProps
}) => {
  return (
    <>
      {showHeader && header && <p className='my-1'>{header}</p>}
      <button
        className={cn(buttonVariants({ intent, rounded, zoom }),  'flex items-center justify-center space-x-1', 
        !rounded && 'first:rounded-tl last:rounded-tr first:rounded-bl last:rounded-br last:border-r-[1px]', className)}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...restProps}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
