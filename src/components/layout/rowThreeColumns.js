import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';

const RowThreeColumns = (props) => (
  <SbEditable content={props.blok}>
    <div
      className={`flex-container row--3-columns su-align-items-${props.blok.contentAlignment} su-mb-${props.blok.spacingBottom}`}
    >
      <div
        className={`${
          props.blok.oneColumnMd === true
            ? 'flex-lg-4-of-12'
            : 'flex-md-4-of-12'
        }`}
      >
        <CreateBloks blokSection={props.blok.columnOneContent} />
      </div>
      <div
        className={`${
          props.blok.oneColumnMd === true
            ? 'flex-lg-4-of-12'
            : 'flex-md-4-of-12'
        }`}
      >
        <CreateBloks blokSection={props.blok.columnTwoContent} />
      </div>
      <div
        className={`${
          props.blok.oneColumnMd === true
            ? 'flex-lg-4-of-12'
            : 'flex-md-4-of-12'
        }`}
      >
        <CreateBloks blokSection={props.blok.columnThreeContent} />
      </div>
    </div>
  </SbEditable>
);

export default RowThreeColumns;
