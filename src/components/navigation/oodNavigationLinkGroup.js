import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "./components";

const OodNavigationLinkGroup = (props) => (
    <SbEditable content={props.blok}>
        <div className="ood-navigation-link-group">
            { props.blok.headingText }
            { props.blok.headingStyle }
            {props.blok.links && props.blok.links.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok,
            }))}

        </div>
    </SbEditable>
)

export default OodNavigationLinkGroup
