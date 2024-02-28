import React, { useEffect, useRef, useState } from 'react';
import { useDropDownList } from 'hooks/useDropDownList';
import { cn } from 'utils/utils';
import useClickOutside from '@/hooks/useClickOutside';

interface ListProps {
  children: React.ReactNode,
  open?: boolean,
  onItemClick?: (option: HTMLElement) => void,
  restProps? : React.HTMLAttributes<HTMLDivElement>
};

const List = ({ children, open = false, onItemClick, ...restProps }: ListProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(!open);
    const {shoulDropUp} = useDropDownList({ref: menuRef, open});
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

  const handleMenuClick = (event : React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLElement;
    while (target && target !== event.currentTarget) {
      if (target.parentNode === event.currentTarget) {
        handleOptionClick(target);
        break;
      }
      target = target.parentNode as HTMLElement;
    }
  }

  const handleOptionClick = (option: HTMLElement) => {
    onItemClick!(option);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          'absolute z-10 max-h-80 overflow-y-auto rounded border-2 px-2 transition-all duration-100 ease-in-out',
          'divide divide-y-2 divide-button-stroke-light dark:divide-button-stroke-dark',
          'bg-button-background-light dark:bg-button-background-dark',
          'border-button-stroke-light dark:border-button-stroke-dark',
          shoulDropUp ? 'top-[4.8rem] origin-top' : 'bottom-12 origin-bottom',
          isOpen ? 'scale-100' : 'scale-0 *:hidden'
          )}
        onClick={handleMenuClick}
        onKeyDown={handleTabKeyDown}
        {...restProps}
        >
        <div ref={menuRef}></div>
        {children}
      </div>
    </>
  );
}

export default List;