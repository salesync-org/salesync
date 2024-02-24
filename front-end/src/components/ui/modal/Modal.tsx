import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../utils/utils';
import FocusTrap from '../../FocusTrap/FocusTrap';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isStatic?: boolean;
  title: string;
}

export const ModalFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex items-center justify-end space-x-4', className)}>{children}</div>;
};

const Modal = ({ children, title, isOpen, onOpenChange, isStatic = true }: Props) => {
  const handleCloseWhenClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isStatic) return;

    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', keyPressHandler);
    }

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [isOpen, onOpenChange]);

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <div
          className='fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 transition-all dark:bg-gray-900 dark:bg-opacity-50 md:inset-0'
          onClick={handleCloseWhenClickOutside}
        >
          <div className='animate-modal relative max-h-full w-full max-w-2xl origin-[0_50%]' id='modal'>
            {/* <!-- Modal content --> */}
            <div className='relative rounded-lg bg-panel px-3 py-4 shadow dark:bg-panel-dark'>
              {/* <!-- Modal header --> */}
              <FocusTrap>
                <div className='flex items-center justify-between p-4 md:p-5'>
                  <h3 className='text-2xl font-bold'>{title}</h3>
                  <button
                    type='button'
                    className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-sm bg-transparent text-sm transition-all hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                    data-modal-hide='default-modal'
                    onClick={() => onOpenChange(false)}
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
                <div className='space-y-4 p-4 md:p-5'>{children}</div>
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
