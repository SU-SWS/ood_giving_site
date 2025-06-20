import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Footer, type FooterProps } from '@/components/Storyblok/partials/Footer';
import { HeaderNoImage, type HeaderNoImageProps } from '@/components/Storyblok/partials/HeaderNoImage';
import { IconCardSection, type IconCardSectionProps } from '@/components/Storyblok/partials/IconCardSection';

type SbStoryOverviewPageProps = HeaderNoImageProps & IconCardSectionProps & FooterProps & {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    stories: SbBlokData[];
    belowContent: SbBlokData[];
  }
};

export const SbStoryOverviewPage = (props: SbStoryOverviewPageProps) => {
  return (
    <div {...storyblokEditable(props.blok)}>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <CreateBloks blokSection={props.blok.localHeader} />
      <main
        id="main-content"
        className="ood-interior-page ood-interior-page--no-image story-overview-page"
      >
        <article className="bg-white">
          <HeaderNoImage {...props} />
          <CreateBloks blokSection={props.blok.stories} />
          <CreateBloks blokSection={props.blok.belowContent} />
          <footer className="ood-interior-page__main-footer">
            <IconCardSection {...props} />
          </footer>
        </article>
      </main>
      <Footer {...props} />
    </div>
  );
};
