import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'

const Lockup = (props) => {

  const LockupContent = (props) => (
    <SbEditable content={props.blok}>
      <div className="su-lockup__cell1">
        <div className="su-lockup__wordmark-wrapper">
          <span className="su-lockup__wordmark">Stanford</span>
        </div>
      </div>
      <div className="su-lockup__cell2">
        <span className="su-lockup__line1">{props.blok.lineOne}</span>
      </div>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <div className="su-lockup su-lockup--option-n">
        {props.blok.link.linktype === "story" &&
          <Link to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}>
            <LockupContent {...props}/>
          </Link>
        }
        {props.blok.link.linktype === "url" &&
          <a href={props.blok.link.url}>
            <LockupContent {...props}/>
          </a>
        }
      </div>
    </SbEditable>
  )
};

export default Lockup
