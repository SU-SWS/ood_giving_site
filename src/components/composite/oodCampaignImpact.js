import SbEditable from "storyblok-react"
import React from "react"

const OodCampaignImpact = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className="impact-cards su-flex">
        {
          props.blok.graph_item.map((number) => {
              const percent = `${(number.percent * 3.6) + 180}deg`;
              return (
              <div className="impact-card">
                <div className={`impact-card__wrapper su-bg-${number.graph_line_color}`}>
                  <div className={number.percent > 50 ? 'impact-card--more-than-half' : ''}>
                    <div
                      className={`impact-card__left ${number.percent > 50 ? 'impact-card__left--more-than-half' : ''} impact-card__half`}
                      style={{'--percent': percent}}></div>
                    {
                      number.percent <= 50 &&
                      <div className="impact-card__right impact-card__half"
                           style={{'--percent': percent}}></div>
                    }
                  </div>
                  <div className="impact-card__label su-mod-type-6">{number.percent}%</div>
                </div>

                <div className="su-mod-type-1">{number.description}</div>
              </div>
            )
          })
        }
      </div>
    </SbEditable>
  );
}

export default OodCampaignImpact


