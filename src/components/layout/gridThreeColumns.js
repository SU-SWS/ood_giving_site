import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks"

const GridThreeColumns = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`centered-container grid-3-column su-mb-${props.blok.bottomSpacing}`}>
        <CreateBloks blokSection={props.blok.gridContent} />
      </div>
    </SbEditable>
  )
}

export default GridThreeColumns
