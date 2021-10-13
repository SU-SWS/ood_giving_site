import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';

const RowTwoColumns = (props) => (
  <SbEditable content={props.blok}>
    <div className={`row--2-columns su-mb-${props.blok.spacingBottom}`}>
      <div
        className={`flex-container su-align-items-${props.blok.contentAlignment} ${props.blok.rowWidth} ${props.blok.align}`}
      >
        <div
          className={`${
            props.blok.oneColumnMd === true ? 'flex-lg' : 'flex-md'
          }${!props.blok.widthRatio ? '-6-of-12' : ''}${
            props.blok.widthRatio === '1-to-2' ? '-4-of-12' : ''
          }${props.blok.widthRatio === '2-to-1' ? '-8-of-12' : ''}`}
        >
          <CreateBloks blokSection={props.blok.columnOneContent} />
        </div>
        <div
          className={`${
            props.blok.oneColumnMd === true ? 'flex-lg' : 'flex-md'
          }${!props.blok.widthRatio ? '-6-of-12' : ''}${
            props.blok.widthRatio === '1-to-2' ? '-8-of-12' : ''
          }${props.blok.widthRatio === '2-to-1' ? '-4-of-12' : ''}`}
        >
          <CreateBloks blokSection={props.blok.columnTwoContent} />
        </div>
      </div>
    </div>
  </SbEditable>
);

export default RowTwoColumns;
