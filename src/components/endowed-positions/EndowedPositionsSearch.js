import React, { useCallback, useState } from 'react';
import { navigate } from 'gatsby';
import SbEditable from 'storyblok-react';

const EndowedPositionsSearch = (props) => {
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
    <SbEditable content={props.blok}>
      <input
        // className="endowed-positions__input"
        // id="search-input"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={getSearchTerm}
      />
      <button type="button" onClick={handleSearch}>go</button>
    </SbEditable>
  );
}

export default EndowedPositionsSearch;
