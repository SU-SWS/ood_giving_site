import React from 'react'
import SbEditable from 'storyblok-react'
import SbLink from "../partials/sbLink"

const CtaLink = (props) => (
  <SbEditable content={props.blok}>
    {props.blok.linkText && (
      <div className={`ood-cta su-block su-text-align-${props.blok.align}`}>
        <SbLink link={props.blok.link} classes={props.blok.isButton === true ?
          `ood-cta__button ${props.blok.linkButtonStyle} ${props.blok.linkButtonSize} ${props.blok.linkIcon}`
          : `su-link ood-cta__link ${props.blok.linkIcon} ${props.blok.linkTextColor}`}
                attributes={props.blok.rel ? {rel : props.blok.rel} : {}}
        >{props.blok.linkText}
          {props.blok.srText &&
          <span className="su-sr-only-element">{` ${props.blok.srText}`}</span>
          }
        </SbLink>
      </div>
    )}
  </SbEditable>
);

export default CtaLink
