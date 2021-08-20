import React from 'react'
import SbEditable from 'storyblok-react'
import SbLink from "../partials/sbLink"

const Lockup = (props) => {  return (
    <SbEditable content={props.blok}>
      <div className="su-lockup su-lockup--option-n">
        <SbLink link={props.blok.link}>
          <div className="su-lockup__cell1">
            <div className="su-lockup__wordmark-wrapper">
              <span className="su-lockup__wordmark">Stanford</span>
            </div>
          </div>
          <div className="su-lockup__cell2">
            <span className="su-lockup__line1">{props.blok.lineOne}</span>
          </div>
        </SbLink>
      </div>
    </SbEditable>
  )
};

export default Lockup
