import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { CreateBloks } from '@/components/CreateBloks';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { HeaderNoImage } from '@/components/Storyblok/PageHeader/HeaderNoImage';
import { IconCardSection } from '@/components/Storyblok/partials/IconCardSection';
import { type DarkBgColorType } from '@/utilities/datasource';

type SbStoryOverviewPageProps = {
  blok: SbBlokData & {
    title?: string;
    intro?: StoryblokRichtext;
    headerBackgroundColor?: DarkBgColorType;
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    stories: SbBlokData[];
    // Below content
    belowContent?: SbBlokData[];
    iconCardHeading?: string;
    iconCards?: SbBlokData[];
    // Footer
    localFooter?: SbBlokData[];
    globalFooter?: SbBlokData[];
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
          <HeaderNoImage
            title={props.blok.title}
            intro={props.blok.intro}
            headerBackgroundColor={props.blok.headerBackgroundColor}
          />
          <CreateBloks blokSection={props.blok.stories} />
          <CreateBloks blokSection={props.blok.belowContent} />
          <footer className="ood-interior-page__main-footer">
            <IconCardSection iconCards={props.blok.iconCards} iconCardHeading={props.blok.iconCardHeading} />
          </footer>
        </article>
      </main>
      <Footer localFooter={props.blok.localFooter} globalFooter={props.blok.globalFooter} />
    </div>
  );
};
