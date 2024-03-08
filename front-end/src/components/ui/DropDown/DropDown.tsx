import React, { useRef, useState } from 'react';
import {Button, Icon, DropDownList} from '@/components/ui';

interface DropdownButtonProps {
  value: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  disabled?: boolean;
  divide?: boolean;
}

const DropDown: React.FC<DropdownButtonProps> = ({
  children,
  value,
  onValueChange = () => {},
  defaultValue = 'Select a value',
  header,
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
    setSelectedOption(option.title!);
    const inputNode = option.querySelector('input');

    if (inputNode) {
      onValueChange(inputNode.value);
    }
  }

  return (
    <div ref={buttonRef} className='dropdown relative'>
      <Button header={header} showHeader={showHeader} disabled={disabled} onClick={() => setIsOpen(!isOpen)}>
        <Icon name='expand_more' />
        <p className='truncate'>{selectedOption || value}</p>
      </Button>
      <DropDownList onItemClick={handleOptionClick} open={isOpen} divide={divide}>
        {children}
      </DropDownList>
    </div>
  );
};

export default DropDown;
