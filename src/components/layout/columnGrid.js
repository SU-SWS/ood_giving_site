import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';

const ColumnGrid = (props) => (
  <SbEditable content={props.blok}>
    <div className={`flex-container column-grid`}>
      <div
        className={`${
          props.blok.oneColumnMd === true
            ? 'flex-lg-4-of-12'
            : 'flex-md-4-of-12'
        } column-grid__column
             ${
               Object.keys(props.blok.columnOneContent).length === 0
                 ? 'su-mb-none'
                 : ''
             }
        `}
      >
        <CreateBloks blokSection={props.blok.columnOneContent} />
      </div>
      <div
        className={`${
          props.blok.oneColumnMd === true
            ? 'flex-lg-4-of-12'
            : 'flex-md-4-of-12'
        } column-grid__column
             ${
               Object.keys(props.blok.columnTwoContent).length === 0 ||
               Object.keys(props.blok.columnThreeContent).length === 0
                 ? 'su-mb-none'
                 : ''
             }
             `}
      >
        <CreateBloks blokSection={props.blok.columnTwoContent} />
      </div>
      <div
        className={`${
          props.blok.oneColumnMd === true
            ? 'flex-lg-4-of-12'
            : 'flex-md-4-of-12'
        } column-grid__column`}
      >
        <CreateBloks blokSection={props.blok.columnThreeContent} />
      </div>
    </div>
  </SbEditable>
);

export default ColumnGrid;
