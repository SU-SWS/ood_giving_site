import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenuSection = (props) => (
    <SbEditable content={props.blok}>
        {/*<div className="ood-mega-menu--section">*/}
            <div className="ood-mega-menu--section-top-link">{ props.blok.linkText }</div>
            <div className="ood-mega-menu--section">
                {props.blok.navigationColumns && props.blok.navigationColumns.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok,
                }))}

            </div>
        {/*</div>*/}
    </SbEditable>
)

export default OodMegaMenuSection
