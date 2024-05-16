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
            ' overflow-y-hidden  ',
            'fixed right-0 top-[38px] flex max-h-[calc(100vh-38px-1rem)] w-1/4 flex-col align-middle',
            'z-[1000] transition-all duration-100 ease-in-out '
          )}
          {...restProps}
        >
          <div className='absolute left-0 right-0 top-0 flex h-[calc(1.6rem)] w-full justify-end overflow-hidden'>
            <Triangle
              width='3rem'
              height='3rem'
              className={cn(
                'mr-[4.5rem] fill-panel dark:fill-panel-dark',
                !open && 'hidden',
                'border-0 stroke-button-stroke stroke-[1px] dark:stroke-button-stroke-dark'
              )}
            />
          </div>
          <div
            className={cn(
              'mx-2 mt-6 border-[2px] border-button-stroke pt-2',
              'h-fit bg-panel shadow-lg shadow-black/10 dark:border-button-stroke-dark dark:bg-panel-dark',
              'max-h-full overflow-x-hidden rounded-xl px-2'
            )}
          >
            <div className='min-h-[300px] pb-2'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
