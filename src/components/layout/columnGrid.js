import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks"

const ColumnGrid = (props) => (
    <SbEditable content={props.blok}>
      <div className={`flex-container column-grid`}>
        <div className="flex-md-4-of-12 column-grid__column">
          <CreateBloks blokSection={props.blok.columnOneContent} />
        </div>
        <div className="flex-md-4-of-12 column-grid__column">
          <CreateBloks blokSection={props.blok.columnTwoContent} />
        </div>
        <div className="flex-md-4-of-12 column-grid__column">
          <CreateBloks blokSection={props.blok.columnThreeContent} />
        </div>
      </div>
    </SbEditable>
)

export default ColumnGrid
