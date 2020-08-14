import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "./components";

const OodMegaMenu = (props) => (
    <SbEditable content={props.blok}>
        <div className="ood-mega-menu">
            { props.blok.class }

            {props.blok.topLevelLinks && props.blok.topLevelLinks.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok,
            }))}

        </div>
    </SbEditable>
)

export default OodMegaMenu
