'use client';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { useWindowSize } from 'usehooks-ts';
import { RichText } from '@/components/RichText';
import { CreateBloks } from '@/components/CreateBloks';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Storyblok/partials/Heading';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { FullWidthImage, type FullWidthImageProps } from '@/components/Image';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
import { config } from '@/utilities/config';
import { type SbImageType } from '../Storyblok.types';

export type HeaderFullWidthImageProps = {
  blok: SbBlokData & {
    contentMenu: SbBlokData[];
    title?: string;
    headerSpacingBottom?: string;
    headerBackgroundColor?: string;
    layout?: string;
    headerLogo?: SbImageType;
    headerImage: FullWidthImageProps;
    intro?: StoryblokRichtext;
  }
};

/* The Header with Fullwidth Image component is referenced by the Interior Page type. */
export const HeaderFullWidthImage = (props: HeaderFullWidthImageProps) => {
  const windowSize = useWindowSize();

  const full_width_image = props.blok.headerImage.filename ? (
    <FullWidthImage
      {...props}
      filename={props.blok.headerImage.filename}
      classPrefix={'ood-interior-page'}
      visibleVertical={props.blok.visibleVertical}
      visibleHorizontal="center"
      alt={props.blok.headerImage.alt ?? ''}
      className="print:hidden"
    />
  ) : (
    <div className={'full-width-image-placeholder'} aria-hidden="true" />
  );

  return (
    <header
      {...storyblokEditable(props.blok)}
      className={`ood-interior-page__header ood-interior-page__header--full-width-image fullwidth
            ${
              props.blok.headerSpacingBottom !== 'none'
                ? `su-mb-${props.blok.headerSpacingBottom}`
                : ''
            }`}
    >
      {windowSize.width < config.breakpoints.lg &&
        props.blok.layout !== 'no-sidebar' && (
          <div className="ood-content-nav__wrapper">
            <CreateBloks blokSection={props.blok.contentMenu} />
          </div>
        )}
      <div className="ood-interior-page__image-logo-wrapper">
        {full_width_image}
        {props.blok.headerLogo.filename && (
          <img
            className={'header-logo'}
            src={getProcessedImage(props.blok.headerLogo.filename)}
            alt={props.blok.headerLogo.alt}
          />
        )}
      </div>
      <CenteredContainer
        flex={true}
        classes={'ood-interior-page__header-content'}
      >
        <FlexCell
          md={12}
          lg={10}
          className="ood-interior-page__header-content-wrapper"
        >
          <Heading
            level={'h1'}
            weight={'bold'}
            serif={true}
            classes={'ood-interior-page__title'}
          >
            {props.blok.title}
          </Heading>
          {props.blok.intro && (
            <div className="ood-interior-page__header-intro text-20 md:text-23 lg:text-25">
              <RichText wysiwyg={props.blok.intro} />
            </div>
          )}
        </FlexCell>
      </CenteredContainer>
    </header>
  );
};
