import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import {
  HeaderFullWidthImage, HeaderMinimal, HeaderNoImage, HeaderSmallImage, type HeaderProps,
} from '@/components/Storyblok/Header';
import { BodyLeftSidebar, type BodyLeftSidebarProps } from '@/components/Storyblok/partials/BodyLeftSidebar';
import { BodyNoSidebar, type BodyNoSidebarProps } from '@/components/Storyblok/partials/BodyNoSidebar';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Typography';
import { CreateBloks } from '@/components/CreateBloks';
import { getNumBloks } from '@/utilities/getNumBloks';

export type SbInteriorPageProps = HeaderProps
  & BodyNoSidebarProps
  & BodyLeftSidebarProps
  & IconCardSectionProps
  & FooterProps
  & {
    blok: SbBlokData & {
      localHeader: SbBlokData[];
      alertPicker: SbBlokData[];
      aboveContent: SbBlokData[];
      content: SbBlokData[];
      belowContent: SbBlokData[];
      bodyTitle: string;
    };
    slug?: string;
  };

export const SbInteriorPage = (props: SbInteriorPageProps) => {
  return (
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <CreateBloks blokSection={props.blok.localHeader} slug={props.slug} />
      <main id="main-content" className={`ood-interior-page ood-interior-page--${props.blok.headerStyle}`}>
        <article className="bg-fog-light">
          <header>
            {props.blok.headerStyle === 'has-image' && (
              <HeaderSmallImage {...props} />
            )}
            {props.blok.headerStyle === 'no-image' && (
              <HeaderNoImage {...props} />
            )}
            {props.blok.headerStyle === 'minimal' && <HeaderMinimal {...props} />}
            {props.blok.headerStyle === 'full-width-image' && (
              <HeaderFullWidthImage {...props} />
            )}
          </header>
          {!!getNumBloks(props.blok.aboveContent) && (
          <div className="ood-interior-page__above-body">
            <CreateBloks blokSection={props.blok.aboveContent} />
          </div>
            )}
          {(props.blok.bodyTitle || !!getNumBloks(props.blok.pageContent)) && (
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
          <CreateBloks blokSection={props.blok.belowContent} />
          <footer className="ood-interior-page__main-footer">
            <IconCardSection {...props} />
          </footer>
        </article>
      </main>
      <Footer {...props} />
    </div>
  );
};
