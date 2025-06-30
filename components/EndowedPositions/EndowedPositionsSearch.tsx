'use client';
import { cnb } from 'cnbuilder';
import { useState } from 'react';

type EndowedPositionsSearchType = {
  variant?: 'default' | 'small';
};

export const EndowedPositionsSearch = ({ variant = 'default' }: EndowedPositionsSearchType) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <form action="/endowed-positions/search" role="search">
      <label
        htmlFor="endowedPositionsSearchInput"
        className={cnb('inline-block font-serif font-bold mb-15', {
          'text-[3.6rem]': variant === 'default',
          'text-18 md:text-22 lg:text-26': variant === 'small',
        })}
      >
        Search endowed positions by keyword&#40;s&#41;:
      </label>
      <div className="flex gap-10 max-w-[48rem] w-full">
        <input
          id="endowedPositionsSearchInput"
          type="search"
          name="term"
          className="border border-fog rounded flex text-18 h-40 w-full px-20"
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          value={searchTerm}
        />
        <input value="Search" type="submit" className="h-40 text-20 px-16 text-white bg-palo-alto-dark cursor-pointer" />
      </div>
    </form>
  );
};
