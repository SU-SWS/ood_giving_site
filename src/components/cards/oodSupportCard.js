import React from 'react';
import SbEditable from 'storyblok-react';
import Heading from '../partials/heading';
import SbLink from '../partials/sbLink';

const OodSupportCard = (props) => {
  const taxonomyString = (taxonomyArray) => {
    return taxonomyArray.toString();
  };

  return (
    <SbEditable content={props.blok}>
      <div
        className={`ood-support-card su-text-white su-text-align-left`}
        data-areas-to-support={taxonomyString(props.blok.taxonomy)}
      >
        <SbLink
          link={props.blok.link}
          classes={`ood-support-card__link su-text-white su-bg-${props.blok.backgroundColor}`}
        >
          <div className="ood-support-card__contents">
            <span
              classes={`ood-support-card__headline ${
                props.blok.link.linktype === 'url' ? 'su-link--external' : ''
              }`}
            >
              {props.blok.headline}
            </span>
            <span
              aria-hidden="true"
              className={`ood-support-card__icon su-text-white
                  ${
                    props.blok.iconStyle
                      ? props.blok.iconStyle
                      : props.blok.icon.type
                  }
                  ${
                    props.blok.extraIcon
                      ? `fa-${props.blok.extraIcon}`
                      : props.blok.icon.icon
                  }
        `}
            />
          </div>
        </SbLink>
      </div>
    </SbEditable>
  );
};

export default OodSupportCard;
