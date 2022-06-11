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
  const handleGoClick = () => navigate(`/endowed-positions/${page}`);
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
          <label
            className="endowed-positions__label"
            htmlFor="schools-centers-institutes-programs-select"
          >
            Filter by school or area:
          </label>
          <div className="endowed-positions__select-wrapper">
            <select
              className="endowed-positions__select"
              defaultValue={to}
              id="schools-centers-institutes-programs-select"
              onChange={handleSelectChange}
            >
              <option value="" disabled selected>
                Select a School, Center, Institute, or Program
              </option>
              <optgroup label="Schools">{schoolOptions}</optgroup>
              <optgroup label="Centers, Institutes, and Programs">
                {centersInstitutesProgramsOptions}
              </optgroup>
            </select>
            <button onClick={handleGoClick} type="button">
              Go
            </button>
          </div>
        </fieldset>
        <fieldset className="endowed-positions__fieldset">
          <label className="endowed-positions__label" htmlFor="search-input">
            Search by keyword:
          </label>
          <input
            className="endowed-positions__input"
            id="search-input"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={getSearchTerm}
          />
          <i
            aria-hidden="true"
            className="fas fa-search fa-flip-horizontal endowed-positions__search-button"
            onClick={handleSearch}
          />
        </fieldset>
      </div>
    </nav>
  );
};

export default EndowedPositionsNav;
