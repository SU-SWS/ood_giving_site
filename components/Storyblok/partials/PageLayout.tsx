import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { Header } from './Header';
import { Footer } from './Footer';
import { IconCardSection } from './IconCardSection';
import { CreateBloks } from '@/components/CreateBloks';

export interface PageLayoutProps {
  blok: SbBlokData;
  slug?: string;
  children: React.ReactNode;
  // Header props
  alertPicker?: SbBlokData[];
  localHeader?: SbBlokData[];
  oodCampaignHeader?: SbBlokData[];
  // Below content props
  belowContent?: SbBlokData[];
  // Icon card props
  iconCards?: SbBlokData[];
  iconCardHeading?: string;
  // Footer props
  localFooter?: SbBlokData[];
  globalFooter?: SbBlokData[];
  // Optional wrapper props
  articleClassName?: string;
}

export const PageLayout = ({
  blok,
  slug,
  children,
  alertPicker,
  localHeader,
  oodCampaignHeader,
  belowContent,
  iconCards,
  iconCardHeading,
  localFooter,
  globalFooter,
  articleClassName = 'bg-fog-light',
}: PageLayoutProps) => {
  return (
    <div {...storyblokEditable(blok)}>
      <Header
        alertPicker={alertPicker}
        localHeader={localHeader}
        oodCampaignHeader={oodCampaignHeader}
        slug={slug}
      />
      <main id="main-content" tabIndex={-1}>
        <article className={articleClassName}>
          {children}
          <CreateBloks blokSection={belowContent} />
          <footer>
            <IconCardSection
              iconCards={iconCards}
              iconCardHeading={iconCardHeading}
            />
          </footer>
        </article>
      </main>
      <Footer
        localFooter={localFooter}
        globalFooter={globalFooter}
      />
    </div>
  );
};
