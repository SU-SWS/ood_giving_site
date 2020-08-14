import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "./components";

const OodMegaMenuCard = (props) => (
    <SbEditable content={props.blok}>
        <div className="ood-mega-menu--card">
            <div className="ood-mega-menu--card--image image-ratio-1-2">
                {/*<img src={props.blok.cardImage ? "http:" + props.blok.cardImage : ""}></img>*/}
                {/*<img src={value.personImage.file.url + "?w=200"} alt={value.personImage.description}/>*/}
            </div>
            { props.blok.cardHeading }
            { props.blok.cardText }

            {/*{props.blok.cta && props.blok.cta.map((blok) => React.createElement(Components(blok.component), {*/}
            {/*    key: blok._uid,*/}
            {/*    blok: blok,*/}
            {/*}))}*/}

        </div>
    </SbEditable>
)

export default OodMegaMenuCard
