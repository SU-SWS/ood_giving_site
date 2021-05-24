import React from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../utilities/createBloks"
import Heading from "./heading"
import FullWidthImage from "../media/fullWidthImage";
import FlexCell from "./flexCell";

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */

const CampaignHeroHeader = (props) => {

  const isFullWidthImage = props.blok.heroStyle === 'fullwidth-image';

  const campaignContentClasses = `campaign-page__header-content
  campaign-page__header-${props.blok.heroContentPosition}
  su-bg-${props.blok.heroBgColor}
  su-${props.blok.heroContentColor}
  ${isFullWidthImage ? 'flex-container column-grid centered-container' : ''}
  ${props.blok.heroContentPosition === 'right' ? 'su-flex-row-reverse' : ''}`

  const full_width_image = props.blok.image?.filename != null ? (
    <FullWidthImage
      {...props}
      filename={props.blok.image?.filename}
      classPrefix={"campaign-page"}
      visibleVertical={props.blok.visibleVertical}
      visibleHorizontal={"center"}
      alt={props.blok.image?.alt ?? ""}
    />
  ) : (<div className={'full-width-image-placeholder'} aria-hidden='true' />);

  return (
    <SbEditable content={props.blok}>
      <header
        className={`campaign-page__header campaign-page__header--${props.blok.heroStyle}`}
      >
        <div className='campaign-page__image-wrapper'>
          {full_width_image}
        </div>
        <div className={campaignContentClasses}>
          <div className={`campaign-page__header-content-wrapper ${isFullWidthImage ? 'flex-md-6-of-12 column-grid__column' : ''}`}>
            {props.blok.logo?.filename &&
              <img
                className='campaign-page__header-content-logo'
                src={props.blok.logo?.filename}
                alt={props.blok.logo?.alt}
              />
            }
            <Heading
              level={"h1"}
              weight={`${isFullWidthImage  ? 'regular' : 'semibold'}`}
              serif={props.blok.heroStyle === 'fullwidth-image'}
              classes={"campaign-page__title"}
            >
              {props.blok.title}
            </Heading>
            {props.blok.intro &&
              <p className='campaign-page__header-intro su-mb-none'>
                {props.blok.intro}
              </p>
            }
            {props.blok.heroCta &&
              <CreateBloks blokSection={props.blok.heroCta} />
            }
          </div>
        </div>
      </header>
    </SbEditable>
  );
}

export default CampaignHeroHeader
