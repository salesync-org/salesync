import React, { useEffect, useRef, useState } from 'react';
import { useDropDownList } from 'hooks/useDropDownList';
import { cn } from 'utils/utils';
import { Popup } from '..';
import useResize from '@/hooks/useResize';

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
  const [aboveSize, belowSize] = useResize(menuRef, isOpen);
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

  const calculateMaxSize = () => {
    if (align) {
      return window.innerHeight - 10;
    }
    return shouldDropUp ? Math.max(aboveSize - 30, 0) : Math.max(belowSize - 30, 0);
  };

  return (
    <>
      <div className='bg-transparent'></div>
      {/* <div ref={menuRef} className={cn(isOpen && 'fixed left-0 right-0 top-0 z-[51] w-[1500px] h-[1500px] bg-blue')} onClick={()=>{setIsOpen(false)}}/> */}
      <div style={{ maxHeight: calculateMaxSize(), overflow: 'auto' }} ref={menuRef} className='bg-transparent'>
        <Popup
          style={{ maxHeight: calculateMaxSize(), overflow: 'auto' }}
          className={cn(
            'absolute z-[50] h-fit overflow-x-hidden rounded border-[2px] px-2 transition-all duration-100 ease-in-out',
            align === 'left' && 'left-0',
            align === 'right' && 'right-0',
            divide ? 'divide divide-y-2 divide-button-stroke-light *:py-2 dark:divide-button-stroke-dark' : 'py-2',
            'bg-button-background-light dark:bg-button-background-dark',
            'border-button-stroke-light/60 dark:border-button-stroke-dark/60',
            shouldDropUp ? 'bottom-10 origin-center' : 'top-[60px] origin-center',
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
          onClose={() => {
            onClose?.();
          }}
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
