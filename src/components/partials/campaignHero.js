import React from 'react';
import SbEditable from 'storyblok-react';
import cx from 'classnames';
import CreateBloks from '../../utilities/createBloks';
import Heading from './heading';
import FullWidthImage from '../media/fullWidthImage';

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */

const CampaignHero = (props) => {
  const { blok, htmlId } = props;

  const isFullWidthImage = blok.heroStyle === 'fullwidth-image';

  const campaignContentClasses = `campaign-page__hero-content
  campaign-page__hero-${blok.heroContentPosition}
  su-bg-${blok.heroBgColor}
  su-${blok.heroContentColor}
  ${
    isFullWidthImage
      ? 'flex-container column-grid centered-container su-align-items-center'
      : ''
  }
  ${
    blok.heroContentPosition === 'right' && isFullWidthImage
      ? 'su-flex-row-reverse'
      : ''
  }`;

  const full_width_image =
    blok.image?.filename != null ? (
      <FullWidthImage
        {...props}
        filename={blok.image?.filename}
        classPrefix={'campaign-page'}
        visibleVertical={'center'}
        visibleHorizontal={blok.visibleHorizontal}
        alt={blok.image?.alt ?? ''}
      />
    ) : (
      <div className={'full-width-image-placeholder'} aria-hidden="true" />
    );

  return (
    <SbEditable content={blok}>
      <div
        id={htmlId}
        className={`campaign-page__hero campaign-page__hero--${blok.heroStyle}`}
      >
        <div className="campaign-page__image-wrapper">{full_width_image}</div>
        <div className={campaignContentClasses}>
          <div
            className={`campaign-page__hero-content-wrapper ${
              isFullWidthImage
                ? 'flex-md-9-of-12 flex-lg-6-of-12 column-grid__column'
                : ''
            }`}
          >
            {blok.logo?.filename && (
              <img
                className={`campaign-page__hero-content-logo ${blok.logoAlignment}`}
                src={blok.logo?.filename}
                alt={blok.logo?.alt}
              />
            )}
            <div
              className={`campaign-page__hero-content-body ${blok.heroContentAlignment}`}
            >
              <Heading
                level={'h1'}
                weight={`${isFullWidthImage ? 'regular' : 'semibold'}`}
                serif={
                  blok.heroStyle === 'fullwidth-image' ||
                  blok.heroTitleFontSerif
                }
                classes={`campaign-page__title ${blok.heroTitleType}`}
              >
                {blok.title}
              </Heading>
              {blok.bar && (
                <div
                  className={`campaign-page__hero-bar su-bg-${blok.barBgColor} ${blok.barAlignment}`}
                />
              )}
              {blok.intro && (
                <p
                  className={cx('campaign-page__hero-intro su-mb-none', {
                    'su-serif': blok.heroIntroFontSerif,
                  })}
                >
                  {blok.intro}
                </p>
              )}
              {blok.heroCta && <CreateBloks blokSection={blok.heroCta} />}
            </div>
          </div>
        </div>
      </div>
    </SbEditable>
  );
};

export default CampaignHero;
