import React, { useCallback, useEffect, useRef, useState } from 'react';
import { graphql, navigate } from 'gatsby';
import { Helmet } from 'react-helmet';
import Fuse from 'fuse.js';

import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';
import EndowedPositionsHeader from '../../components/endowed-positions/EndowedPositionsHeader';
import EndowedPositionsFooter from '../../components/endowed-positions/EndowedPositionsFooter';
import CreateStories from '../../utilities/createStories';

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'],
  includeScore: true,
  minMatchCharLength: 3,
  threshold: 0.2,
  ignoreLocation: true,
});

const SearchResultItem = ({
  currentHolder,
  index,
  location,
  position,
  website,
}) => {
  const handleClick = useCallback(() => {
    if (location.search.indexOf('item') === -1) {
      navigate(`${location.pathname}${location.search}&item=${index}`);
    }
  }, []);

  return (
    <li>
      <h3 onClick={handleClick}>
        <strong>{currentHolder}</strong>
      </h3>
      <p onClick={handleClick}>
        <strong>Title:</strong> {position}
        <br />
        {website}
      </p>
    </li>
  );
};

const Search = ({ data, location }) => {
  const [getSearchResults, setSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const oodLocalHeader = {
    ...data.header,
    content: JSON.parse(data.header.content),
  };
  const oodLocalFooter = {
    ...data.footer,
    content: JSON.parse(data.footer.content),
  };
  const globalFooter = {
    ...data.globalFooter,
    content: JSON.parse(data.globalFooter.content),
  };

  const headerRef = useRef(null);

  useEffect(() => {
    const newSearch = new URLSearchParams(location.search);
    const paginatedArray = [];
    let searchResults;

    if (newSearch.get('term')) {
      setSearchTerm(newSearch.get('term'));
      searchResults = fuse.search(newSearch.get('term'));

      for (let i = 0; i < searchResults.length; i++) {
        paginatedArray.push(searchResults[i]);
      }

      if (
        newSearch.get('item') &&
        searchResults?.[Number(newSearch.get('item'))]
      ) {
        searchResults = [searchResults[Number(newSearch.get('item'))]];

        setSearchResults(searchResults);
        return;
      }
    }
    setSearchResults(paginatedArray);
  }, [location, searchTerm, setSearchTerm]);

  useEffect(() => {
    headerRef?.current?.scrollIntoView();
    headerRef?.current?.focus();
  });

  return (
    <>
      <Helmet>
        <title>
          Endowed Positions at Stanford: {`Search results for "${searchTerm}"`}{' '}
          | Giving to Stanford
        </title>
        <meta
          name="description"
          content="Endowed positions are gifted by donors to support outstanding faculty, staff, and campus leaders. Through these meaningful investments, donors help enhance the Stanford community and strengthen the university’s future."
        />
      </Helmet>
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsHeader />
      <section className="ood-interior-page__body endowed-positions__body">
        <div className="centered-container flex-container ood-interior-page__body-container">
          <div className="ood-interior-page__body-content su-mx-auto flex-lg-10-of-12 flex-xl-8-of-12">
            {getSearchResults?.length ? (
              <>
                <h2
                  className="endowed-positions__search-results-header"
                  id="main-content"
                  ref={headerRef}
                  tabIndex="-1"
                >
                  Search results for &quot;{searchTerm}&quot;
                </h2>
                <ul className="endowed-positions__search-results">
                  {getSearchResults.map((item, index) => (
                    <SearchResultItem
                      currentHolder={item.item['CURRENT HOLDER']}
                      index={index}
                      key={`${item.item['CURRENT HOLDER']}-${index}`}
                      location={location}
                      position={item.item['POSITION']}
                      website={item.item['SUBCATEGORY']}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <h2
                className="endowed-positions__search-results-header"
                id="main-content"
                ref={headerRef}
                tabIndex="-1"
              >
                No results for &quot;{searchTerm}&quot;
              </h2>
            )}
            <EndowedPositionsFooter />
          </div>
        </div>
      </section>
      <CreateStories stories={[oodLocalFooter, globalFooter]} />
    </>
  );
};

export const query = graphql`
  query {
    header: storyblokEntry(field_component: { eq: "oodLocalHeader" }) {
      id
      content
    }
    footer: storyblokEntry(field_component: { eq: "oodLocalFooter" }) {
      id
      content
    }
    globalFooter: storyblokEntry(field_component: { eq: "globalFooter" }) {
      id
      content
    }
  }
`;

export default Search;
