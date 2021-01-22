import React from 'react'
import SbEditable from 'storyblok-react'
import Heading from '../partials/heading'
import SbLink from "../partials/sbLink"

const OodIconCard = (props) => {
  return (
    <SbEditable content={props.blok}>
      <article className={`ood-icon-card
             ${props.blok.backgroundColor !== "white" ? "su-text-white" : ""}
             su-text-align-${props.blok.contentAlign}`
      }>
        <SbLink link={props.blok.link}
                classes={`ood-icon-card__link su-bg-${props.blok.backgroundColor}
            ${props.blok.backgroundColor === "white" ? "su-border-color-black-10" : `su-border-color-${props.blok.backgroundColor}`}`}>
          <div className="ood-icon-card__media">
            <span aria-hidden="true"
                  className={`ood-icon-card__icon
                  ${props.blok.iconStyle ? props.blok.iconStyle : props.blok.icon.type}
                  ${props.blok.extraIcon ? `fa-${props.blok.extraIcon}` : props.blok.icon.icon}
                  ${props.blok.backgroundColor !== "white" ? "su-text-white" : "su-text-digital-red"}`}/>
          </div>
          <div className="ood-icon-card__contents">
            <Heading level={props.blok.headingLevel} defaultLevel={"h3"}
                     classes={"ood-icon-card__headline su-hocus-underline su-mb-none"}
                     weight={"semibold"}
                     external={props.blok.link.linktype === "url"}
                     color={props.blok.backgroundColor !== "white" ? "white" : "black"}>
              {props.blok.headline}
            </Heading>
          </div>
        </SbLink>
      </article>
    </SbEditable>
  )
}

export default OodIconCard
