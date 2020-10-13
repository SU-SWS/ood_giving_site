import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'

const OodSupportCard = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";

  const taxonomyString = (taxonomyArray) => {
    return taxonomyArray.toString();
  };

  const SupportCardContent = (props) => (
    <SbEditable content={props.blok}>
      <section className="ood-support-card__contents">
        <Heading className={`ood-support-card__headline su-semibold su-text-white
                 ${props.blok.link.linktype === "url" ? "su-link--external" : ""}`}>{props.blok.headline}</Heading>
        <span aria-hidden="true"
              className={`ood-support-card__icon su-text-white
                  ${props.blok.iconStyle ? props.blok.iconStyle : props.blok.icon.type}
                  ${props.blok.extraIcon ? `fa-${props.blok.extraIcon}` : props.blok.icon.icon}
            `}/>
      </section>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-support-card su-text-white su-text-align-left`}
               data-areas-to-support={taxonomyString(props.blok.taxonomy)}>
        {props.blok.link.linktype === "story" &&
          <Link
            to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
            className={`ood-support-card__link su-bg-${props.blok.backgroundColor}`}
          >
            <SupportCardContent {...props}/>
          </Link>
        }
        {(props.blok.link.linktype === "url" || props.blok.link.linktype === "asset") &&
          <a href={props.blok.link.url ? props.blok.link.url : props.blok.link.cached_url}
             className={`ood-support-card__link su-bg-${props.blok.backgroundColor}`}>
            <SupportCardContent {...props}/>
          </a>
        }
      </article>
    </SbEditable>
  )
};

export default OodSupportCard
