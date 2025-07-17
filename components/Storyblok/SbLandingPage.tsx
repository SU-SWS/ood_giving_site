import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react/rsc';
import { IconCardSection } from '@/components/Storyblok/partials/IconCardSection';
import { CreateBloks } from '@/components/CreateBloks';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { Header } from '@/components/Storyblok/partials/Header';

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
    <div {...storyblokEditable(blok)} className="ood-landing-page bg-fog-light">
      <Header alertPicker={alertPicker} localHeader={localHeader} slug={slug} />
      <main id="main-content" className="ood-landing-page__main">
        <article className="bg-fog-light">
          <header className="ood-landing-page__main-header">
            <CreateBloks blokSection={heroSection} />
          </header>
          <section className="ood-landing-page__main-body">
            <CreateBloks blokSection={sections} />
          </section>
        </article>
        <footer className="ood-landing-page__main-footer">
          <IconCardSection iconCards={iconCards} iconCardHeading={iconCardHeading} />
        </footer>
      </main>
      <Footer localFooter={localFooter} globalFooter={globalFooter} />
    </div>
  );
};
