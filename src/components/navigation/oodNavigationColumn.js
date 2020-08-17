import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodNavigationColumn = (props) => (
    <SbEditable content={props.blok}>
        <div className="ood-mega-menu--section--column">
            {/*{ props.blok.linkText }*/}

            {props.blok.links && props.blok.links.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok,
            }))}

        </div>
    </SbEditable>
)

export default OodNavigationColumn
