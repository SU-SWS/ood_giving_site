import { type RefObject, useEffect } from 'react';

export type useFocusTrapProps = {
  firstElemRef: RefObject<HTMLElement>;
  lastElemRef: RefObject<HTMLElement>;
  isActive?: boolean;
};

export const useFocusTrap = ({
  firstElemRef,
  lastElemRef,
  isActive = true,
}: useFocusTrapProps) => {
  useEffect(() => {
    const handleTabPress = ($event: KeyboardEvent) => {
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
