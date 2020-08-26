import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodCtaLink = (props) => (

    <SbEditable content={props.blok}>
        <li className="nav-item active">
            {/*We want to test the url options here with a use case of 2+ sites in this storyblok space and multiple "home" pages - how is this working?*/}
            {/*If this is checking if the url matches the base url then hopefully this would work fine even with multiple websites..*/}
            {/* Since when we add the link to the "home" page using the Link component, it will at first render the actual slug in the href which is "home", but replacing that with just / is nicer. */}

            {props.blok.link.linktype === "story" &&
            <Link to={'/' + (props.blok.url === 'home' ? '' : props.blok.link.cached_url)} className={props.blok.linkIconClass ? props.blok.linkButtonStyle + props.blok.linkIconClass  :  props.blok.linkButtonStyle } activeClassName="active">
                {props.blok.linkTextLabel}
            </Link>}
            {props.blok.link.linktype === "url" &&
            <a href={props.blok.link.url} className={props.blok.linkIconClass ? props.blok.linkButtonStyle + " su-link--external" + props.blok.linkIconClass : props.blok.linkButtonStyle + " su-link--external"}>
                { props.blok.linkText }
            </a>}
        </li>
    </SbEditable>
)

export default OodCtaLink
