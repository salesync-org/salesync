import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { cn } from 'utils/utils';
import FocusTrap from 'ui/FocusTrap/FocusTrap';
import useClickOutside from '@/hooks/useClickOutside';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isStatic?: boolean;
  title: string;
  className?: string;
}

export const ModalFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn('flex items-center justify-end space-x-4 rounded dark:bg-slate-800', className)}>{children}</div>
  );
};

const Modal = ({ children, title, isOpen, onClose, className, isStatic = true }: ModalProps) => {
  // const handleCloseWhenClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (isStatic) return;

  //   if (e.target === e.currentTarget) {
  //     onOpenChange(false);
  //   }
  // };
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside([ref], () => {
    !isStatic && onClose();
  });

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', keyPressHandler);
    }

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div
          className='fixed bottom-0 left-0 right-0 z-[999] flex h-full w-full items-center justify-center overflow-x-hidden overflow-y-hidden bg-black bg-opacity-50 transition-all dark:bg-gray-900 dark:bg-opacity-50 md:inset-0'
          // onClick={handleCloseWhenClickOutside}
        >
          <div ref={ref} className='relative min-w-[65%] origin-center' id='modal'>
            {/* <!-- Modal content --> */}
            <div
              className={cn(
                'relative max-h-[calc(100vh-50px)] max-w-[calc(100vw-100px)] rounded-lg bg-panel px-3 py-4 shadow dark:bg-panel-dark'
                // className <-- This causes all the problems
              )}
            >
              {/* <!-- Modal header --> */}
              <FocusTrap>
                <div className='grid max-h-[calc(100vh-75px)] grid-rows-[auto_1fr]'>
                  <div className='col-auto flex h-[2rem] items-center p-4 md:p-5'>
                    {/* //header */}
                    <div className='absolute left-10 right-10 z-10 overflow-x-clip'>
                      <h3 className='text-ellipsis text-nowrap text-center text-2xl font-bold'>{title}</h3>
                    </div>
                    <button
                      type='button'
                      className='absolute right-2 z-30 ms-auto inline-flex aspect-square w-8 origin-center items-center justify-center rounded-sm bg-transparent text-sm transition-all duration-100 hover:bg-gray-200 hover:text-gray-900 active:scale-90 dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-hide='default-modal'
                      onClick={onClose}
                    >
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                      </svg>
                    </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className='row-auto max-h-[calc(100vh-75px-2rem)] space-y-4 p-4 md:p-5'>
                    <div className={cn('grid h-full grid-cols-[1fr] grid-rows-1', className)}>{children}</div>
                  </div>
                </div>
              </FocusTrap>
            </div>
          </div>
        </div>
      )}
    </>,
    document.querySelector('body')!
  );
};

export default Modal;
