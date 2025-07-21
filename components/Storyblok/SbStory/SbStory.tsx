import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Container } from '@/components/Container';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
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

  const formattedDate = manualDate ? null : formatDate(publishedDate);
  const {
    dateTime: dateTimeString,
    year,
    monthLong,
    day,
    weekday,
  } = formattedDate || {};

  const showImage = !!filename && displayImage === 'show-image';
  const isLightHeaderBox = headerBoxColor === 'white' || headerBoxColor === 'fog-light';
  const hasCta = !!getNumBloks(cta);
  const hasDate = !!(manualDate || formattedDate);
  const hasAuthorOrDate = !!(author || hasDate);

  return (
    <PageLayout
      blok={blok}
      alertPicker={alertPicker}
      localHeader={localHeader}
      belowContent={belowContent}
      iconCards={iconCards}
      iconCardHeading={iconCardHeading}
      localFooter={localFooter}
      globalFooter={globalFooter}
      articleClassName={styles.article}
    >
      <header>
        {showImage ? (
          <FullWidthImage
            filename={filename}
            visibleVertical={visibleVertical}
            visibleHorizontal="center"
            alt={alt || ''}
            className={styles.image}
          />
        ) :
          <div className={styles.headerColorBlock(headerBackgroundColor)} aria-hidden="true" />
        }
        <Container className={styles.headerContent}>
          <Container pb={4} width="full" className={styles.introbox(showImage, headerBoxColor)}>
            <Heading
              as="h1"
              size="f4"
              font="sans"
              weight="semibold"
              color={isLightHeaderBox ? 'black' : 'white'}
              mb="04em"
              className={styles.title(tabColor)}
            >
              {title}
            </Heading>
            {intro && (
              <Paragraph variant="intro" color={isLightHeaderBox ? 'black' : 'white'} className={styles.intro}>
                {intro}
              </Paragraph>
            )}
          </Container>
        </Container>
      </header>
      <div className={styles.storyContent}>
        <CreateBloks blokSection={storyContent} />
      </div>
      <section>
        {(hasAuthorOrDate || hasCta) && (
          <Container>
            {hasCta && (
              <div className={styles.cta}>
                <CreateBloks blokSection={cta} />
              </div>
            )}
            {hasAuthorOrDate && (
              <Container width="full" pb={5} className={styles.metadata}>
                {author && (
                  <>
                    <Heading font="sans" tracking="widest" uppercase mb="06em" className={styles.metadataHeading}>
                      Author
                    </Heading>
                    <div className={styles.author}>
                      {author}
                    </div>
                  </>
                )}
                {hasDate && (
                  <>
                    <Heading font="sans" tracking="widest" uppercase mb="06em" className={styles.metadataHeading}>
                      Date
                    </Heading>
                    <Text as="time" dateTime={manualDate ? undefined : dateTimeString}>
                      {manualDate || `${weekday}, ${monthLong} ${day}, ${year}`}
                    </Text>
                  </>
                )}
              </Container>
            )}
          </Container>
        )}
      </section>
    </PageLayout>
  );
};
