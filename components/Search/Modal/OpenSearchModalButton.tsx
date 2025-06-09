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
      className="shrink-0 w-34 h-34 items-center flex justify-center justify-content-center lg:w-auto lg:h-34 lg:pl-16 lg:pr-13 rounded-full lg:text-18 text-white leading-none border-2 border-digital-red-xlight transition-colors hocus:bg-cardinal-red-xxdark xl:hocus:bg-cardinal-red-xdark lg:hocus:no-underline self-center"
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
