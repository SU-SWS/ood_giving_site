import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenuCard = (props) => (
    <SbEditable content={props.blok}>
        <div className="ood-mega-menu--card">
            <div className="ood-mega-menu--card--image image-ratio-1-2">
                <img src={props.blok.cardImage.filename}></img>
                {/*<img src={value.personImage.file.url + "?w=200"} alt={value.personImage.description}/>*/}
            </div>
            {/*<div className="ood-mega-menu--card--text-area { props.blok.cardBackgroundColor }">*/}
            <div className={props.blok.cardBackgroundColor ? "ood-mega-menu--card--text-area su-text-white su-bg-" + props.blok.cardBackgroundColor : "ood-mega-menu--card--text-area su-bg-bright-red"}>
                <h3 className={ props.blok.cardHeadingStyle }>{ props.blok.cardHeading }</h3>
                {/*<h4 className={ props.blok.cardBackgroundColor }>{ props.blok.cardBackgroundColor }</h4>*/}
                { props.blok.cardText }
                <div className="ood-mega-menu--card--cta">
                    {props.blok.cta && props.blok.cta.map((blok) => React.createElement(Components(blok.component), {
                        key: blok._uid,
                        blok: blok,
                    }))}
                </div>
            </div>

        </div>
    </SbEditable>
)

export default OodMegaMenuCard
