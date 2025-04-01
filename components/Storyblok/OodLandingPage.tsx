import React from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react';
import { IconCardSection } from '@/components/Storyblok/partials/IconCardSection';
import { CreateBloks } from '@/components/CreateBloks';
import { Footer } from '@/components/Storyblok/partials/Footer';

type OodLandingPageProps = {
  blok: SbBlokData & {
    localFooter: SbBlokData[];
    globalFooter: SbBlokData[];
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    heroSection: SbBlokData[];
    iconCardHeading?: string;
    iconCards: SbBlokData[];
    sections: SbBlokData[];
  }
};

export const OodLandingPage = (props: OodLandingPageProps) => (
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
