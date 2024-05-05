import React, { useEffect, useRef, useState } from 'react';
import { useDropDownList } from 'hooks/useDropDownList';
import { cn } from 'utils/utils';
import { Popup } from '..';
import useResize from '@/hooks/useResize';

interface ListProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  isHaveHeader?: boolean;
  align?: 'left' | 'right' | null;
  divide?: boolean;
  onItemClick?: (option: HTMLElement) => void;
  onClose?: () => void;
  restProps?: React.HTMLAttributes<HTMLDivElement>;
}

const List = ({
  children,
  maxHeight = 0,
  maxWidth = 0,
  isHaveHeader = false,
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
    console.log('event.key: ', event.key);
    if (event.key === 'Enter') {
      const options = menuRef.current?.querySelectorAll('a');
      if (options) {
        console.log('href');
        console.log(options![0].getAttribute('href'));
        if (
          options![0].getAttribute('href') !== 'javascript:void(0)' &&
          options![0].getAttribute('href') !== undefined &&
          options![0].getAttribute('href') !== null &&
          options![0].getAttribute('href') !== '#'
        ) {
          handleOptionClick(options![0] as HTMLAnchorElement);
        }
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      isOpen && setIsOpen(false);
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const options = menuRef.current?.querySelectorAll('a');
      if (options && options.length > 0) {
        const currentIndex = Array.from(options).findIndex((option) => option === document.activeElement);
        const nextIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
        options[nextIndex]?.focus();
      }
    }

    if (event.key === 'ArrowUp') {
      // Handle arrow up logic here
      const options = menuRef.current?.querySelectorAll('a');
      if (options && options.length > 0) {
        const currentIndex = Array.from(options).findIndex((option) => option === document.activeElement);
        const nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
        options[nextIndex]?.focus();
      }
    }
    if (event.key === 'ArrowDown') {
      const options = menuRef.current?.querySelectorAll('a');
      if (options && options.length > 0) {
        const currentIndex = Array.from(options).findIndex((option) => option === document.activeElement);
        const nextIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
        options[nextIndex]?.focus();
      }
    }
  };

  const handleOptionClick = (option: HTMLElement) => {
    if (option instanceof HTMLInputElement) {
      onItemClick?.(option);
      setIsOpen(false);
      return;
    }

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

  const calculateMaxHeight = () => {
    if (maxHeight > 0) return maxHeight;
    if (align) {
      return window.innerHeight - 10;
    }
    return shouldDropUp ? Math.max(aboveSize - 30, 0) : Math.max(belowSize - 30, 0);
  };

  const calculateMaxWidth = () => {
    if (maxWidth > 0) return maxWidth;
    return 'none';
  };

  return (
    <>
      <div className='bg-transparent'></div>
      <div className='bg-transparent'></div>
      {/* <div ref={menuRef} className={cn(isOpen && 'fixed left-0 right-0 top-0 z-[51] w-[1500px] h-[1500px] bg-blue')} onClick={()=>{setIsOpen(false)}}/> */}
      <div
        style={{ maxHeight: calculateMaxHeight(), overflow: 'auto', maxWidth: calculateMaxWidth() }}
        ref={menuRef}
        className='bg-transparent'
      >
        <Popup
          style={{ maxHeight: calculateMaxHeight(), overflow: 'auto', maxWidth: calculateMaxWidth() }}
          className={cn(
            'absolute z-[1000] h-fit overflow-x-hidden rounded-xl border-[2px] px-2 transition-all duration-100 ease-in-out',
            divide ? 'divide divide-y-2 divide-button-stroke-light *:py-2 dark:divide-button-stroke-dark' : 'py-2',
            'bg-button-background-light dark:bg-button-background-dark',
            'border-button-stroke-light/60 dark:border-button-stroke-dark/60',
            shouldDropUp ? 'bottom-[40px] origin-center' : 'top-[40px] origin-center',
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
