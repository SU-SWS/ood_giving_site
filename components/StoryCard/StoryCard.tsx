import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import { SimpleCard } from '@/components/SimpleCard';
import {
  Heading,
  Paragraph,
  type HeadingType,
} from '@/components/Typography';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import * as styles from './StoryCard.styles';

type StoryCardContentProps = {
  isVertical?: boolean;
  headline?: string;
  teaser?: string;
  link?: SbLinkType;
  hasImage?: boolean;
  headingLevel?: HeadingType;
}

const StoryCardContent = ({
  isVertical,
  headline,
  teaser,
  link,
  headingLevel = 'h3',
}: StoryCardContentProps) => (
  <>
    <Heading
      as={headingLevel}
      size={isVertical ? 3 : 'f3'}
      font="sans"
      weight="semibold"
      leading="tight"
      tracking="normal"
      color="black"
      mb="06em"
      className={styles.heading}
    >
      <SbLink link={link} classes={styles.link}>
        {headline}
      </SbLink>
    </Heading>
    <Paragraph variant="ood-small" mb="none">{teaser}</Paragraph>
  </>
);

type StoryCardProps = Omit<OverhangCardProps, 'variant'> & StoryCardContentProps;

export const StoryCard = ({
  headline,
  teaser,
  link,
  filename,
  alt,
  focus,
  visibleHorizontal,
  visibleVertical,
  isVertical,
  bgColor = 'fog-light',
  headingLevel = 'h3',
  className,
  ...props
}: StoryCardProps) => {
  const hasImage = !!filename;

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="story"
      isVertical={isVertical}
      isLink
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize={isVertical ? 'card' : 'horizontal-card'}
      aspectRatio="3x2"
    >
      <div>
        <StoryCardContent
          isVertical={isVertical}
          headline={headline}
          teaser={teaser}
          link={link}
          headingLevel={headingLevel}
        />
      </div>
    </OverhangCard>
  ) : (
    <SimpleCard {...props} isLink bgColor={bgColor} className={styles.rootNoImage(isVertical)}>
      <StoryCardContent
        isVertical={isVertical}
        headline={headline}
        teaser={teaser}
        link={link}
        headingLevel={headingLevel}
      />
    </SimpleCard>
  );
};
