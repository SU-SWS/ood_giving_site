import { type SbBlokData } from '@storyblok/react/rsc';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { CreateBloks } from '@/components/CreateBloks';

type SbLandingPageProps = {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    heroSection: SbBlokData[];
    sections: SbBlokData[];
    iconCardHeading?: string;
    iconCards?: SbBlokData[];
    localFooter?: SbBlokData[];
    globalFooter?: SbBlokData[];
  };
  slug?: string;
};

export const SbLandingPage = ({ blok, slug }: SbLandingPageProps) => {
  const {
    localHeader,
    alertPicker,
    heroSection,
    sections,
    iconCardHeading,
    iconCards,
    localFooter,
    globalFooter,
  } = blok;

  return (
    <PageLayout
      blok={blok}
      slug={slug}
      alertPicker={alertPicker}
      localHeader={localHeader}
      iconCards={iconCards}
      iconCardHeading={iconCardHeading}
      localFooter={localFooter}
      globalFooter={globalFooter}
      articleClassName="bg-fog-light"
    >
      <header>
        <CreateBloks blokSection={heroSection} />
      </header>
      <section>
        <CreateBloks blokSection={sections} />
      </section>
    </PageLayout>
  );
};
