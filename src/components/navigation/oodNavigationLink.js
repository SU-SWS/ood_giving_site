import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodNavigationLink = (props) => (
    <SbEditable content={props.blok}>
        <li className="nav-item active">
            <Link className="nav-link" to={'/' + (props.blok.url === 'home' ? '' : props.blok.link.cached_url)}>
                {props.blok.name}
            </Link>
        </li>
        <div className={props.blok.linkClass ? "ood-navigation-link " + props.blok.linkClass : "ood-navigation-link "}>
            { props.blok.linkText }
            { props.blok.url }
        </div>
    </SbEditable>
)

export default OodNavigationLink
