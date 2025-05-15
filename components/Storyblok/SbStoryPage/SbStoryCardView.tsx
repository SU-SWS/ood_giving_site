import React from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { Heading, type HeadingType } from '@/components/Typography';
import { AspectRatioImage, type AspectRatioImageProps } from '@/components/Storyblok/partials/AspectRatioImage';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { type SbImageType } from '../Storyblok.types';
import { SuspenseWrapper } from '@/components/SuspenseWrapper';

export type SbStoryCardViewProps = AspectRatioImageProps & {
  blok: SbBlokData & {
    cardImage?: SbImageType
    heroImage?: SbImageType;
    shortTitle?: string;
    title?: string;
    teaser?: string;
    intro?: string;
  };
  headingLevel?: HeadingType;
  storyLink?: string;
  orientation?: string;
  hideImage?: boolean;
  backgroundColor?: string;
};

export const SbStoryCardView = (props: SbStoryCardViewProps) => {

  const theLink = { linktype: 'story', url: props.storyLink + '/' };
  return (
    <article
      {...storyblokEditable(props.blok)}
      className={`ood-story-card
                ${
                  props.orientation === 'horizontal'
                    ? 'ood-story-card--horizontal'
                    : ''
                }
                ${
                  (props.blok.cardImage.filename?.startsWith('http') ||
                    props.blok.heroImage.filename?.startsWith('http')) &&
                  props.hideImage === false
                    ? 'ood-story-card--has-image'
                    : 'ood-story-card--no-image'
                }`}
    >
      <SuspenseWrapper>
        <SbLink
          link={theLink}
          classes={`ood-story-card__link su-bg-${
            props.backgroundColor
          } su-text-no-underline
            ${
              props.backgroundColor === 'white'
                ? 'su-border-color-black-10'
                : 'su-border-color-black-11'
            }`}
        >
          {(props.blok.cardImage.filename?.startsWith('http') ||
            props.blok.heroImage.filename?.startsWith('http')) &&
            props.hideImage === false && (
              <AspectRatioImage
                {...props}
                element={'div'}
                filename={
                  props.blok.cardImage.filename
                    ? props.blok.cardImage.filename
                    : props.blok.heroImage.filename
                }
                alt=""
                classPrefix={'ood-story-card'}
                imageSize={`${
                  props.orientation ? `${props.orientation}-card` : 'card'
                }`}
                aspectRatio={'3x2'}
                visibleHorizontal={props.visibleHorizontal}
                visibleVertical={props.visibleVertical}
              />
            )}
          <section
            className={`ood-story-card__contents su-mx-auto ood-has-tab-before su-px-2 su-pb-4`}
          >
            {(props.blok.shortTitle || props.blok.title) && (
              <Heading
                as={props.headingLevel || 'h3'}
                font="sans"
                color="black"
                weight="semibold"
                className="ood-story-card__headline"
              >
                {props.blok.shortTitle
                  ? props.blok.shortTitle
                  : props.blok.title}
              </Heading>
            )}
            {(props.blok.teaser || props.blok.intro) && (
              <p className="ood-story-card__body su-text-black su-regular">
                {props.blok.teaser ? props.blok.teaser : props.blok.intro}
              </p>
            )}
          </section>
        </SbLink>
      </SuspenseWrapper>
    </article>
  );
};
