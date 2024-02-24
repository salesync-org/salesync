import { useEffect, useRef, useState } from 'react';
import useClickOutside from './useClickOutside';

export function useDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonContentRef = useRef<HTMLDivElement>(null);
  const [shoulDropUp, setDropDirection] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dropdownElement = buttonContentRef.current;

    if (dropdownElement) {
      const windowHeight = window.innerHeight;
      const dropdownRect = dropdownElement.getBoundingClientRect();
      const spaceBelow = windowHeight - dropdownRect.bottom;

      // Adjust the condition based on your specific requirements
      setDropDirection(spaceBelow > 20 * parseFloat(getComputedStyle(document.documentElement).fontSize));
    }
  }, [isOpen]);

  useClickOutside([menuRef], () => setIsOpen(false));

  return {
    isOpen,
    setIsOpen,
    shoulDropUp,
    selectedOption,
    setSelectedOption,
    buttonContentRef,
    buttonRef,
    menuRef
  };
}
