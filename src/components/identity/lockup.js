import React from 'react'
import SbEditable from 'storyblok-react'

const Lockup = (props) => (
  <SbEditable content={props.blok}>
    <div class="su-lockup su-lockup--option-n">
      <a href={props.blok.logoLink}>
        <div class="su-lockup__cell1">
          <div class="su-lockup__wordmark-wrapper">
            <span class="su-lockup__wordmark">Stanford</span>
          </div>
        </div>
        <div class="su-lockup__cell2">
          <span class="su-lockup__line1">{props.blok.lineOne}</span>
        </div>
      </a>
    </div>
  </SbEditable>
)

export default Lockup