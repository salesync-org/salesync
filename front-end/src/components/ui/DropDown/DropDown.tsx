import React, { useRef, useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleOptionClick(option: HTMLElement): void {
    console.log('onItemClick: ', option);
    setSelectedOption(option.title!);
    const inputNode = option as HTMLInputElement;
    if (inputNode) {
      console.log('inputNode.value: ', inputNode.value);
      onValueChange(inputNode.value);
    }
  }

  return (
    <div ref={buttonRef} className='dropdown relative'>
      <Button header={header} showHeader={showHeader} className={cn(className)} disabled={disabled} onClick={() => {setIsOpen(!isOpen)}}>
        {prefixIcon}
        <p className='truncate w-fit'>{selectedOption || value}</p>
        {suffixIcon}
      </Button>
      <DropDownList onItemClick={handleOptionClick} className={cn(className)} onClose={() => {setIsOpen(false);}} open={isOpen} divide={divide}>
        {children}
      </DropDownList>
    </div>
  );
};

export default DropDown;
