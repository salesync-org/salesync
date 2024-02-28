import React from 'react';
import Button from 'ui/Button/Button';
import Icon from 'ui/Icon/Icon';
import { useDropDown } from 'hooks/useDropDown';
import { cn } from 'utils/utils';

interface DropdownButtonProps {
  value: string;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const DropDown: React.FC<DropdownButtonProps> = ({
  children,
  value,
  header,
  disabled,
  onChange,
  showHeader = true
}) => {
  const { isOpen, setIsOpen, shoulDropUp, selectedOption, setSelectedOption, buttonContentRef, buttonRef, menuRef } =
    useDropDown();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange!(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      let target = event.target as HTMLElement;
      while (target && target !== event.currentTarget) {
        if (target.parentNode === event.currentTarget) {
          handleOptionClick(target.title);
          break;
        }
        target = target.parentNode as HTMLElement;
      }
    }
  };

  return (
    <div ref={buttonRef} className='dropdown relative' onKeyDown={handleKeyDown}>
      <Button header={header} showHeader={showHeader} disabled={disabled} onClick={() => setIsOpen(!isOpen)}>
        <Icon name='expand_more' />
        <p className='truncate' ref={buttonContentRef}>
          {selectedOption || value}
        </p>
      </Button>
      <div
        ref={menuRef}
        className={cn(
          'absolute z-10 max-h-80 overflow-y-auto rounded border-2 px-2 transition-all duration-100 ease-in-out',
          'divide divide-y-2 divide-button-stroke-light dark:divide-button-stroke-dark',
          'bg-button-background-light dark:bg-button-background-dark',
          'border-button-stroke-light dark:border-button-stroke-dark',
          shoulDropUp ? 'top-[4.8rem] origin-top' : 'bottom-12 origin-bottom',
          isOpen ? 'scale-100' : 'scale-0 *:hidden'
        )}
        onClick={(event) => {
          let target = event.target as HTMLElement;
          while (target && target !== event.currentTarget) {
            if (target.parentNode === event.currentTarget) {
              handleOptionClick(target.title);
              break;
            }
            target = target.parentNode as HTMLElement;
          }
        }}
        onKeyDown={handleTabKeyDown}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
