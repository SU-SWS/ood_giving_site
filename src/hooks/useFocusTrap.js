import { useEffect } from 'react';

const UseFocusTrap = (firstElemRef, lastElemRef, isActive = true) => {
  useEffect(() => {
    const handleTabPress = ($event) => {
      if ($event.key === 'Tab') {
        if ($event.shiftKey) {
          // tabbing backwards, check whether first element is focused
          if (firstElemRef.current === document.activeElement) {
            $event.preventDefault();
            lastElemRef.current.focus();
          }
        } else {
          // tabbing forwards, check whether last element is focused
          if (lastElemRef.current === document.activeElement) {
            $event.preventDefault();
            firstElemRef.current.focus();
          }
        }
      }
    };
    if (isActive) {
      window.addEventListener('keydown', handleTabPress);
      return () => {
        window.removeEventListener('keydown', handleTabPress);
      };
    }
  }, [firstElemRef, lastElemRef, isActive]);
};

export default UseFocusTrap;
