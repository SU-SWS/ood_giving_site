'use client';
import { useState } from 'react';

export const EndowedPositionsSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <form action="/endowed-positions/search" role="search">
      <label
        htmlFor="endowedPositionsSearchInput"
        className="inline-block font-serif text-[3.6rem] font-bold mb-15"
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
