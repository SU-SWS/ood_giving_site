import React, { useCallback, useState } from 'react';
import { navigate } from 'gatsby';

const EndowedPositionsSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = useCallback((event) => {
    setSearchTerm(event.currentTarget.value);
  }, []);
  const handleSearch = useCallback(() => {
    navigate(`/endowed-positions/search?term=${searchTerm}`);
  }, [searchTerm]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  return (
    <SbEditable content={props.blok}>
      <label
        className="endowed-positions__label--homepage"
        htmlFor="search-input"
      >
        Search endowed positions by keyword&#40;s&#41;:
      </label>
      <div className="endowed-positions__search-wrapper">
        <input
          id="search-input"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={searchTerm}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </SbEditable>
  );
};

export default EndowedPositionsSearch;
