import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { HeaderMinimal, type HeaderMinimalProps } from '@/components/Storyblok/partials/HeaderMinimal';
import { HeaderNoImage, type HeaderNoImageProps } from '@/components/Storyblok/partials/HeaderNoImage';
import { HeaderWithImage, type HeaderWithImageProps } from '@/components/Storyblok/partials/HeaderWithImage';
import { BelowContent, type BelowContentProps } from '@/components/Storyblok/partials/BelowContent';
import { HeaderFullWidthImage, type HeaderFullWidthImageProps } from '@/components/Storyblok/partials/HeaderFullWidthImage';
import { BodyLeftSidebar, type BodyLeftSidebarProps } from '@/components/Storyblok/partials/BodyLeftSidebar';
import { BodyNoSidebar, type BodyNoSidebarProps } from '@/components/Storyblok/partials/BodyNoSidebar';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Typography';
import { CreateBloks } from '@/components/CreateBloks';

export type SbInteriorPageProps = HeaderMinimalProps
  & HeaderNoImageProps
  & HeaderWithImageProps
  & HeaderFullWidthImageProps
  & BodyNoSidebarProps
  & BodyLeftSidebarProps
  & BelowContentProps
  & IconCardSectionProps
  & FooterProps
  & {
    blok: SbBlokData & {
      localHeader: SbBlokData[];
      alertPicker: SbBlokData[];
      aboveContent: SbBlokData[];
      content: SbBlokData[];
      bodyTitle: string;
    }
  };

export const SbInteriorPage = (props: SbInteriorPageProps) => {
  return (
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <CreateBloks blokSection={props.blok.localHeader} />
      <main id="main-content" className={`ood-interior-page ood-interior-page--${props.blok.headerStyle}`}>
        <article className="bg-fog-light">
          {props.blok.headerStyle === 'has-image' && (
            <HeaderWithImage {...props} />
          )}
          {props.blok.headerStyle === 'no-image' && (
            <HeaderNoImage {...props} />
          )}
          {props.blok.headerStyle === 'minimal' && <HeaderMinimal {...props} />}
          {props.blok.headerStyle === 'full-width-image' && (
            <HeaderFullWidthImage {...props} />
          )}
          {props.blok.aboveContent != null &&
            Object.keys(props.blok.aboveContent).length > 0 && (
              <div className="ood-interior-page__above-body">
                <CreateBloks blokSection={props.blok.aboveContent} />
              </div>
            )}
          {(props.blok.bodyTitle ||
            (props.blok.pageContent != null && Object.keys(props.blok.pageContent).length > 0)) && (
              <section className="ood-interior-page__body">
                {props.blok.bodyTitle && (
                  <header className="centered-container ood-interior-page__body-header text-left">
                    <Heading className="ood-interior-page__body-header-title ood-has-tab-before">
                      {props.blok.bodyTitle}
                    </Heading>
                  </header>
                )}
                <CenteredContainer flex={true} classes={`ood-interior-page__body-container`}>
                  {props.blok.layout === 'no-sidebar' && (
                    <BodyNoSidebar {...props} />
                  )}
                  {props.blok.layout === 'left-sidebar' && (
                    <BodyLeftSidebar {...props} />
                  )}
                </CenteredContainer>
              </section>
            )
          }
          <BelowContent {...props} />
          <footer className="ood-interior-page__main-footer">
            <IconCardSection {...props} />
          </footer>
        </article>
      </main>
      <Footer {...props} />
    </div>
  );
};
