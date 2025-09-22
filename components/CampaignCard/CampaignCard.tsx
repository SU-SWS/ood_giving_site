import { Text, Paragraph, type HeadingType } from '@/components/Typography';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { AspectRatioImage, type AspectRatioImageProps } from '@/components/Image';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './CampaignCard.styles';

type CampaignCardProps = AspectRatioImageProps & React.HTMLAttributes<HTMLDivElement> & {
  superheadline?: string;
  headline: string;
  description?: React.ReactNode;
  link?: SbLinkType;
  headingLevel?: HeadingType;
  headlineColor?: styles.HeadlineColorType;
}

export const CampaignCard = ({
  superheadline,
  headline,
  description,
  link,
  filename,
  alt,
  focus,
  visibleHorizontal,
  visibleVertical,
  headingLevel = 'h3',
  headlineColor = 'digital-red',
  ...props
}: CampaignCardProps) => {
  const hasImage = !!filename;
  const isExternalLink = link?.linktype !== 'story';

  return (
    <div className={styles.root} {...props}>
      {hasImage && (
        <AspectRatioImage
          filename={filename}
          alt={alt}
          focus={focus}
          visibleHorizontal={visibleHorizontal}
          visibleVertical={visibleVertical}
          className={styles.image}
        />
      )}
      {superheadline && (
        <Text
          uppercase
          weight="semibold"
          tracking="wider"
          leading="display"
          color="cool-grey"
          className={styles.superhead}
        >
          {superheadline}
        </Text>
      )}
      <Text
        as={description ? headingLevel : 'div'}
        size={3}
        font="sans"
        weight="semibold"
        mb="none"
      >
        <SbLink link={link} className={styles.link}>
          <Text
            as="span"
            font="sans"
            weight="semibold"
            tracking="tight"
            leading="tight"
            icon={isExternalLink ? 'external' : undefined}
            iconProps={{
              className: styles.icon,
              noBaseStyle: true,
              title: isExternalLink ? '(external link)' : undefined,
            }}
            className={styles.linkText(headlineColor)}
          >
            {headline}
          </Text>
        </SbLink>
      </Text>
      {description && (
        <Paragraph color="cool-grey" leading="snug" className={styles.description}>
          {description}
        </Paragraph>
      )}
    </div>
  );
};
