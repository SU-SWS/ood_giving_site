import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";
import RichTextField from "../richTextField";

const Card = (props) => (
  <SbEditable content={props.blok}>
    <div className="event-top-card-info">
      <h2 className=" su-type-b">{ props.blok.cardHeading }</h2>
      <p className="lead">{ props.blok.cardSubHeading }</p>
      {/*<RichTextField className="session-description su-subheading" data={ props.blok.cardBody ? props.blok.cardBody : "" }></RichTextField>*/}
      {/*<p className="lead">{ props.blok.cardBody }</p>*/}
      <div className="event-card--links-section">
        {/*<p className="lead">*/}
        {/*    <Link className="btn btn-primary" to={ props.blok.cardLinks}>*/}
        {/*        Blog Posts*/}
        {/*    </Link>*/}
        {/*</p>*/}
        {/*<div className="event-card--link">*/}
        <ul>
          {props.blok.cardLinks && props.blok.cardLinks.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok,
            wrapperParent: 'li',
          }))}
        </ul>

        {/*</div>*/}
      </div>
    </div>
  </SbEditable>
)

export default Card