import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodNavigationLink = (props) => (

    <SbEditable content={props.blok}>
        <li className="nav-item active">
            {props.blok.link.linktype === "story" &&
            <Link to={'/' + (props.blok.url === 'home' ? '' : props.blok.link.cached_url)} className={props.blok.linkClass ? "su-link " + props.blok.linkClass : "su-link "} activeClassName="active">
                {props.blok.linkTextLabel}
            </Link>}
            {props.blok.link.linktype === "url" &&
            <a href={props.blok.link.url} className={props.blok.linkClass ? "su-link su-link--external " + props.blok.linkClass : "su-link su-link--external"}>
                { props.blok.linkText }
            </a>}
        </li>
            {/* Check if we need anything about url home in here? */}
            {/*<Link className="nav-link" to={'/' + (props.blok.url === 'home' ? '' : props.blok.link.cached_url)}>*/}
            {/*    {props.blok.name}*/}
            {/*</Link>*/}


    </SbEditable>
)

export default OodNavigationLink
