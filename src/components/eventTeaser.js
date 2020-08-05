import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const EventTeaser = (props) => (
  <SbEditable content={props.blok}>
    <div className="su-event-teaser">
      <div className="container">
        <h2 className="display-4">{ props.blok.eventTitle }</h2>
        <RichTextField className="event-summary su-big-paragraph" data={ props.blok.eventSummary ? props.blok.eventSummary : "" }></RichTextField>
        <p className="lead">
          <Link className="btn btn-primary" to={'/blog/'}>
            See event
          </Link>
        </p>
      </div>
    </div>
  </SbEditable>
)

export default EventTeaser