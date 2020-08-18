import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const Quote = (props) => (
  <SbEditable content={props.blok}>
    <article className="event-quote">
      <h4 className="su-type-c text-centered event-quote--text">{props.blok.testimonialText}</h4>
      <div className="su-small-paragraph text-centered">{props.blok.testimonialAuthor}</div>
    </article>
  </SbEditable>
)

export default Quote