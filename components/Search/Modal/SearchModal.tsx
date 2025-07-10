'use client';
import { useContext } from 'react';
import { SearchModalContext } from './SearchModalContext';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Container } from '@/components/Container';
import { HeroIcon } from '@/components/HeroIcon';
import { SearchForm } from './SearchForm';
import { SearchCategories } from './SearchCategories';

export const SearchModal = () => {
  const {
    isOpen,
    close,
    searchConfig,
  } = useContext(SearchModalContext);

  const { introduction } = searchConfig;

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogBackdrop className="fixed inset-0 bg-palo-alto-dark/90 backdrop-blur-[5px] z-[1000000]" />
      <DialogPanel className="fixed w-full h-full top-0 left-0 rs-py-5 z-[1000001] overflow-y-auto">
        <Container>
          <div className="lg:w-11/12 xl:w-3/4 2xl:w-2/3 mx-auto">
            <div className="flex justify-end">
              <button onClick={close} className="flex gap-6 items-center justify-center text-white fluid-type-0 hocus:underline">
                Close <HeroIcon aria-hidden icon="close" className="!stroke-[4.5]" />
              </button>
            </div>
            <div className="rs-mt-6">
              {!!introduction && (
                <DialogTitle className="text-white text-center font-serif fluid-type-2">{introduction}</DialogTitle>
              )}
              <div className="rs-mt-4">
                <SearchForm />
              </div>
            </div>
            <SearchCategories />
          </div>
        </Container>
      </DialogPanel>
    </Dialog>
  );
};
