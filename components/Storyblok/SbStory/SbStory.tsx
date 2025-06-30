import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Container } from '@/components/Container';
import { IconCardSection } from '@/components/Storyblok/partials/IconCardSection';
import { Footer } from '@/components/Storyblok/partials/Footer';
import { Heading, Paragraph, Text } from '@/components/Typography';
import { FullWidthImage, type VisibleVerticalType } from '@/components/Image';
import { type BgColorType, type LightBeforeColorType } from '@/utilities/datasource';
import { formatDate } from '@/utilities/formatDate';
import { getNumBloks } from '@/utilities/getNumBloks';
import { type SbImageType } from '../Storyblok.types';
import * as styles from './SbStory.styles';

/**
 * Renders the Story page view
 */
export type SbStoryProps = {
  blok: SbBlokData & {
    localHeader: SbBlokData[];
    alertPicker: SbBlokData[];
    // Story header
    title?: string;
    intro?: string;
    heroImage: SbImageType;
    displayImage?: styles.DisplayImageType;
    headerBoxColor?: BgColorType;
    tabColor?: LightBeforeColorType;
    headerBackgroundColor?: BgColorType;
    visibleVertical?: VisibleVerticalType;
    // Story content
    storyContent: SbBlokData[];
    cta: SbBlokData[];
    publishedDate?: string; // From the Storyblok date picker (no time)
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

  const formattedDate = formatDate(publishedDate);
  const {
    dateTime: dateTimeString, year, monthLong, day, weekday,
  } = formattedDate;

  const showImage = !!filename && displayImage === 'show-image';
  const isLightHeaderBox = headerBoxColor === 'white' || headerBoxColor == 'fog-light';
  const hasCta = !!getNumBloks(cta);

  return (
    <div {...storyblokEditable(blok)}>
      <CreateBloks blokSection={alertPicker} />
      <CreateBloks blokSection={localHeader} />
      <main id="main-content">
        <article className="bg-white">
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
            {showImage && (
              <FullWidthImage
                filename={filename}
                visibleVertical={visibleVertical}
                visibleHorizontal="center"
                alt={alt || ''}
                className="h-300 md:h-400 xl:h-500 2xl:h-[64rem]"
              />
            )}
            <Container>
              <Container pb={4} width="full" className={styles.introbox(headerBoxColor, showImage)}>
                <Heading
                  as="h1"
                  font="sans"
                  weight="semibold"
                  color={isLightHeaderBox ? 'black' : 'white'}
                  className={styles.title(tabColor)}
                >
                  {title}
                </Heading>
                {intro && (
                  <Paragraph variant="intro" color={isLightHeaderBox ? 'black' : 'white'}>
                    {intro}
                  </Paragraph>
                )}
              </Container>
            </Container>
          </header>
          <div className="first:*:rs-pt-4 last:*:rs-pb-5">
            <CreateBloks blokSection={storyContent} />
          </div>
          <footer className="ood-story__main-footer">
            {(author || manualDate || formattedDate || hasCta) && (
              <Container>
                <CreateBloks blokSection={cta} />
                {(author || manualDate || formattedDate) && (
                  <Container width="full" pb={5} className="lg:w-8/12 mx-auto">
                    {author && (
                      <>
                        <Heading font="sans" tracking="widest" uppercase mb="06em" className="text-16">
                          Author
                        </Heading>
                        <div className="mb-[1.6em] last:mb-0">
                          {author}
                        </div>
                      </>
                    )}
                    {(manualDate || formattedDate) && (
                      <>
                        <Heading font="sans" tracking="widest" uppercase mb="06em" className="text-16">
                          Date
                        </Heading>
                        <Text as="time" dateTime={dateTimeString}>
                          {manualDate ? manualDate : `${weekday}, ${monthLong} ${day}, ${year}`}
                        </Text>
                      </>
                    )}
                  </Container>
                )}
              </Container>
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
