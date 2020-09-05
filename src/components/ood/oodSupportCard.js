import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'

const OodSupportCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={`su-card su-card--link ood-support-card su-text-white`} data-area-of-support={props.blok.taxonomy}>
      <a href={props.blok.link} rel="nofollow noopener" className={`ood-support-card__link su-bg-${props.blok.backgroundColor}`}>
        <section className="ood-support-card__contents">
          <h2 className="ood-support-card__headline">{props.blok.headline}</h2>
          <span aria-hidden="true"
                className={`ood-support-card__icon su-text-white
              ${props.blok.iconStyle ? props.blok.iconStyle : props.blok.icon.type}
              ${props.blok.extraIcon ? `fa-${props.blok.extraIcon}` : props.blok.icon.icon}
        `}/>
        </section>
      </a>
    </article>
  </SbEditable>
)

export default OodSupportCard