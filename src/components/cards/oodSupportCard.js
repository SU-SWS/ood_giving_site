import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'

const OodSupportCard = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";
  const taxonomyString = (taxonomyArray) => {
    return taxonomyArray.toString();
  };

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-support-card su-text-white su-text-align-left`}
               data-areas-to-support={taxonomyString(props.blok.taxonomy)}>
        <a href={props.blok.link} rel="nofollow noopener" className={`ood-support-card__link su-bg-${props.blok.backgroundColor}`}>
          <section className="ood-support-card__contents">
            <Heading className="ood-support-card__headline su-semibold su-text-white">{props.blok.headline}</Heading>
            <span aria-hidden="true"
                  className={`ood-support-card__icon su-text-white
                  ${props.blok.iconStyle ? props.blok.iconStyle : props.blok.icon.type}
                  ${props.blok.extraIcon ? `fa-${props.blok.extraIcon}` : props.blok.icon.icon}
            `}/>
          </section>
        </a>
      </article>
    </SbEditable>
  )
};

export default OodSupportCard
