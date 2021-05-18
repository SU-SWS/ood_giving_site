import React, {useEffect, useRef, useState} from 'react';
import UseEscape from '../../hooks/useEscape';
import UseFocusTrap from '../../hooks/useFocusTrap';
import CenteredContainer from '../partials/centeredContainer';
import { tabbable } from 'tabbable';

export const Modal = ({children, isOpen, onClose, outerContainerClasses, innerContainerClasses}) => {
  const defaultOuterContainerClasses = 'centered-container flex-container su-pt-5';
  const defaultInnerContainerClasses = '';
  const closeButton = useRef();
  const modalBodyRef = useRef();
  
  // Find the last tabbable item within the modal body.
  const getLastTabbableItem = () => {
    if (!modalBodyRef.current) return null;
    const focusableItems = tabbable(modalBodyRef.current);
    return focusableItems[focusableItems.length - 1];
  }

  // Mimick the structure of a React ref so it works with UseFocusTrap hook.
  const [lastTabbableRef, setLastTabbableRef] = useState({current: getLastTabbableItem()})

  // Update focus trap when child content changes.
  useEffect(() => {
    setLastTabbableRef({current: getLastTabbableItem()});
  }, [children])

  UseFocusTrap(closeButton, lastTabbableRef, isOpen);

  UseEscape(() => {
    closeButton.current.click();
  });

  useEffect(() => {
    if (isOpen) {
      lockScroll();
      closeButton.current.focus();
    } else {
      unlockScroll();
    }
  }, [isOpen]);

  const lockScroll = () => {
    const overlay = document.querySelector(".su-modal");
    let scrollbarWidth =
      overlay.offsetWidth - overlay.clientWidth + "px";

    document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    document.getElementsByTagName(
      "body"
    )[0].style.paddingRight = scrollbarWidth;
  }

  const unlockScroll = () => {
    document.getElementsByTagName("html")[0].style.overflowY = "scroll";
    document.getElementsByTagName("body")[0].style.paddingRight = "0";
  }

  return (
    <div className={`su-modal ${isOpen ? "visible" : "hidden"}`} aria-hidden={isOpen ? 'false' : 'true'} role='dialog' tabIndex="-1">
      <CenteredContainer className={outerContainerClasses ? outerContainerClasses : defaultOuterContainerClasses}>
        <div className={innerContainerClasses ? innerContainerClasses : defaultInnerContainerClasses}>
          <div className="su-modal--header">
            <button ref={closeButton} className="su-modal--close" onClick={onClose}>Close <i aria-hidden="true" className="fas fa-times"></i></button>
          </div>
          <div className="modal--body" ref={modalBodyRef}>
            {children}
          </div>
        </div>
      </CenteredContainer>
    </div>
  )
}

export default Modal;