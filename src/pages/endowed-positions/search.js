import React, {useEffect, useState} from 'react';
import { graphql } from 'gatsby';
import Fuse from 'fuse.js';

import ENDOWED_POSITIONS from '../../fixtures/endowedPositions.json';
import EndowedPositionsNav from '../../components/endowed-positions/EndowedPositionsNav';
import CreateStories from '../../utilities/createStories';

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'/*, 'WEBSITE'*/],
  includeScore: true,
  threshold: 0.3,
});

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

    if (newSearch.get('term')) {
      setSearchResults(fuse.search(newSearch.get('term')));
    }
  }, [location]);
console.log(getSearchResults);
  return (
    <>
      <CreateStories stories={[oodLocalHeader]} />
      <EndowedPositionsNav />
      {getSearchResults?.length
        ? getSearchResults.map((item, index) => (
            <dl key={`${item.item['CURRENT HOLDER']}-${index}`}>
              <dt>{item.item['CURRENT HOLDER']}</dt>
              <dd>{item.item['POSITION']}</dd>
              <dd>{item.item['WEBSITE']}</dd>
            </dl>
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
