import React from 'react';
import { Link } from 'gatsby';

const EndowedPositionsPagination = ({ pagesArray }) => (
  <div className='endowed-positions__paginate search-pagination'>
    {pagesArray.map((item) => (
      <Link className="search-pagination-item" key={item} to={`?page=${item + 1}`}>{item + 1}</Link>
    ))}
  </div>
);

export default EndowedPositionsPagination;
