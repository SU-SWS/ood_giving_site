import React, {useEffect, useState} from 'react';
import { graphql, navigate } from 'gatsby';
import Fuse from 'fuse.js';

import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';
import EndowedPositionsHeader from '../../components/endowed-positions/EndowedPositionsHeader';
import CreateStories from '../../utilities/createStories';

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'],
  includeScore: true,
  minMatchCharLength: 4,
  threshold: 0.2,
  ignoreLocation: true
});

const SearchResultItem = ({currentHolder, index, position, website}) => (
  <>
    <dt onClick={() => navigate(`${location.pathname}${location.search}&item=${index}`)}>
      <strong>{currentHolder}</strong>
    </dt>
    <dd onClick={() => navigate(`${location.pathname}${location.search}&item=${index}`)}>
      <p>
        <strong>Title:</strong> {position}<br />
        {website}
      </p>
    </dd>
  </>
);

const Search = ({data, location}) => {
  const [getSearchResults, setSearchResults] = useState(null);
  const oodLocalHeader = {
    ...data.header,
    content: JSON.parse(data.header.content),
  };
  const oodLocalFooter = {
    ...data.footer,
    content: JSON.parse(data.footer.content),
  }

  useEffect(() => {
    const newSearch = new URLSearchParams(location.search);
    const paginatedArray = [];
    let searchResults;

    if (newSearch.get('term')) {
      searchResults = (fuse.search(newSearch.get('term')));

      for (let i = 0; i < searchResults.length; i++ ) {
        paginatedArray.push(searchResults[i]);
      }
      
      if (newSearch.get('item') && searchResults?.[Number(newSearch.get('item'))]) {
        searchResults = [searchResults[Number(newSearch.get('item'))]];

        setSearchResults(searchResults);
        return;
      }
    }
    setSearchResults(paginatedArray);
  }, [location]);
console.log(getSearchResults);
  return (
    <>
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsHeader />
      <section class="ood-interior-page__body">
        <div class="centered-container flex-container ood-interior-page__body-container">
          <div class="ood-interior-page__body-content su-mx-auto flex-lg-10-of-12 flex-xl-8-of-12">
            <dl className="endowed-positions__search-results">
              {getSearchResults?.length
                ? getSearchResults.map((item, index) => (
                    <SearchResultItem
                      currentHolder={item.item['CURRENT HOLDER']}
                      index={index}
                      key={`${item.item['CURRENT HOLDER']}-${index}`}
                      position={item.item['POSITION']}
                      website={item.item['WEBSITE']}
                    />
                  ))
                : <div>No results</div>
              }
            </dl>
          </div>
        </div>
      </section>
      <CreateStories stories={[oodLocalFooter]} />
    </>
  );
};

export const query = graphql`
  query {
    header: storyblokEntry(field_component: {eq: "oodLocalHeader"}) {
      id
      content
    }
    footer: storyblokEntry(field_component: {eq: "oodLocalFooter"}) {
      id
      content
    }
  }
`;

export default Search;
