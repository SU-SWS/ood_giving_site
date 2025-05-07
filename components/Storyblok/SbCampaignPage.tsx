import React from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { CampaignHeader, type CampaignHeaderProps } from '@/components/Storyblok/partials/CampaignHeader';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';

export type SbCampaignPageProps = CampaignHeaderProps & IconCardSectionProps & FooterProps & {
  blok: SbBlokData & {
    alertPicker: SbBlokData[];
    content: SbBlokData[];
  }
};

export const SbCampaignPage = (props: SbCampaignPageProps) => (
  <div {...storyblokEditable(props.blok)}>
    <CreateBloks blokSection={props.blok.alertPicker} />
    <CampaignHeader {...props} />
    <main id="main-content">
      <article>
        <section>
          <CreateBloks blokSection={props.blok.content} />
        </section>
        <footer>
          <IconCardSection {...props} />
        </footer>
      </article>
    </main>
    <Footer {...props} />
  </div>
);
