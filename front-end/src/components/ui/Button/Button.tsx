import { cn } from '@/utils/utils';
import React from 'react';
import buttonVariants, { ButtonProps } from 'ui/Button/ButtonProps';

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    className,
    disabled,
    intent,
    rounded,
    zoom,
    header,
    showHeader = true,
    headerClassName = '',
    type = 'button',
    onClick,
    ...restProps
  },
  ref: React.Ref<HTMLButtonElement>
) => {
  return (
    <>
      {showHeader && header && <p className={cn('my-1', headerClassName)}>{header}</p>}
      <button
        ref={ref}
        className={cn(
          buttonVariants({ intent, rounded, zoom }),
          'flex items-center justify-center space-x-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !rounded && 'first:rounded-bl first:rounded-tl last:rounded-br last:rounded-tr last:border-r-[2px]',
          className
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...restProps}
      />
    </>
  );
};

export default React.forwardRef(Button);
