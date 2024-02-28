import { useEffect, useRef, useState } from 'react';

export function useDropDownList({ref, open} : {ref: React.RefObject<HTMLDivElement>, open: boolean})  {
  // const [isOpen, setIsOpen] = useState(open);
  const buttonContentRef = useRef<HTMLDivElement>(null);
  const [shouldDropUp, setDropDirection] = useState(false);

  useEffect(() => {
    const dropdownElement = ref.current?.parentElement;

    if (dropdownElement) {
      const windowHeight = window.innerHeight;
      const dropdownRect = dropdownElement.getBoundingClientRect();
      const spaceBelow = windowHeight - dropdownRect.bottom;

      // Adjust the condition based on your specific requirements
      setDropDirection(spaceBelow > 20 * parseFloat(getComputedStyle(document.documentElement).fontSize));
    }
  }, [open]);


  return {
    shouldDropUp,
    buttonContentRef,
  };
}
