import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { Button, Icon, DropDownList } from '@/components/ui';
import { cn } from '@/utils/utils';
import { textErrorClassName } from '../ErrorText/ErrorText';

interface DropdownButtonProps {
  value: string;
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  isError?: boolean;
  setError?: Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  divide?: boolean;
  maxHeightList?: number;
  maxWidthList?: number;
  align?: 'left' | 'right' | null;
}

const DropDown: React.FC<DropdownButtonProps> = ({
  children,
  value,
  className,
  onValueChange = () => {},
  defaultValue = 'Select a value',
  header,
  prefixIcon = <Icon name='expand_more' />,
  suffixIcon = null,
  isError = false,
  setError,
  disabled,
  divide = false,
  showHeader = true,
  maxHeightList = 0,
  maxWidthList = 0,
  align = null,
}) => {
  // const { isOpen, setIsOpen, shoulDropUp, selectedOption, setSelectedOption, buttonContentRef, buttonRef, menuRef } =
  //   useDropDown();
  const buttonRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(true);
  let isHaveHeader;
  if (header) isHaveHeader = true
  else isHaveHeader = false

  useEffect(() => {
    function findTitleByValue(ref: React.RefObject<HTMLDivElement>, value: string): string | null {
      const currentElement = ref.current;
      if (currentElement) {
        const inputElements = currentElement.getElementsByTagName('input');
        for (let i = 0; i < inputElements.length; i++) {
          const inputElement = inputElements[i];
          if (inputElement.getAttribute('value') === value) {
            console.log('Seems like we got title  = ' + inputElement.getAttribute('title'));
            return inputElement.getAttribute('title');
          }
        }
      }
      return null;
    }
    if (value) {
      if (value != defaultValue) {
        const title = findTitleByValue(listRef, value);
        setSelectedOption(title ? title : defaultValue);
      }
    }
    setIsOpen(false);
  }, [listRef]);

  function handleOptionClick(option: HTMLElement): void {
    console.log('onItemClick: ', option);
    const inputNode = option as HTMLInputElement;
    setSelectedOption(inputNode.title);
    if (inputNode) {
      console.log('inputNode.value: ', inputNode.value);
      onValueChange(inputNode.value);

      typeof setError === 'function' && setError(false);
    }
  }

  return (
    <div ref={listRef} className='dropdown relative'>
      <div ref={buttonRef} className='h-fit'>
        <Button
          header={header}
          showHeader={showHeader}
          headerClassName={cn(isError && textErrorClassName)}
          className={cn(isError && 'border-red-400 ring-1 ring-red-300', className)}
          disabled={disabled}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className={cn(
              'flex w-full items-center',
              isError && textErrorClassName,
              selectedOption != '' && value != '' && 'gap-4'
            )}
          >
            {prefixIcon}
            <p className={cn('w-full truncate text-left', isError && textErrorClassName)}>
              {selectedOption ? selectedOption : value}
            </p>
            <span className='ml-auto grid place-content-center'>{suffixIcon}</span>
          </div>
        </Button>
      </div>
      <DropDownList
        onItemClick={handleOptionClick}
        className={cn(className)}
        onClose={() => {
          setIsOpen(false);
        }}
        open={isOpen}
        divide={divide}
        maxHeight={maxHeightList}
        maxWidth={maxWidthList}
        isHaveHeader={isHaveHeader}
        align={align}
      >
        {children}
      </DropDownList>
    </div>
  );
};

export default DropDown;
