import React, { useId } from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CampaignHero } from '@/components/Storyblok/SbCampaignPage/CampaignHero';
import { Skiplink } from '@/components/SkipLink';
import { GlobalAlerts } from '@/components/Alert/GlobalAlerts';

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
      <Skiplink href={`#${htmlId}`} />
      <GlobalAlerts />
      <CreateBloks blokSection={props.blok.alertPicker} />
      <div>
        <CreateBloks blokSection={props.blok.oodCampaignHeader} />
        <CampaignHero {...props} htmlId={htmlId} />
      </div>
    </header>
  );
};
