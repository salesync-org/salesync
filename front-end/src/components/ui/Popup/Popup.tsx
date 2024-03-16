import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/utils/utils';
import React, { useEffect, useRef, useState } from 'react';

interface PopupProps extends React.HTMLAttributes<HTMLDivElement>{
  isOpen?: boolean;
  onClose?: () => void;

}

const Popup: React.FC<PopupProps> = ({ isOpen = false, onClose, onClick, children, className, ...restProps }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(isOpen);
  const popup = useRef<HTMLDivElement>(null);
  
  useClickOutside([popup], () => {
    setIsPopupOpen(false);
  });
  useEffect(() => {
    setIsPopupOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!isPopupOpen) {
      onClose?.();
    }
  }, [isPopupOpen]);

  function handleOnClick(event: React.MouseEvent<HTMLDivElement>): React.MouseEventHandler<HTMLDivElement> {
    onClick?.(event);
    setIsPopupOpen(false);
    return () => {
    };
  }
  

  return (
    <>
      {isPopupOpen && (
        <div ref={popup} className={cn(" bg-panel/80 dark:bg-panel-dark/80 overflow-y-scroll", className)} onClick={handleOnClick} {...restProps}>
          <div className="">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;