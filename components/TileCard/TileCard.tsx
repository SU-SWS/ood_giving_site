import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import { SimpleCard } from '@/components/SimpleCard';
import {
  Heading,
  Text,
  type HeadingType,
} from '@/components/Typography';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import * as styles from './TileCard.styles';

type TileCardContentProps = {
  isDarkText?: boolean;
  hasImage?: boolean;
  superheadline?: string;
  headline?: string;
  link?: SbLinkType;
  headingLevel?: HeadingType;
}

const TileCardContent = ({
  isDarkText,
  superheadline,
  headline,
  link,
  headingLevel = 'h3',
}: TileCardContentProps) => (
  <>
    {superheadline && (
      <Text
        uppercase
        weight="semibold"
        tracking="wider"
        color={isDarkText ? 'black' : 'white'}
        className={styles.superhead}
      >
        {superheadline}
      </Text>
    )}
    <Heading
      as={headingLevel}
      mb="none"
      className={styles.heading}
    >
      <SbLink link={link} classes={styles.link}>
        <Text
          as="span"
          font="sans"
          weight="semibold"
          color={isDarkText ? 'black' : 'white'}
          icon={link?.linktype !== 'story' ? 'external' : undefined}
          iconProps={{ className: styles.icon(isDarkText), noBaseStyle: true }}
          className={styles.linkText(isDarkText)}
        >
          {headline}
        </Text>
      </SbLink>
    </Heading>
  </>
);

type TileCardProps = Omit<OverhangCardProps, 'variant'> & TileCardContentProps;

export const TileCard = ({
  superheadline,
  headline,
  link,
  filename,
  alt,
  focus,
  visibleHorizontal,
  visibleVertical,
  bgColor = 'fog-light',
  headingLevel = 'h3',
  className,
  ...props
}: TileCardProps) => {
  const hasImage = !!filename;
  const isDarkText = bgColor === 'white';
  /**
   * Color contrast of white text on palo verde background is 3.5:1 which is insufficient for small text (superheadline)
   * If palo verde is chosen as background color, use palo verde dark instead (4.91:1 contrast ratio)
   */
  const a11yBgColor = bgColor === 'palo-verde' ? 'palo-verde-dark' : bgColor;

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="tile"
      isVertical
      hasLink
      bgColor={a11yBgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize="card"
      aspectRatio="3x2"
      className={styles.rootHasImage}
    >
      <div className={styles.contentHasImage}>
        <TileCardContent
          isDarkText={isDarkText}
          superheadline={superheadline}
          headline={headline}
          link={link}
          headingLevel={headingLevel}
        />
      </div>
    </OverhangCard>
  ) : (
    <SimpleCard
      {...props}
      hasLink
      bgColor={bgColor}
      className={styles.rootNoImage}
    >
      <div className={styles.contentNoImage}>
        <TileCardContent
          isDarkText={isDarkText}
          superheadline={superheadline}
          headline={headline}
          link={link}
          headingLevel={headingLevel}
        />
      </div>
    </SimpleCard>
  );
};
