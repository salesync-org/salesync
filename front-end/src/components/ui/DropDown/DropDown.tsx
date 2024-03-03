import React, { useRef, useState } from 'react';
import Button from 'ui/Button/Button';
import Icon from 'ui/Icon/Icon';
import DropDownList from 'ui/DropDown/DropDownList';

interface DropdownButtonProps {
  value: string;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const DropDown: React.FC<DropdownButtonProps> = ({ children, value, header, disabled, showHeader = true }) => {
  // const { isOpen, setIsOpen, shoulDropUp, selectedOption, setSelectedOption, buttonContentRef, buttonRef, menuRef } =
  //   useDropDown();
  const [selectedOption, setSelectedOption] = useState('');
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);



  function handleOptionClick(option: HTMLElement): void {console.log(option.title);
    setSelectedOption(option.title!);
  }

  return (
    <div ref={buttonRef} className='dropdown relative'>
      <Button header={header} showHeader={showHeader} disabled={disabled} onClick={() => setIsOpen(!isOpen)}>
        <Icon name='expand_more' />
        <p className='truncate'>
          {selectedOption || value}
        </p>
      </Button>
      <DropDownList onItemClick={handleOptionClick} open={isOpen}>
        {children}
      </DropDownList>
    </div>
  );
};

export default DropDown;
