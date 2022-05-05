import React, {useState} from 'react';
import { navigate } from 'gatsby';

import PROFESSORSHIPS_MAP from '../../constants/professorships.json';

const getDropdown = (key) => 
  PROFESSORSHIPS_MAP.map((item) => (
    item.section === key ? <option value={item.to}>{item.label}</option> : null
  ));

const handleChange = (event) => navigate(`/endowed-positions/${event.target.value}`);

const EndowedPositionsNav = () => {
  const [getSearchTerm, setSearchTerm] = useState('');

  return (
    <nav className='endowed-positions__nav'>
      <div>
        <label
          className='endowed-positions__label'
          htmlFor='centers-institutes-programs-select'
        >
          Centers, Institutes, and Programs
        </label>
        <label
          className='endowed-positions__label'
          htmlFor='schools-select'
        >
          Schools
        </label>
        <label
          className='endowed-positions__label'
          htmlFor='search-input'
        >
          Search
        </label>
      </div>
      <div>
        <select
          className='endowed-positions__select'
          id="centers-institutes-programs-select"
          onChange={handleChange}
        >
          <option value='' disabled selected>Select a Center, Institute, or Program</option>
          {getDropdown('Centers, Institutes, and Programs')}
        </select>
        <select
          className='endowed-positions__select'
          id="schools-select"
          onChange={handleChange}
        >
          <option value='' disabled selected>Select a School</option>
          {getDropdown('Schools')}
        </select>
        <fieldset className='endowed-positions__fieldset'>
          <input
            className='endowed-positions__input'
            id="search-input"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            value={getSearchTerm} 
          />
          <button
            className='endowed-positions__button'
            onClick={() => navigate(`/endowed-positions/search?term=${getSearchTerm}`)}
          >
            Search
          </button>
        </fieldset>
      </div>
    </nav>
  )
};

export default EndowedPositionsNav;
