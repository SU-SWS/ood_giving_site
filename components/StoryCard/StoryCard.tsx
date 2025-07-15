'use client';
import { cnb } from 'cnbuilder';
import { useWindowSize } from 'usehooks-ts';
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
import { config } from '@/utilities/config';
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
  const isFeatured = !isVertical;
  const windowSize = useWindowSize();
  const useVerticalStyle = isVertical || windowSize?.width < config.breakpoints.lg;

  return hasImage ? (
    <OverhangCard
      {...props}
      variant="story"
      isVertical={useVerticalStyle}
      isFeatured={isFeatured}
      hasLink
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize={useVerticalStyle ? 'large-card' : 'horizontal-card'}
      aspectRatio="3x2"
      imageWrapperClassName={styles.imageWrapper(useVerticalStyle)}
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
