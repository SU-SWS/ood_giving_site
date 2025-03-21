import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../partials/sbLink';
import cx from 'classnames';

const OodIconCard = (props) => {
  return (
    <SbEditable content={props.blok}>
      <article
        className={cx(
          'ood-icon-card',
          props.blok.backgroundColor !== 'white' ? 'su-text-white' : '',
          `su-text-align-${props.blok.contentAlign}`
        )}
      >
        <SbLink
          link={props.blok.link}
          classes={cx(
            'ood-icon-card__link',
            `su-bg-${props.blok.backgroundColor}`,
            props.blok.backgroundColor === 'white'
              ? 'su-border-color-black-10'
              : `su-border-color-${props.blok.backgroundColor}`
          )}
        >
          <div className="ood-icon-card__media">
            <span
              aria-hidden="true"
              className={cx(
                'ood-icon-card__icon',
                props.blok.iconStyle
                  ? props.blok.iconStyle
                  : props.blok.icon.type,
                props.blok.extraIcon
                  ? `fa-${props.blok.extraIcon}`
                  : props.blok.icon.icon,
                props.blok.backgroundColor !== 'white'
                  ? 'su-text-white'
                  : 'su-text-digital-red'
              )}
            />
          </div>
          <div className="ood-icon-card__contents">
            <span
              className={cx(
                'ood-icon-card__headline su-hocus-underline su-mb-none',
                props.blok.backgroundColor !== 'white'
                  ? 'su-text-white'
                  : 'su-text-black'
              )}
            >
              {props.blok.headline}
            </span>
          </div>
        </SbLink>
      </article>
    </SbEditable>
  );
};

export default OodIconCard;
