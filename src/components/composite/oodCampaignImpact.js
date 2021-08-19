import SbEditable from "storyblok-react"
import React from "react"

const OodCampaignImpact = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`impact-cards su-flex ${props.blok.items.length !== 4 ? 'impact-cards--not-maxed' : ''}`}>
        {
          props.blok.items.map((item) => {
              return (
                <div className={`impact-card ${props.blok.items.length !== 4 ? 'impact-card--not-maxed' : ''}`}>
                  <div className="impact-card__wrapper">
                    <div className={`impact-card__circle ${item.percent > 50 ? 'impact-card__circle--more-than-half' : ''}`} aria-hidden="true">
                      <div className={`impact-card__circle--left-side impact-card__half-circle su-bg-${item.graph_line_color}`}
                           style={{'--percent': `${item.percent * 3.6}deg`}} />
                      {
                        item.percent > 50 &&
                        <div className={`impact-card__circle--right-side impact-card__half-circle su-bg-${item.graph_line_color}`} />
                      }
                    </div>
                    <div className="impact-card__shadow" aria-hidden="true" />
                    <div className="impact-card__label">
                      <div className="impact-card__label-text">
                        {item.percent}%<span className="sr-only"> </span>
                      </div>
                    </div>
                  </div>
                  <div className="impact-card__description su-semibold">
                    {item.description}
                  </div>
                </div>
            )
          })
        }
      </div>
    </SbEditable>
  );
}

export default OodCampaignImpact;


