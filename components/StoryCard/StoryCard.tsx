import { cnb } from 'cnbuilder';
import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import { SimpleCard } from '@/components/SimpleCard';
import {
  Heading,
  Paragraph,
  Text,
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
      mb="06em"
    >
      <SbLink link={link} classes={styles.link}>
        <Text
          as="span"
          font="sans"
          weight="semibold"
          color="black"
          icon={link?.linktype !== 'story' ? 'external' : undefined}
          iconProps={{ className: styles.icon, noBaseStyle: true }}
          className={styles.linkText}
        >
          {headline}
        </Text>
      </SbLink>
    </Heading>
    <Paragraph
      variant={isVertical ? 'ood-small' : undefined}
      size={!isVertical ? 1 : undefined}
      leading={isVertical ? 'snug' : 'cozy'}
      mb="none"
      className="max-w-prose-wide"
    >
      {teaser}
    </Paragraph>
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
  // Even the horizontal card is rendered as a vertical card from XS to MD, so make this logic clearer
  const isFeatured = !isVertical;

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="story"
      isVertical={isVertical}
      isFeatured={isFeatured}
      hasLink
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize={isVertical ? 'large-card' : 'horizontal-card'}
      aspectRatio="3x2"
      imageWrapperClassName={styles.imageWrapper(isFeatured)}
      className={cnb('story-card', styles.rootHasImage(isFeatured))}
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
    <SimpleCard
      {...props}
      hasLink
      bgColor={bgColor}
      className={cnb('story-card', styles.rootNoImage(isFeatured))}
    >
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
