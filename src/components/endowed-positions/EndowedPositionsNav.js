import React, {useCallback, useMemo, useState} from 'react';
import { navigate } from 'gatsby';

import ENDOWED_POSITIONS_MAP from '../../constants/ENDOWED_POSITIONS_MAP.json';

const getDropdown = (key) => 
  ENDOWED_POSITIONS_MAP.map((item) => (
    item.section === key ? <option key={item.label} value={item.to}>{item.label}</option> : null
  ));

const handleChange = (event) => navigate(`/endowed-positions/${event.target.value}`);

const EndowedPositionsNav = () => {
  const [getSearchTerm, setSearchTerm] = useState('');

  const centersInstitutesProgramsOptions = useMemo(() => getDropdown('Centers, Institutes, and Programs'), []);
  const schoolOptions = useMemo(() => getDropdown('Schools'), []);
  const handleInputChange = useCallback((event) => {
    setSearchTerm(event.currentTarget.value);
  }, []);
  const handleSearch = useCallback(() => {
    navigate(`/endowed-positions/search?term=${getSearchTerm}`)
  }, [getSearchTerm]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  return (
    <nav className='endowed-positions__nav'>
      <div>
        <label className='endowed-positions__label'>Navigate to...</label>
        <select
          className='endowed-positions__select'
          id="schools-select"
          onChange={handleChange}
        >
          <option value='' disabled selected>Select a School</option>
          {schoolOptions}
        </select>
        <select
          className='endowed-positions__select'
          id="centers-institutes-programs-select"
          onChange={handleChange}
        >
          <option value='' disabled selected>Select a Center, Institute, or Program</option>
          {centersInstitutesProgramsOptions}
        </select>
        <fieldset className='endowed-positions__fieldset'>
          <input
            className='endowed-positions__input'
            id="search-input"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            value={getSearchTerm} 
          />
          <i
            aria-hidden="true"
            class="fas fa-search fa-flip-horizontal endowed-positions__search-button" 
            onClick={handleSearch}
          />
        </fieldset>
      </div>
    </nav>
  )
};

export default EndowedPositionsNav;
