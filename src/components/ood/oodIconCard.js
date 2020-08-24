import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'

const OodIconCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={`su-card su-card--link ood-icon-card
             ${props.blok.backgroundColor !== "white" ? "su-text-white" : ""}
             su-text-align-${props.blok.contentAlign}`
    }>
      <a href={props.blok.link} rel="nofollow noopener" className={`tile-card__link su-bg-${props.blok.backgroundColor}`}>
        <div className="ood-icon-card__media">
          {props.blok.icon.icon && (
            <span aria-hidden="true"
                  className={`ood-icon-card__icon
                  ${props.blok.icon.type}
                  ${props.blok.icon.icon}
                  ${props.blok.iconStyle ? props.blok.iconStyle : ""}
                   ${props.blok.backgroundColor !== "white" ? "su-text-white" : "su-text-digital-red"}
             `} />
          )}
        </div>
        <section className="su-card__contents ood-icon-card__contents">
          <h2 className="ood-icon-card__headline">{props.blok.headline}</h2>
        </section>
      </a>
    </article>
  </SbEditable>
)

export default OodIconCard