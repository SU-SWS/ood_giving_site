import React from 'react';
import SbEditable from 'storyblok-react';
import { dcnb } from 'cnbuilder';
import { Heading } from '../simple/Heading';
import CreateBloks from '../../utilities/createBloks';

const SearchSuggestions = ({ blok: { content, title, titleColor }, blok }) => (
  <SbEditable content={blok}>
    <div>
      <Heading
        font="serif"
        size={2}
        level={3}
        className={dcnb(
          'su-mt-108 md:su-rs-mt-7 su-rs-mb-3',
          `${titleColor === 'white' ? 'su-text-white' : 'su-text-black'}`,
        )}
      >
        {title}
      </Heading>
      {content && <CreateBloks blokSection={content} />}
    </div>
  </SbEditable>
);

export default SearchSuggestions;
