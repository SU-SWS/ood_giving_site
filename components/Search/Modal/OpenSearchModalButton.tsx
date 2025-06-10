'use client';
import React, { useContext } from 'react';
import SearchModalContext from './SearchModalContext';
import { HeroIcon } from '@/components/HeroIcon';

export const OpenSearchModalButton = React.forwardRef<HTMLButtonElement, { id: string }>(({ id }, ref) => {
  const { open } = useContext(SearchModalContext);

  return (
    <button
      data-test="search--nav-bar"
      type="button"
      className="shrink-0 h-40 w-40 xl:w-fit text-digital-red hocus:text-cardinal-red rounded-full xl:text-20 xl:px-20 border border-black-30 hocus:bg-black-10"
      aria-label="Search Giving"
      onClick={open}
      id={id}
      ref={ref}
    >
      <span className="sr-only lg:not-sr-only leading-none">
        Search
      </span>
      <HeroIcon
        icon="search"
        aria-hidden="true"
        className="inline-block relative -top-1 w-22 lg:w-20 lg:ml-6 h-18"
      />
    </button>
  );
});
