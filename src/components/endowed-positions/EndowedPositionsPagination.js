import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';

const TOTAL_MOBILE_PAGES = 5;
const MOBILE_WIDTH = 765;


const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const EndowedPositionsPagination = ({ currentPage, pagesArray }) => {
  const size = useWindowSize();
  const isMobile = size.width < MOBILE_WIDTH;
  const pageOffset = currentPage - 1;
  const lastPageToDisplay = pageOffset + TOTAL_MOBILE_PAGES;
  const mobileDisplayArray = pagesArray.map((item) => {
    if (item < lastPageToDisplay && item >= pageOffset) {
      return item;
    } else {
      return null;
    }
  });

  return (
    <ol className="endowed-positions__paginate search-pagination">
      {isMobile && currentPage !== 1 && <li className="search-pagination-item search-pagination-item--text">
        <Link
          aria-label="Go to previous page"
          to={`?page=${currentPage - 1}`}
        >
          Previous
        </Link>
      </li>}
      {pagesArray.map((item) => {
        const ariaCurrent =
          item + 1 === currentPage ? { 'aria-current': true } : {};
        return (
          <li
            className={cx('search-pagination-item', {
              ['search-pagination-item--current']: item + 1 === currentPage,
              ['search-pagination-item--mobile-hidden']: mobileDisplayArray.indexOf(item) === -1 && isMobile,
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
      {isMobile && currentPage !== pagesArray.length && <li className="search-pagination-item search-pagination-item--text">
        <Link
          aria-label="Go to next page"
          to={`?page=${currentPage + 1}`}
        >
          Next
        </Link>
      </li>}
    </ol>
  );
};

export default EndowedPositionsPagination;
