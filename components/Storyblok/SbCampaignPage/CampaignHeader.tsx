import React, { useId } from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CampaignHero } from '@/components/Storyblok/SbCampaignPage/CampaignHero';

export type CampaignHeaderProps = {
  blok: SbBlokData & {
    alertPicker: SbBlokData[];
    oodCampaignHeader: SbBlokData[];
  }
};

export const CampaignHeader = (props: CampaignHeaderProps) => {
  const uniqueId = useId();
  const htmlId = `su-campaign-hero-${uniqueId}`;

  return (
    <header>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <a href={`#${htmlId}`}>
        Skip to main content
      </a>
      <div>
        <CreateBloks blokSection={props.blok.oodCampaignHeader} />
        <CampaignHero {...props} htmlId={htmlId} />
      </div>
    </header>
  );
};
