import React from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../utilities/createBloks"
import Heading from "./heading"
import FullWidthImage from "../media/fullWidthImage";

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */

const CampaignHeroHeader = (props) => {
  const { blok } = props;

  const isFullWidthImage = blok.heroStyle === 'fullwidth-image';

  const campaignContentClasses = `campaign-page__header-content
  campaign-page__header-${blok.heroContentPosition}
  su-bg-${blok.heroBgColor}
  su-${blok.heroContentColor}
  ${isFullWidthImage ? 'flex-container column-grid centered-container su-align-items-center' : ''}
  ${blok.heroContentPosition === 'right' && isFullWidthImage ? 'su-flex-row-reverse' : ''}`;

  const full_width_image = blok.image?.filename != null ? (
    <FullWidthImage
      {...props}
      filename={blok.image?.filename}
      classPrefix={"campaign-page"}
      visibleVertical={"center"}
      visibleHorizontal={blok.visibleHorizontal}
      alt={blok.image?.alt ?? ""}
    />
  ) : (<div className={'full-width-image-placeholder'} aria-hidden='true' />);

  return (
    <SbEditable content={blok}>
      <header
        className={`campaign-page__header campaign-page__header--${blok.heroStyle}`}
      >
        <div className='campaign-page__image-wrapper'>
          {full_width_image}
        </div>
        <div className={campaignContentClasses}>
          <div className={`campaign-page__header-content-wrapper ${isFullWidthImage ? 'flex-md-9-of-12 flex-lg-6-of-12 column-grid__column' : ''}`}>
            {blok.logo?.filename &&
              <img
                className={`campaign-page__header-content-logo ${blok.logoAlignment}`}
                src={blok.logo?.filename}
                alt={blok.logo?.alt}
              />
            }
            <div className={`campaign-page__header-content-body ${blok.heroContentAlignment}`}>
              <Heading
                level={"h1"}
                weight={`${isFullWidthImage  ? 'regular' : 'semibold'}`}
                serif={blok.heroStyle === 'fullwidth-image'}
                classes={`campaign-page__title ${blok.heroTitleType}`}
              >
                {blok.title}
              </Heading>
              {blok.bar &&
                <div className={`campaign-page__header-bar su-bg-${blok.barBgColor} ${blok.barAlignment}`} />
              }
              {blok.intro &&
                <p className='campaign-page__header-intro su-mb-none'>
                  {blok.intro}
                </p>
              }
              {blok.heroCta &&
                <CreateBloks blokSection={blok.heroCta} />
              }
            </div>
          </div>
        </div>
      </header>
    </SbEditable>
  );
}

export default CampaignHeroHeader
