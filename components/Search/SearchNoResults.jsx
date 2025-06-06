import React from 'react';
import { useSearchBox } from 'react-instantsearch';
import { Heading } from '../simple/Heading';
import CreateBloks from '../../utilities/createBloks';

const SearchNoResults = ({ heading, body, additionalContent }) => {
  const { query } = useSearchBox();
  const parsedHeading = heading.replace('[query]', query);
  return (
    <div className="su-col-span-9 su-col-start-3">
      <Heading level={2} size={3} font="serif">
        {parsedHeading}
      </Heading>
      <p>{body}</p>
      <div>
        <CreateBloks blokSection={additionalContent} />
      </div>
    </div>
  );
};

export default SearchNoResults;
