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
  // Below content props
  belowContent?: SbBlokData[];
  // Icon card props
  iconCards?: SbBlokData[];
  iconCardHeading?: string;
  // Footer props
  localFooter?: SbBlokData[];
  globalFooter?: SbBlokData[];
  // Optional wrapper props
  mainClassName?: string;
  articleClassName?: string;
}

export const PageLayout = ({
  blok,
  slug,
  children,
  alertPicker,
  localHeader,
  belowContent,
  iconCards,
  iconCardHeading,
  localFooter,
  globalFooter,
  mainClassName,
  articleClassName = 'bg-fog-light',
}: PageLayoutProps) => {
  return (
    <div {...storyblokEditable(blok)}>
      <Header
        alertPicker={alertPicker}
        localHeader={localHeader}
        slug={slug}
      />
      <main id="main-content" className={mainClassName}>
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
