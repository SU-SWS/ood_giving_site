import React from 'react'
// import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";
import RichTextField from "../richTextField";

const EventSession = (props) => (
  <SbEditable content={props.blok}>
    <div className="event-session--wrapper" key={props.blok.sessionTitle}>
      <div className="container">
        <header>
          {/*<h3 className="session-title su-type-c">{props.blok.sessionStartTime}{ '-' + props.blok.sessionEndTime} { props.blok.sessionTitle }</h3>*/}
          <h3 className="session-title su-type-c">{props.blok.sessionStartTime ? props.blok.sessionStartTime + " " : ""}{props.blok.sessionEndTime ? "- " + props.blok.sessionEndTime + " " : ""} {props.blok.sessionTitle }</h3>
          <p className="su-big-paragraph">Rich text field Session Description will show here later.</p>
          {/*<RichTextField className="session-description su-subheading" data={ props.blok.sessionDescriptionRich ? props.blok.sessionDescriptionRich : "" }></RichTextField>*/}
          {/*  this doesn't work yet - this needs to be rich text:*/}
          {/*<div className="session-description su-subheading">{ props.blok.sessionDescription }</div>*/}
        </header>
        <div className="session-people">
          {props.blok.sessionPeople && props.blok.sessionPeople.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok,
            layout: props.blok.personDisplayLayout
          }))}
        </div>
      </div>
    </div>
  </SbEditable>
)

export default EventSession