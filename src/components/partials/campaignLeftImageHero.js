import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';
import Heading from './heading';
import FullWidthImage from '../media/fullWidthImage';
import transformImage from '../../utilities/transformImage';

/* The Hero section with image on the left is referenced by the Campaign Page type. */

const CampaignLeftImageHero = (props) => {
  const full_width_image = props.blok.image?.filename ? (
    <FullWidthImage
      {...props}
      filename={props.blok.image.filename}
      classPrefix={'campaign-page'}
      visibleVertical={props.blok.visibleVertical}
      visibleHorizontal={'center'}
      alt={props.blok.image.alt ?? ''}
    />
  ) : (
    <div className={'full-width-image-placeholder'} aria-hidden="true" />
  );

  return (
    <SbEditable content={props.blok}>
      <header
        className={`campaign-page__header campaign-page__header--full-width-image`}
      >
        <div className="campaign-page__image-logo-wrapper">
          {full_width_image}
          {props.blok.logo.filename && (
            <img
              className={'hero-logo'}
              src={transformImage(props.blok.logo.filename)}
              alt={props.blok.logo.alt}
            />
          )}
        </div>
        <div className={'campaign-page__header-content'}>
          <div className={`campaign-page__header-content-wrapper`}>
            <Heading
              level={'h1'}
              weight={'semibold'}
              serif={false}
              classes={'campaign-page__title'}
            >
              {props.blok.title}
            </Heading>
            {props.blok.intro && (
              <p className="campaign-page__header-intro su-mb-none">
                {props.blok.intro}
              </p>
            )}
            {props.blok.heroCta && (
              <CreateBloks blokSection={props.blok.heroCta} />
            )}
          </div>
        </div>
      </header>
    </SbEditable>
  );
};

export default CampaignLeftImageHero;
