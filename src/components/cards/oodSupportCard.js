import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../partials/sbLink';
import cx from 'classnames';

const OodSupportCard = (props) => {
  const taxonomyString = (taxonomyArray) => {
    return taxonomyArray.toString();
  };

  return (
    <SbEditable content={props.blok}>
      <article
        className="ood-support-card su-text-white su-text-align-left"
        data-areas-to-support={taxonomyString(props.blok.taxonomy)}
      >
        <SbLink
          link={props.blok.link}
          classes={cx(
            'ood-support-card__link',
            `su-bg-${props.blok.backgroundColor}`
          )}
        >
          <div className="ood-support-card__contents">
            <span
              className={cx(
                'ood-support-card__headline su-text-white',
                props.blok.link.linktype === 'url' ? 'su-link--external' : ''
              )}
            >
              {props.blok.headline}
            </span>
            <span
              aria-hidden="true"
              className={cx(
                'ood-support-card__icon su-text-white',
                props.blok.iconStyle
                  ? props.blok.iconStyle
                  : props.blok.icon.type,
                props.blok.extraIcon
                  ? `fa-${props.blok.extraIcon}`
                  : props.blok.icon.icon
              )}
            />
          </div>
        </SbLink>
      </article>
    </SbEditable>
  );
};

export default OodSupportCard;
