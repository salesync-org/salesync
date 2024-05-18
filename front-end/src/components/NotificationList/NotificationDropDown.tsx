import React, { useRef } from 'react';
import { cn } from 'utils/utils';
import { Triangle } from '../SaleSyncIcons';
import useClickOutside from '@/hooks/useClickOutside';

interface ListProps {
  children: React.ReactNode;
  className?: string;
  triggerRef: React.RefObject<HTMLElement>;
  open?: boolean;
  divide?: boolean;
  onClose?: () => void;
  restProps?: React.HTMLAttributes<HTMLDivElement>;
}

const List = ({ children, triggerRef, open = false, divide = false, className, onClose, ...restProps }: ListProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  // const [isOpen, setIsOpen] = useState(open);

  useClickOutside([menuRef, triggerRef], () => {
    if (open) {
      onClose?.();
    }
  });

  return (
    <>
      {open && (
        <div
          ref={menuRef}
          className={cn(
            'overflow-y-hidden',
            'fixed right-0 top-[38px] flex max-h-[calc(100vh-38px-1rem)] w-1/4 min-w-[300px] flex-col  align-middle',
            'z-[1000] transition-all duration-100 ease-in-out '
          )}
          {...restProps}
        >
          <div className='absolute left-0 right-0 top-0 flex h-[calc(1.6rem)] w-full justify-end overflow-hidden'>
            <Triangle
              width='3rem'
              height='3rem'
              className={cn(
                'mr-[4.5rem] fill-button-background dark:fill-button-background-dark',
                !open && 'hidden',
                'border-0 stroke-button-stroke/60 stroke-[1px] dark:stroke-button-stroke-dark/60'
              )}
            />
          </div>
          <div
            className={cn(
              'mx-2 mt-6 flex-shrink border-[2px] border-button-stroke-light/60 dark:border-button-stroke-dark/60',
              'h-fit bg-button-background-light shadow-lg shadow-black/10 dark:bg-button-background-dark ',
              'flex max-h-full flex-col overflow-x-hidden rounded-xl p-2'
            )}
          >
            <h2 className='my-2 p-4 text-[1.7rem]'>Notifications</h2>
            <div className='max-h-full min-h-[300px] overflow-scroll p-2'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
