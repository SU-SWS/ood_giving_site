'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { useWindowSize } from 'usehooks-ts';
import {
  HeaderFullWidthImage, HeaderMinimal, HeaderNoImage, HeaderSmallImage,
} from '@/components/Storyblok/PageHeader';
import { Grid } from '@/components/Grid';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';
import { Heading } from '@/components/Typography';
import { CreateBloks } from '@/components/CreateBloks';
import { getNumBloks } from '@/utilities/getNumBloks';
import { config } from '@/utilities/config';


export type SbInteriorPageProps =
  & IconCardSectionProps
  & FooterProps
  & {
    blok: SbBlokData & {
      localHeader: SbBlokData[];
      alertPicker: SbBlokData[];
      contentMenu: SbBlokData[];
      contactInfo: SbBlokData[];
      aboveContent: SbBlokData[];
      pageContent: SbBlokData[];
      belowContent: SbBlokData[];
      bodyTitle: string;
    };
    slug?: string;
  };

export const SbInteriorPage = (props: SbInteriorPageProps) => {
  const windowSize = useWindowSize();

  return (
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <CreateBloks blokSection={props.blok.localHeader} slug={props.slug} />
      <main id="main-content" className={`ood-interior-page ood-interior-page--${props.blok.headerStyle}`}>
        <article className="bg-fog-light">
          {/* Mobile content (section) menu */}
          {windowSize.width < config.breakpoints.lg &&
            <CreateBloks blokSection={props.blok.contentMenu} slug={props.slug} />
          }
          <header className="break-words">
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
            <Grid pt={6} pb={6} gap="default" lg={props.blok.layout === 'left-sidebar' ? 12 : 1} className="ood-interior-page__body-container cc">
              {props.blok.layout === 'left-sidebar' && (
                <aside className="lg:col-span-4 xl:col-span-3">
                  {windowSize.width >= config.breakpoints.lg &&
                    <CreateBloks blokSection={props.blok.contentMenu} />
                  }
                  <CreateBloks blokSection={props.blok.contactInfo} />
                </aside>
              )}
              <div className={props.blok.layout === 'left-sidebar' && 'lg:col-span-8 xl:col-start-5'}>
                <CreateBloks blokSection={props.blok.pageContent} />
              </div>
            </Grid>
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
