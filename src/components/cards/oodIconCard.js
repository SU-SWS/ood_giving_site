import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'

const OodIconCard = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";

  return (
    <SbEditable content={props.blok}>
      <article className={`su-card su-card--link ood-icon-card
             ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : ""}
             su-text-align-${props.blok.contentAlign}`
      }>
        <a href={props.blok.link} rel="nofollow noopener"
           className={`tile-card__link su-bg-${props.blok.backgroundColor}`}>
          <div className="ood-icon-card__media">
          <span aria-hidden="true"
                className={`ood-icon-card__icon
                ${props.blok.iconStyle ? props.blok.iconStyle : props.blok.icon.type}
                ${props.blok.extraIcon ? `fa-${props.blok.extraIcon}` : props.blok.icon.icon}
                ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : "su-text-digital-red"}
           `}/>
          </div>
          <section className="su-card__contents ood-icon-card__contents">
            <Heading
              className={`ood-icon-card__headline su-semibold su-hocus-underline
              ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : "su-text-black"}`}>
              {props.blok.headline}
            </Heading>
          </section>
        </a>
      </article>
    </SbEditable>
  )
}

export default OodIconCard
