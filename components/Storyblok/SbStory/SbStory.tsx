import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Container } from '@/components/Container';
import { IconCardSection } from '@/components/Storyblok/partials/IconCardSection';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { Heading, Paragraph } from '@/components/Typography';
import { FlexCell } from '@/components/FlexCell';
import { FullWidthImage, type VisibleVerticalType } from '@/components/Image';
import {
  bgColors,
  type BgColorType,
  lightBeforeColors,
  type LightBeforeColorType,
} from '@/utilities/datasource';
import { type SbImageType } from '../Storyblok.types';

/**
 * This renders the Story page view
 */
export type SbStoryProps = {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    // Story header
    title?: string;
    intro?: string;
    heroImage: SbImageType;
    displayImage?: 'show-image' | 'hide-image';
    headerBoxColor?: BgColorType;
    tabColor?: LightBeforeColorType;
    headerBackgroundColor?: BgColorType;
    visibleVertical?: VisibleVerticalType;
    // Story content
    storyContent: SbBlokData[];
    cta: SbBlokData[];
    publishedDate?: string;
    manualDate?: string;
    author?: string;
    // Below content
    belowContent?: SbBlokData[];
    iconCardHeading?: string;
    iconCards?: SbBlokData[];
    // Footer
    localFooter?: SbBlokData[];
    globalFooter?: SbBlokData[];
  }
};

export const SbStory = ({ blok }: SbStoryProps) => {
  const {
    localHeader,
    alertPicker,
    heroImage: { filename, alt } = {},
    displayImage = 'hide-image',
    headerBoxColor = 'fog-light',
    tabColor = 'cardinal-red',
    headerBackgroundColor = 'bay-dark',
    visibleVertical,
    title,
    intro,
    storyContent,
    cta,
    author,
    publishedDate,
    manualDate,
    belowContent,
    iconCardHeading,
    iconCards,
    localFooter,
    globalFooter,
  } = blok;

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as const;
  let pubDate;

  if (publishedDate) {
    const publishedJsDateString = publishedDate.replace(' ', 'T');
    const publishedUTCDate = new Date(`${publishedJsDateString}:00Z`);

    pubDate = new Date(publishedUTCDate).toLocaleDateString(
      'en-US',
      dateOptions,
    );
  } else if (manualDate) {
    pubDate = manualDate;
  }

  return (
    <div {...storyblokEditable(blok)}>
      <CreateBloks blokSection={alertPicker} />
      <CreateBloks blokSection={localHeader} />
      <main id="main-content">
        <article className="ood-story bg-white">
          <header
            className={`ood-story__header
                    ${
                      filename?.startsWith('http') &&
                      displayImage === 'show-image'
                        ? 'ood-story__header--has-image bg-white'
                        : `ood-story__header--no-image bg-white border-${headerBackgroundColor}`
                    }
            `}
          >
            {filename?.startsWith('http') &&
              displayImage === 'show-image' && (
                <FullWidthImage
                  filename={filename}
                  classPrefix="ood-story"
                  visibleVertical={visibleVertical}
                  visibleHorizontal="center"
                  alt={alt ?? ''}
                  className="h-300 md:h-400 xl:h-500 2xl:h-[64rem]"
                />
              )}
            <Container className="flex ood-story__header-content">
              <FlexCell
                md={12}
                lg={10}
                xxl={9}
                className={`ood-story__header-content-wrapper
                     bg-${headerBoxColor}
                     ${
                       headerBoxColor !== 'white' &&
                       headerBoxColor !== 'fog-light'
                         ? 'text-white'
                         : ''
                     }
                     `}
              >
                <Heading
                  as="h1"
                  font="sans"
                  weight="semibold"
                  className={`ood-story__title ood-has-tab-before before:bg-${tabColor}`}
                >
                  {title}
                </Heading>
                {intro && (
                  <Paragraph variant="intro" className="ood-story__intro-text">
                    {intro}
                  </Paragraph>
                )}
              </FlexCell>
            </Container>
          </header>
          <div className="ood-story__content">
            <CreateBloks blokSection={storyContent} />
          </div>
          <footer className="ood-story__main-footer">
            {(author || publishedDate) && (
              <div className="ood-story__metadata">
                <Container className="flex">
                  <FlexCell lg={8} className="mx-auto">
                    <CreateBloks blokSection={cta} />
                    <div className="ood-story__metadata rs-pb-5">
                      {author && (
                        <>
                          <Paragraph weight="bold" uppercase className="ood-story__metadata-title">
                            Author
                          </Paragraph>
                          <span className="ood-story__metadata-data">
                            {author}
                          </span>
                        </>
                      )}
                      {publishedDate && (
                        <>
                          <Paragraph weight="bold" uppercase className="ood-story__metadata-title">
                            Date
                          </Paragraph>
                          <span className="ood-story__metadata-data mb-0">
                            {pubDate}
                          </span>
                        </>
                      )}
                    </div>
                  </FlexCell>
                </Container>
              </div>
            )}
            <CreateBloks blokSection={belowContent} />
            <IconCardSection iconCards={iconCards} iconCardHeading={iconCardHeading} />
          </footer>
        </article>
      </main>
      <Footer localFooter={localFooter} globalFooter={globalFooter} />
    </div>
  );
};
