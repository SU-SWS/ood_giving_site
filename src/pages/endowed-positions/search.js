import React, {useEffect, useState} from 'react';
import { graphql, navigate } from 'gatsby';
import Fuse from 'fuse.js';

import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';
import EndowedPositionsNav from '../../components/endowed-positions/EndowedPositionsNav';
import CreateStories from '../../utilities/createStories';

const PAGE_ITEMS = 25;

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'],
  includeScore: true,
  threshold: 0.3,
});

const SearchResultItem = ({currentHolder, index, position, website}) => (
  <dl onClick={() => navigate(`${location.pathname}${location.search}&item=${index}`)}>
    <dt>{currentHolder}</dt>
    <dd>{position}</dd>
    <dd>{website}</dd>
  </dl>
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

      for (let i = 0; i < 25; i++ ) {
        paginatedArray.push(searchResults[i]);
      }
      
      if (newSearch.get('item') && searchResults?.[Number(newSearch.get('item'))]) {
        searchResults = [searchResults[Number(newSearch.get('item'))]];

        setSearchResults(searchResults);
        return;
      }
    }
    console.log(paginatedArray);
    setSearchResults(paginatedArray);
  }, [location]);

  return (
    <>
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsNav />
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
        : <div>no results</div>}
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
