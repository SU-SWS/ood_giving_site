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

export const SbStoryOverviewPage = ({ blok }: SbStoryOverviewPageProps) => {
  const {
    title,
    intro,
    headerBackgroundColor = 'bay-dark',
    localHeader,
    alertPicker,
    stories,
    belowContent,
    iconCardHeading,
    iconCards,
    localFooter,
    globalFooter,
  } = blok;

  return (
    <div {...storyblokEditable(blok)}>
      <CreateBloks blokSection={alertPicker} />
      <CreateBloks blokSection={localHeader} />
      <main id="main-content">
        <article className="bg-white">
          <HeaderNoImage
            title={title}
            intro={intro}
            headerBackgroundColor={headerBackgroundColor}
          />
          <CreateBloks blokSection={stories} />
          <CreateBloks blokSection={belowContent} />
          <footer>
            <IconCardSection iconCards={iconCards} iconCardHeading={iconCardHeading} />
          </footer>
        </article>
      </main>
      <Footer localFooter={localFooter} globalFooter={globalFooter} />
    </div>
  );
};
