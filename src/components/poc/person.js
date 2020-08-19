import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const PersonBioLayout = (props) => (
  <div className="session-person--text-content">
    <div className="su-big-paragraph"><span
      className="person--display-name">{props.blok.personDisplayName ? props.blok.personDisplayName : "TBD"}</span>, {props.blok.personClassYear ? props.blok.personClassYear + "," : ""} {props.blok.personTitle ? props.blok.personTitle : ""}
    </div>
    <p>{props.blok.personBiography}</p>
  </div>
)

// export default PersonBioLayout

const PersonLectureLayout = (props) => (
  <div className="session-person--text-content">
    <div className="su-type-d presentation-title">{props.blok.presentationTitle ? props.blok.presentationTitle : ""}</div>
    <div className="su-big-paragraph"><span
      className="person--display-name">{props.blok.personDisplayName ? props.blok.personDisplayName : "TBD"}</span>, {props.blok.personClassYear ? props.blok.personClassYear + "," : ""} {props.blok.personTitle ? props.blok.personTitle : ""}
    </div>
  </div>
)

// export default PersonLectureLayout

const Person = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className="session-person">
        {/*  this only shows one layout - need to add logic IF it has a presentation title or not */}
        <div className="person-image circle-image">
          <img src={props.blok.personImage ? "http:" + props.blok.personImage : ""}></img>
          {/*<img src={value.personImage.file.url + "?w=200"} alt={value.personImage.description}/>*/}
        </div>
        {props.layout == 'lecture-title' &&
        <PersonLectureLayout {...props}/>
        }
        {props.layout == 'person-focus' &&
        <PersonBioLayout {...props}/>
        }
      </div>
      {/* this is passing props into personlayoulecture so it's the same*/}
    </SbEditable>
  )
}

export default Person