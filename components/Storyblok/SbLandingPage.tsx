import React from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { CreateBloks } from '@/components/CreateBloks';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';

type SbLandingPageProps = IconCardSectionProps & FooterProps & {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    heroSection: SbBlokData[];
    sections: SbBlokData[];
  }
};

export const SbLandingPage = (props: SbLandingPageProps) => (
  <div {...storyblokEditable(props.blok)}>
    <CreateBloks blokSection={props.blok.alertPicker} />
    <CreateBloks blokSection={props.blok.localHeader} />
    <main id="main-content">
      <article>
        <header>
          <CreateBloks blokSection={props.blok.heroSection} />
        </header>
        <section>
          <CreateBloks blokSection={props.blok.sections} />
        </section>
      </article>
      <footer>
        <IconCardSection {...props} />
      </footer>
    </main>
    <Footer {...props} />
  </div>
);
