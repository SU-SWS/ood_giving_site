import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const OodMegaMenuCard = (props) => (
    <SbEditable content={props.blok}>
    <div className="ood-mega-menu__card">
    <div className="ood-mega-menu__card-image">
        <img src={props.blok.image.filename} />
    </div>
    <div className={props.blok.backgroundColor ? "ood-mega-menu__card-content su-text-white su-bg-" + props.blok.backgroundColor : "ood-mega-menu--card--text-area su-bg-bright-red"}>
        <h3 className="ood-mega-menu__card-heading">{props.blok.heading}</h3>
        <div className="ood-mega-menu--card-cta">{props.blok.ctaText}</div>
    </div>
    </div>
    </SbEditable>
)

export default OodMegaMenuCard
