import SbEditable from "storyblok-react"
import React from "react"

const OodCampaignImpact = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`impact-cards su-flex ${props.blok.items.length !== 4 ? 'impact-cards--not-maxed' : ''}`}>
        {
          props.blok.items.map((number) => {
              const percent = `${(number.percent * 3.6) + 180}deg`;
              return (
                <div className={`impact-card ${props.blok.items.length !== 4 ? 'impact-card--not-maxed' : ''}`}>
                  <div className="impact-card__wrapper">
                    <div className={`impact-card__circle ${number.percent > 50 ? 'impact-card__circle--more-than-half' : ''}`}>
                      <div className={`impact-card__circle--left-side impact-card__half-circle su-bg-${number.graph_line_color}`}
                           style={{'--percent': `${number.percent * 3.6}deg`}}></div>
                      {
                        number.percent > 50 &&
                        <div className={`impact-card__circle--right-side impact-card__half-circle su-bg-${number.graph_line_color}`}></div>
                      }
                    </div>
                    <div className="impact-card__shadow"></div>
                    <div className="impact-card__label">
                      <div className="su-mod-type-6">
                        {number.percent}%
                      </div>
                    </div>
                  </div>
                  <div className="impact-card__description">
                    <div className="su-mod-type-1">{number.description}</div>
                  </div>
                </div>
            )
          })
        }
      </div>
    </SbEditable>
  );
}

export default OodCampaignImpact


