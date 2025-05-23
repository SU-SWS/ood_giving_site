'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { useWindowSize } from 'usehooks-ts';
import { CreateBloks } from '@/components/CreateBloks';
import { RichText } from '@/components/RichText';
import { AspectRatioImage, type AspectRatioImageProps, type VisibleVerticalType } from '@/components/Image';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Typography';
import { config } from '@/utilities/config';

export type HeaderWithImageProps = {
  blok: SbBlokData & {
    contentMenu: SbBlokData[];
    title?: string;
    headerSpacingBottom?: string;
    headerBackgroundColor?: string;
    layout?: string;
    intro?: StoryblokRichtext;
    headerImage: AspectRatioImageProps;
    visibleVertical?: VisibleVerticalType;
  }
};

/* The Header with Image component is referenced by the Interior Page type. */
export const HeaderWithImage = (props: HeaderWithImageProps) => {
  const windowSize = useWindowSize();

  return (
    <header
      { ...storyblokEditable(props.blok) }
      className={`ood-interior-page__header ood-interior-page__header--has-image
            ${
              props.blok.headerSpacingBottom !== 'none'
                ? `su-mb-${props.blok.headerSpacingBottom}`
                : ''
            }`}
    >
      {windowSize.width < config.breakpoints.lg &&
        props.blok.layout !== 'no-sidebar' && (
          <div className="su-bg-palo-alto-dark">
            <CreateBloks blokSection={props.blok.contentMenu} />
          </div>
        )}
      <div className={`ood-interior-page__header-title-wrapper su-bg-white`}>
        <CenteredContainer flex={true} classes="su-pb-5">
          <div className={'header-and-intro flex-md-7-of-12 flex-lg-6-of-12'}>
            <Heading
              as="h1"
              color="black"
              className="ood-interior-page__title"
            >
              {props.blok.title}
            </Heading>
            <div className="ood-interior-page__header-intro-wrapper text-20 md:text-23 lg:text-25">
              {props.blok.intro && <RichText wysiwyg={props.blok.intro} />}
            </div>
          </div>
          <div
            className={`ood-interior-page__rectangle su-bg-${props.blok.headerBackgroundColor}`}
            aria-hidden="true"
          />
          <AspectRatioImage
            filename={props.blok.headerImage.filename}
            focus={props.blok.headerImage.focus}
            alt={props.blok.headerImage.alt}
            imageSize="header"
            visibleVertical={props.blok.visibleVertical}
            classPrefix="ood-interior-page__header"
            className="print:hidden flex-md-5-of-12 flex-lg-6-of-12 ml-auto mr-0"
          />
        </CenteredContainer>
      </div>
    </header>
  );
};
