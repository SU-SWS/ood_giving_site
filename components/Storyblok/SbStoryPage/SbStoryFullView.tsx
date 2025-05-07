import React from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';
import { BelowContent, type BelowContentProps } from '@/components/Storyblok/partials/BelowContent';
import { Heading } from '@/components/Storyblok/partials/Heading';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
import { FullWidthImage } from '@/components/Storyblok/partials/FullWidthImage';
import { type SbImageType } from '../Storyblok.types';

export type SbStoryFullViewProps = IconCardSectionProps & FooterProps & BelowContentProps & {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    publishedDate?: string;
    manualDate?: string;
    heroImage: SbImageType;
    title?: string;
    intro?: string;
    storyContent: SbBlokData[];
    cta: SbBlokData[];
    author?: string;
  }
};

export const SbStoryFullView = (props: SbStoryFullViewProps) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  let publishedDate;

  if (props.blok.publishedDate) {
    const publishedJsDateString = props.blok.publishedDate.replace(' ', 'T');
    const publishedUTCDate = new Date(`${publishedJsDateString}:00Z`);

    publishedDate = new Date(publishedUTCDate).toLocaleDateString(
      'en-US',
      dateOptions,
    );
  } else if (props.blok.manualDate) {
    publishedDate = props.blok.manualDate;
  }

  return (
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <CreateBloks blokSection={props.blok.localHeader} />
      <main id="main-content">
        <article className={`ood-story su-bg-white`}>
          <header
            className={`ood-story__header
                    ${
                      props.blok.heroImage.filename?.startsWith('http') &&
                      props.blok.displayImage === 'show-image'
                        ? 'ood-story__header--has-image su-bg-white'
                        : `ood-story__header--no-image su-bg-white su-border-color-${props.blok.headerBackgroundColor}`
                    }
            `}
          >
            {props.blok.heroImage.filename?.startsWith('http') &&
              props.blok.displayImage === 'show-image' && (
                <FullWidthImage
                  {...props}
                  filename={props.blok.heroImage.filename}
                  classPrefix={'ood-story'}
                  visibleVertical={props.blok.visibleVertical}
                  visibleHorizontal={'center'}
                  alt={props.blok.heroImage.alt ?? ''}
                />
              )}
            <CenteredContainer
              flex={true}
              classes={'ood-story__header-content'}
            >
              <FlexCell
                md={12}
                lg={10}
                xxl={9}
                classes={`ood-story__header-content-wrapper
                     su-bg-${props.blok.headerBoxColor}
                     ${
                       props.blok.headerBoxColor !== 'white' &&
                       props.blok.headerBoxColor !== 'fog-light'
                         ? 'su-text-white'
                         : ''
                     }
                     `}
              >
                <Heading
                  level={'h1'}
                  weight={'semibold'}
                  classes={`ood-story__title ood-has-tab-before su-before-bg-${props.blok.tabColor}`}
                >
                  {props.blok.title}
                </Heading>
                {props.blok.intro && (
                  <p className="intro-text ood-story__intro-text">
                    {props.blok.intro}
                  </p>
                )}
              </FlexCell>
            </CenteredContainer>
          </header>
          <div className="ood-story__content">
            <CreateBloks blokSection={props.blok.storyContent} />
          </div>
          <footer className="ood-story__main-footer">
            {(props.blok.author || publishedDate) && (
              <div className="ood-story__metadata">
                <CenteredContainer flex={true}>
                  <FlexCell lg={8} classes="su-mx-auto">
                    <CreateBloks blokSection={props.blok.cta} />
                    <div className="ood-story__metadata su-pb-5">
                      {props.blok.author && (
                        <>
                          <p className="ood-story__metadata-title su-bold su-uppercase">
                            Author
                          </p>
                          <span className="ood-story__metadata-data">
                            {props.blok.author}
                          </span>
                        </>
                      )}
                      {publishedDate && (
                        <>
                          <p className="ood-story__metadata-title su-bold su-uppercase">
                            Date
                          </p>
                          <span className="ood-story__metadata-data su-mb-none">
                            {publishedDate}
                          </span>
                        </>
                      )}
                    </div>
                  </FlexCell>
                </CenteredContainer>
              </div>
            )}
            <BelowContent {...props} />
            <IconCardSection {...props} />
          </footer>
        </article>
      </main>
      <Footer {...props} />
    </div>
  );
};
