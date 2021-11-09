import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import Heading from './heading';
import CenteredContainer from './centeredContainer';

/*
 *
 ** The Icon Card Section component is referenced by the Interior Page, Landing Page, Story page, and Support page types.
 *
 */

const IconCardSection = (props) => {
  let numIconCards;
  if (props.blok.iconCards == null) {
    numIconCards = 0;
  } else {
    numIconCards = Object.keys(props.blok.iconCards).length;
  }

  return (
    <SbEditable content={props.blok}>
      {numIconCards > 0 && (
        <div className="ood-icon-card-section su-bg-black-10 su-py-6">
          <Heading level="h2" classes="su-sr-only-element">
            {props.blok.iconCardHeading
              ? props.blok.iconCardHeading
              : 'Links to more information'}
          </Heading>
          <CenteredContainer
            flex={true}
            classes={`ood-icon-card-section__container su-align-items-stretch su-flex-${numIconCards}-col`}
          >
            <CreateBloks blokSection={props.blok.iconCards} />
          </CenteredContainer>
        </div>
      )}
    </SbEditable>
  );
};

export default IconCardSection;
