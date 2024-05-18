import { useState, useEffect } from 'react';

function useResize(ref : React.RefObject<HTMLElement>, isActive:boolean) {
  const [aboveSpace, setAboveSpace] = useState(0);
  const [belowSpace, setBelowSpace] = useState(0);

  const handleResize = () => {
    if (!ref) return;
    if (!ref.current) return;

    const buttonRect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    setAboveSpace(buttonRect.top);
    setBelowSpace(windowHeight - buttonRect.bottom);
  };

  useEffect(() => {
    handleResize();
  }, [ref]);

  useEffect(() => {
    if (isActive) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize);
      return;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    }
  }, [isActive]);

  return [ aboveSpace, belowSpace ];
}

export default useResize;