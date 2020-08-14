import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "./components";

const OodNavigationLink = (props) => (
    <SbEditable content={props.blok}>
        <div className="ood-navigation-link">
            { props.blok.linkText }
            { props.blok.url }

        </div>
    </SbEditable>
)

export default OodNavigationLink
