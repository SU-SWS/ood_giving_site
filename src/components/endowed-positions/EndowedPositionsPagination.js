import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';

const EndowedPositionsPagination = ({ currentPage, pagesArray }) => (
  <ol className="endowed-positions__paginate search-pagination">
    {pagesArray.map((item) => {
      const ariaCurrent =
        item + 1 === currentPage ? { 'aria-current': true } : {};
      return (
        <li
          className={cx('search-pagination-item', {
            ['search-pagination-item--current']: item + 1 === currentPage,
          })}
          key={item + 1}
          {...ariaCurrent}
        >
          {item + 1 === currentPage ? (
            <>{item + 1}</>
          ) : (
            <Link
              aria-label={`to page ${item + 1}`}
              key={item}
              to={`?page=${item + 1}`}
            >
              {item + 1}
            </Link>
          )}
        </li>
      );
    })}
  </ol>
);

export default EndowedPositionsPagination;
