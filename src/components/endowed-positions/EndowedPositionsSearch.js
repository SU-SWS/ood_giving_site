import React, { useCallback, useState } from 'react';
import { navigate } from 'gatsby';

const EndowedPositionsSearch = () => {
  const [searchTerm, setSearchTerm] = useState;

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
    <>
      <input
        // className="endowed-positions__input"
        // id="search-input"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={getSearchTerm}
      />
      <button type="button" onClick={handleSearch}>go</button>
    </>
  );
}

export default EndowedPositionsSearch;
