import React, { useEffect, useRef, useState } from 'react';
import { useDropDownList } from 'hooks/useDropDownList';
import { cn } from 'utils/utils';
import useClickOutside from '@/hooks/useClickOutside';

interface ListProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  align?: 'left' | 'right' | null;
  divide?: boolean;
  onItemClick?: (option: HTMLElement) => void;
  restProps?: React.HTMLAttributes<HTMLDivElement>;
}

const List = ({
  children,
  open = false,
  divide = false,
  className,
  align = null,
  onItemClick,
  ...restProps
}: ListProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(!open);
  const { shouldDropUp } = useDropDownList({ ref: menuRef, open });
  useClickOutside([menuRef], () => setIsOpen(false));
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open != isOpen ? open : !open);
    }
  }, [open]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      let target = event.target as HTMLElement;
      while (target && target !== event.currentTarget) {
        if (target.parentNode === event.currentTarget) {
          onItemClick!(target);
          break;
        }
        target = target.parentNode as HTMLElement;
      }
    }
    if (event.key === 'Escape') {
    }
    setIsOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLElement;
    while (target && target !== event.currentTarget) {
      if (target.parentNode === event.currentTarget) {
        handleOptionClick(target);
        break;
      }
      target = target.parentNode as HTMLElement;
    }
  };

  const handleOptionClick = (option: HTMLElement) => {
    onItemClick && onItemClick(option);
    setIsOpen(false);
  };

  return (
    <>
      {/* <div ref={menuRef} className={cn(isOpen && 'fixed left-0 right-0 top-0 z-[51] w-[1500px] h-[1500px] bg-blue')} onClick={()=>{setIsOpen(false)}}/> */}
      <div ref={menuRef}>
        <div
          className={cn(
            'absolute z-[50] backdrop-blur-2xl max-h-[400px] overflow-y-auto overflow-x-hidden rounded border-2 px-2 transition-all duration-100 ease-in-out',
            align === 'left' && 'left-0',
            align === 'right' && 'right-0',
            divide ? 'divide divide-y-2 *:py-2 divide-button-stroke-light dark:divide-button-stroke-dark' : 'py-2',
            'bg-button-background-light dark:bg-button-background-dark',
            'border-button-stroke-light dark:border-button-stroke-dark',
            shouldDropUp ? 'top-[4.8rem] origin-top' : 'bottom-12 origin-bottom',
            align &&
              cn(
                shouldDropUp
                  ? cn(align == 'left' ? 'rounded-tl-none' : 'rounded-tr-none')
                  : cn(align == 'left' ? 'rounded-bl-none' : 'rounded-br-none')
              ),
            isOpen ? 'scale-100' : 'scale-0 *:hidden',
            className
          )}
          onClick={handleMenuClick}
          onKeyDown={handleTabKeyDown}
          {...restProps}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default List;
