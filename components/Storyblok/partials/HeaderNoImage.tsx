'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { RichText } from '@/components/RichText';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Storyblok/partials/Heading';
import { CreateBloks } from '@/components/CreateBloks';
import { config } from '@/utilities/config';
import { useWindowSize } from 'usehooks-ts';

export type HeaderNoImageProps = {
  blok: SbBlokData & {
    contentMenu: SbBlokData[];
    title?: string;
    headerSpacingBottom?: string;
    headerBackgroundColor?: string;
    layout?: string;
    intro?: StoryblokRichtext;
  }
};

/* The Header No Image component is referenced by the Interior Page and Support page types. */
export const HeaderNoImage = (props: HeaderNoImageProps) => {
  const windowSize = useWindowSize();

  return (
    <header
      {...storyblokEditable(props.blok)}
      className={`ood-interior-page__header ood-interior-page__header--no-image
            ${
              props.blok.headerSpacingBottom !== 'none'
                ? `su-mb-${props.blok.headerSpacingBottom}`
                : ''
            }`}
    >
      <div
        className={`ood-interior-page__header-title-wrapper su-bg-${props.blok.headerBackgroundColor}`}
      >
        <CenteredContainer flex={true}>
          {windowSize.width < config.breakpoints.lg &&
            props.blok.layout !== 'no-sidebar' && (
              <CreateBloks blokSection={props.blok.contentMenu} />
            )}
          <Heading
            level={'h1'}
            serif={true}
            color={'white'}
            classes={'ood-interior-page__title flex-xl-10-of-12'}
          >
            {props.blok.title}
          </Heading>
        </CenteredContainer>
      </div>
      <CenteredContainer
        flex={true}
        classes={'ood-interior-page__header-intro'}
      >
        <div
          className={`ood-interior-page__header-intro-wrapper flex-12-of-12 su-bg-white`}
        >
          {props.blok.intro && (
            <div className="intro-text ood-interior-page__intro flex-xl-10-of-12">
              <RichText wysiwyg={props.blok.intro} />
            </div>
          )}
        </div>
      </CenteredContainer>
    </header>
  );
};
