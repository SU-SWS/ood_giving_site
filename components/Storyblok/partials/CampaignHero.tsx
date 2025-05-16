import React from 'react';
import { type SbBlokData } from '@storyblok/react';
import { storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';
import { FullWidthImage } from '@/components/Storyblok/partials/FullWidthImage';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { modTypeSizes, type ModTypeSizeTypes } from '@/utilities/datasource';

export type CampaignHeroProps = {
  blok: SbBlokData & {
    title?: string;
    oodCampaignHeader: SbBlokData[];
    heroStyle?: string;
    heroContentPosition?: string;
    heroBgColor?: string;
    heroContentColor?: string;
    heroContentAlignment?: string;
    heroTitleType?: ModTypeSizeTypes;
    heroTitleFontSerif?: boolean;
    image?: {
      filename?: string;
      alt?: string;
    },
    logo?: {
      filename?: string;
      alt?: string;
    },
    logoAlignment?: string;
    visibleHorizontal?: string;
    bar?: string;
    barBgColor?: string;
    barAlignment?: string;
    intro?: string;
    heroIntroFontSerif?: string;
    heroCta?: SbBlokData[];
  },
  htmlId: string;
};

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */
export const CampaignHero = (props: CampaignHeroProps) => {
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
    <div
      id={htmlId}
      className={`campaign-page__hero campaign-page__hero--${blok.heroStyle}`}
      {...storyblokEditable(props.blok)}
    >
      <div className="campaign-page__image-wrapper">{full_width_image}</div>
      <div className={campaignContentClasses}>
        <div>
          {blok.logo?.filename && (
            <img
              src={getProcessedImage(blok.logo?.filename)}
              alt={blok.logo?.alt}
            />
          )}
          <div>
            <Heading
              as="h1"
              size={modTypeSizes[blok.heroTitleType] || 'f4'}
              weight={isFullWidthImage ? 'normal' : 'semibold'}
              font={blok.heroStyle === 'fullwidth-image' && blok.heroTitleFontSerif ? 'serif' : 'sans'}
              className="campaign-page__title"
            >
              {blok.title}
            </Heading>
            {blok.bar && (
              <div
                className={`campaign-page__hero-bar su-bg-${blok.barBgColor} ${blok.barAlignment}`}
              />
            )}
            {blok.intro && (
              <p>
                {blok.intro}
              </p>
            )}
            {blok.heroCta && <CreateBloks blokSection={blok.heroCta} />}
          </div>
        </div>
      </div>
    </div>
  );
};
