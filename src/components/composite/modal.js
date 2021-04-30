import React, {useEffect} from 'react';

export const Modal = ({children, isOpen, onClose, outerContainerClasses, innerContainerClasses}) => {
  const defaultOuterContainerClasses = 'centered-container flex-container su-pt-5';
  const defaultInnerContainerClasses = 'su-mx-auto flex-lg-11-of-12 flex-xl-9-of-12 flex-2xl-8-of-12';
  useEffect(()=> {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        onClose();
      }
    })
  }, [])
  return (
    <div className={`su-modal ${isOpen ? "visible" : "hidden"}`} aria-hidden={isOpen ? 'false' : 'true'} role='dialog' tabindex="-1">
      <div className={outerContainerClasses ? outerContainerClasses : defaultOuterContainerClasses}>
        <div className={innerContainerClasses ? innerContainerClasses : defaultInnerContainerClasses}>
          <div className="su-modal--header">
            <button className="su-modal--close" onClick={onClose}>Close <i aria-hidden="true" className="fas fa-times"></i></button>
          </div>
          <div className="modal--body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;