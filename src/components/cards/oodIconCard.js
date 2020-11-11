import React from 'react'
import Link from "gatsby-link"
import SbEditable from 'storyblok-react'
import Heading from '../partials/heading'

const OodIconCard = (props) => {

  const IconCardContent = (props) => (
    <SbEditable content={props.blok}>
      <div className="ood-icon-card__media">
        <span aria-hidden="true"
              className={`ood-icon-card__icon
              ${props.blok.iconStyle ? props.blok.iconStyle : props.blok.icon.type}
              ${props.blok.extraIcon ? `fa-${props.blok.extraIcon}` : props.blok.icon.icon}
              ${props.blok.backgroundColor !== "white" ? "su-text-white" : "su-text-digital-red"}
         `}/>
      </div>
      <section className="ood-icon-card__contents">
        <Heading level={props.blok.headingLevel} defaultLevel={"h3"}
                 classes={"ood-icon-card__headline su-hocus-underline su-mb-none"}
                 weight={"semibold"}
                 external={props.blok.link.linktype === "url"}
                 color={props.blok.backgroundColor !== "white" ? "white" : "black"}
        >
          {props.blok.headline}
        </Heading>
      </section>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-icon-card
             ${props.blok.backgroundColor !== "white" ? "su-text-white" : ""}
             su-text-align-${props.blok.contentAlign}`
      }>
        {props.blok.link.linktype === "story" &&
          <Link
            to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
            className={`ood-icon-card__link su-bg-${props.blok.backgroundColor}
            ${props.blok.backgroundColor === "white" ? "su-border-color-black-10" : `su-border-color-${props.blok.backgroundColor}`}`}
          >
            <IconCardContent {...props}/>
          </Link>
        }
        {(props.blok.link.linktype === "url" || props.blok.link.linktype === "asset") &&
          <a href={props.blok.link.url ? props.blok.link.url : props.blok.link.cached_url}
             className={`ood-icon-card__link su-bg-${props.blok.backgroundColor}
             ${props.blok.backgroundColor === "white" ? "su-border-color-black-10" : `su-border-color-${props.blok.backgroundColor}`}`}>
            <IconCardContent {...props}/>
          </a>
        }
      </article>
    </SbEditable>
  )
}

export default OodIconCard
