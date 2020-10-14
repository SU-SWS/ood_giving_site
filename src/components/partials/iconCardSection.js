import React from "react";
import SbEditable from "storyblok-react";
import Components from "../components";

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
            {props.blok.iconCards && props.blok.iconCards.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </div>
        </div>
      )}
    </SbEditable>
  )
};

export default IconCardSection
