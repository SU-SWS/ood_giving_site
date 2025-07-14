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
  hasImage,
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
      size="f2"
      mb="06em"
    >
      <SbLink link={link} classes={styles.link}>
        <Text
          as="span"
          font="sans"
          weight="semibold"
          color={isDarkText ? 'black' : 'white'}
          icon={link?.linktype !== 'story' ? 'external' : undefined}
          iconProps={{ className: styles.icon, noBaseStyle: true }}
          className={styles.linkText}
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

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="tile"
      isVertical
      hasLink
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize="card"
      aspectRatio="3x2"
      className="tile-card"
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
      <TileCardContent
        isDarkText={isDarkText}
        superheadline={superheadline}
        headline={headline}
        link={link}
        headingLevel={headingLevel}
      />
    </SimpleCard>
  );
};
