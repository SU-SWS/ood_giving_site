'use client';
import { useContext } from 'react';
import { DialogTitle } from '@headlessui/react';
import { SearchModalContext } from './SearchModalContext';
import { SearchCategories } from './SearchCategories';
import { SearchModalBox } from './SearchModalBox';
import { Modal } from '@/components/Modal';

export const SearchModal = () => {
  const {
    isOpen,
    close,
    searchConfig,
  } = useContext(SearchModalContext);

  const { introduction } = searchConfig;

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="lg:w-11/12 xl:w-3/4 2xl:w-2/3 rs-pb-5 mx-auto">
        <div className="rs-mt-6">
          {!!introduction && (
            <DialogTitle className="text-white text-center font-serif fluid-type-2">{introduction}</DialogTitle>
          )}
          <div className="rs-mt-4">
            <SearchModalBox />
          </div>
        </div>
        <SearchCategories />
      </div>
    </Modal>
  );
};
