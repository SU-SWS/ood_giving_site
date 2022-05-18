import React from 'react';
import { Link } from 'gatsby';

const EndowedPositionsPagination = ({ pagesArray }) => (
  <div className='endowed-positions__paginate'>
    {pagesArray.map((item) => (
      <Link key={item} to={`?page=${item + 1}`}>{item + 1}</Link>
    ))}
  </div>
);

export default EndowedPositionsPagination;
