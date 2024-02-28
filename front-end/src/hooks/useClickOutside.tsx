import { useEffect } from 'react';

// This hook is used to detect clicks outside of a list of given elements, and, call the callback passed in.
function useClickOutside<T extends HTMLElement = HTMLElement>(refList: React.RefObject<T>[], callback: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      var refClicked = false;
      for (const ref of refList) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          refClicked = true;
          break;
        }
      }
      if (!refClicked) {
        callback();
      }
    };
    window.addEventListener('mouseup', handleClick);
    return () => {
      window.removeEventListener('mouseup', handleClick);
    };
  }, [refList, callback]);
}

export default useClickOutside;
