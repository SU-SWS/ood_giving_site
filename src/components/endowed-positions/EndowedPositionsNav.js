import React, { useCallback, useMemo, useState } from 'react';
import { navigate } from 'gatsby';

import ENDOWED_POSITIONS_MAP from '../../constants/ENDOWED_POSITIONS_MAP.json';

const getDropdown = (key, to) =>
  ENDOWED_POSITIONS_MAP.map((item) => {
    const payload = {
      ...(item.to === to ? { disabled: true } : {}),
    };
    return item.section === key ? (
      <option key={item.label} value={item.to} {...payload}>
        {item.label}
      </option>
    ) : null;
  });

const EndowedPositionsNav = ({ to }) => {
  const [getSearchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(null);

  const centersInstitutesProgramsOptions = useMemo(
    () => getDropdown('Centers, Institutes, and Programs', to),
    []
  );
  const schoolOptions = useMemo(() => getDropdown('Schools', to), []);
  const handleSelectChange = useCallback(
    (event) => setPage(event.target.value),
    []
  );
  const handleGoClick = () => {
    if (!page) {
      return;
    }
    navigate(`/endowed-positions/${page}?page=1`);
  };
  const handleInputChange = useCallback((event) => {
    setSearchTerm(event.currentTarget.value);
  }, []);
  const handleSearch = useCallback(() => {
    navigate(`/endowed-positions/search?term=${getSearchTerm}`);
  }, [getSearchTerm]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  return (
    <nav aria-label="filter and search" className="endowed-positions__nav">
      <div>
        <fieldset className="endowed-positions__fieldset">
          <label className="endowed-positions__label" htmlFor="search-input">
            Search by keyword:
          </label>
          <div className="endowed-positions__search-wrapper">
            <input
              className="endowed-positions__input"
              id="search-input"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={getSearchTerm}
            />
            <button onClick={handleSearch} type="button">
              Search
            </button>
          </div>
        </fieldset>
      </div>
    </nav>
  );
};

export default EndowedPositionsNav;
