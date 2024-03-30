import React, { useEffect, useRef, useState } from 'react';
import {Button, Icon, DropDownList} from '@/components/ui';
import { cn } from '@/utils/utils';

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
  disabled?: boolean;
  divide?: boolean;
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
  disabled,
  divide = false,
  showHeader = true
}) => {
  // const { isOpen, setIsOpen, shoulDropUp, selectedOption, setSelectedOption, buttonContentRef, buttonRef, menuRef } =
  //   useDropDown();
  const buttonRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(true);


  
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
    }
  }

  return (
    <div ref={listRef} className='dropdown relative'>
      <div ref={buttonRef} className='h-fit'>
        <Button  header={header} showHeader={showHeader} className={cn(className)} disabled={disabled} onClick={() => {setIsOpen(!isOpen)}}>
          {prefixIcon}
          <p className='truncate w-fit'>{selectedOption ? selectedOption : value}</p>
          {suffixIcon}
        </Button>
      </div>
      <DropDownList onItemClick={handleOptionClick} className={cn(className)} onClose={() => {setIsOpen(false);}} open={isOpen} divide={divide}>
        {children}
      </DropDownList>
    </div>
  );
};

export default DropDown;
