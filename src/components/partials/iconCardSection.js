import React from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../utilities/createBloks"

/*
*
** The Icon Card Section component is referenced by the Interior Page, Landing Page, Story page, and Support page types.
*
*/

const IconCardSection = (props) => {
  let numIconCards;
  if (props.blok.iconCards == null) {
    numIconCards = 0;
  }
  else {
    numIconCards = Object.keys(props.blok.iconCards).length;
  }

  return (
    <SbEditable content={props.blok}>
      {numIconCards > 0 && (
        <div className="ood-icon-card-section su-bg-black-10 su-py-6">
          <div className={`centered-container flex-container ood-icon-card-section__container su-align-items-stretch su-flex-${numIconCards}-col`}>
            <CreateBloks blokSection={props.blok.iconCards} />
          </div>
        </div>
      )}
    </SbEditable>
  )
};

export default IconCardSection
