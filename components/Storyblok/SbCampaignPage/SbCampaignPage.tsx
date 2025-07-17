import React from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CampaignHeader, type CampaignHeaderProps } from '@/components/Storyblok/SbCampaignPage/CampaignHeader';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';

export type SbCampaignPageProps = CampaignHeaderProps & IconCardSectionProps & FooterProps & {
  blok: SbBlokData & {
    content: SbBlokData[];
  };
};

export const SbCampaignPage = (props: SbCampaignPageProps) => (
  <div {...storyblokEditable(props.blok)}>
    <CampaignHeader {...props} />
    <main id="main-content" className="ood-campaign-page">
      <article className="bg-white">
        <section className="ood-campaign-page__main-body">
          <CreateBloks blokSection={props.blok.content} />
        </section>
        <footer className="ood-campaign-page__main-footer">
          <IconCardSection {...props} />
        </footer>
      </article>
    </main>
    <Footer {...props} />
  </div>
);
