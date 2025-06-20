import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react/rsc';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';
import { CreateBloks } from '@/components/CreateBloks';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';

type SbLandingPageProps = IconCardSectionProps & FooterProps & {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    heroSection: SbBlokData[];
    sections: SbBlokData[];
  };
  slug?: string;
};

export const SbLandingPage = (props: SbLandingPageProps) => (
  <div {...storyblokEditable(props.blok)} className="ood-landing-page bg-fog-light">
    <CreateBloks blokSection={props.blok.alertPicker} />
    <CreateBloks blokSection={props.blok.localHeader} slug={props.slug} />
    <main id="main-content" className="ood-landing-page__main">
      <article className="bg-fog-light">
        <header className="ood-landing-page__main-header">
          <CreateBloks blokSection={props.blok.heroSection} />
        </header>
        <section className="ood-landing-page__main-body">
          <CreateBloks blokSection={props.blok.sections} />
        </section>
      </article>
      <footer className="ood-landing-page__main-footer">
        <IconCardSection {...props} />
      </footer>
    </main>
    <Footer {...props} />
  </div>
);
