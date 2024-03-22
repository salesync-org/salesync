import React, { useEffect, useRef, useState } from 'react';
import { useDropDownList } from 'hooks/useDropDownList';
import { cn } from 'utils/utils';
import {Popup } from '..';

interface ListProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  align?: 'left' | 'right' | null;
  divide?: boolean;
  onItemClick?: (option: HTMLElement) => void;
  onClose?: () => void;
  restProps?: React.HTMLAttributes<HTMLDivElement>;
}

const List = ({
  children,
  open = false,
  divide = false,
  className,
  align = null,
  onItemClick,
  onClose,
  ...restProps
}: ListProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(open);
  const { shouldDropUp } = useDropDownList({ ref: menuRef, open });
  // useClickOutside([menuRef], () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleOptionClick(event.target as HTMLElement);
    }
  };

  const handleOptionClick = (option: HTMLElement) => {
    let target = option as HTMLElement;
    while (target) {
      if (target.parentNode instanceof HTMLDivElement) {
        const inputNode = target.parentNode.querySelector('input');
        if (inputNode) {
          onItemClick?.(inputNode as HTMLElement);
          target = inputNode;
          setIsOpen(false);
          return;
        }
      }
      target = target.parentNode as HTMLElement;
    }
    onItemClick?.(target);
    setIsOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    handleOptionClick(event.target as HTMLElement);
  };

  return (
    <>
      {/* <div ref={menuRef} className={cn(isOpen && 'fixed left-0 right-0 top-0 z-[51] w-[1500px] h-[1500px] bg-blue')} onClick={()=>{setIsOpen(false)}}/> */}
        <div ref={menuRef}>
          <Popup
            className={cn(
              'absolute z-[50] backdrop-blur-2xl max-h-[400px] overflow-y-auto overflow-x-hidden rounded border-[1px] px-2 transition-all duration-100 ease-in-out',
              align === 'left' && 'left-0',
              align === 'right' && 'right-0',
              divide ? 'divide divide-y-2 *:py-2 divide-button-stroke-light dark:divide-button-stroke-dark' : 'py-2',
              'bg-button-background-light dark:bg-button-background-dark',
              'border-button-stroke-light dark:border-button-stroke-dark',
              shouldDropUp ? 'top-12 origin-bottom' : 'bottom-12 origin-top',
              align &&
                cn(
                  shouldDropUp
                    ? cn(align == 'left' ? 'rounded-tl-none' : 'rounded-tr-none')
                    : cn(align == 'left' ? 'rounded-bl-none' : 'rounded-br-none')
                    ),
                    isOpen ? 'scale-100' : 'scale-0 *:hidden',
              className
              )}
              isOpen={isOpen}
              onClick={handleMenuClick}
            onClose={() => {onClose?.()}}
              onKeyDown={handleTabKeyDown}
              {...restProps}
              >
            {children}
          </Popup>
        </div>
    </>
  );
};

export default List;
