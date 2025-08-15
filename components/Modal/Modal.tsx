'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
  TransitionRootProps,
} from '@headlessui/react';
import * as styles from './Modal.styles';
import { Text } from '@/components/Typography';

type ModalProps = TransitionRootProps & {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  ...TransitionProps
}: ModalProps) => (
  <Transition show={isOpen} {...TransitionProps}>
    <Dialog onClose={onClose} className={className}>
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogBackdrop className={styles.dialogOverlay} />
      </TransitionChild>
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className={styles.dialogWrapper}>
          <DialogPanel className={styles.dialogPanel}>
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className={styles.modalClose}
            >
              <Text icon="close" size={1} className={styles.modalCloseText}>Close</Text>
            </button>
            {children}
          </DialogPanel>
        </div>
      </TransitionChild>
    </Dialog>
  </Transition>
);
