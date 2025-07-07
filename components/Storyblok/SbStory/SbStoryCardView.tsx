import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { Heading, Paragraph, type HeadingType } from '@/components/Typography';
import { AspectRatioImage, type AspectRatioImageProps } from '@/components/Image';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { type SbImageType, type SbLinkType } from '../Storyblok.types';
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
  const hasCardImage = props.blok.cardImage?.filename?.startsWith('http');
  const hasHeroImage = props.blok.heroImage?.filename?.startsWith('http');
  const showImage = (hasCardImage || hasHeroImage) && !props.hideImage;

  const theLink: SbLinkType = { linktype: 'story', url: props.storyLink + '/' };
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
                  showImage
                    ? 'ood-story-card--has-image'
                    : 'ood-story-card--no-image'
                }`}
    >
      <SuspenseWrapper>
        <SbLink
          link={theLink}
          classes={`ood-story-card__link bg-${
            props.backgroundColor
          } no-underline
            ${
              props.backgroundColor === 'white'
                ? 'border-black-10'
                : 'border-black-11'
            }`}
        >
          {showImage && (
            <AspectRatioImage
              filename={hasCardImage ? props.blok.cardImage.filename : props.blok.heroImage.filename}
              focus={hasCardImage ? props.blok.cardImage.focus : props.blok.heroImage.focus}
              imageSize={props.orientation === 'horizontal' ? 'horizontal-card' : 'card'}
              visibleHorizontal={props.visibleHorizontal}
              visibleVertical={props.visibleVertical}
            />
          )}
          <section
            className="ood-story-card__contents mx-auto ood-has-tab-before rs-px-2 rs-pb-4"
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
              <Paragraph color="black" leading="snug" weight="normal" mb="none" className="ood-story-card__body">
                {props.blok.teaser ? props.blok.teaser : props.blok.intro}
              </Paragraph>
            )}
          </section>
        </SbLink>
      </SuspenseWrapper>
    </article>
  );
};
