import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { AspectRatioImage } from '@/components/Image';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { Heading, Paragraph } from '@/components/Typography';
import { type SbImageType, type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type DarkBgColorType } from '@/utilities/datasource';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuCardProps = {
  blok: SbBlokData & {
    image?: SbImageType;
    backgroundColor?: DarkBgColorType
    headline?: string;
    ctaText?: string;
    link?: SbLinkType;
  };
};

export const SbMegaMenuCard = ({ blok }: SbMegaMenuCardProps) => {
  const {
    image,
    backgroundColor,
    headline,
    ctaText,
    link,
  } = blok;

  return (
    <article {...storyblokEditable(blok)} className={styles.cardRoot(backgroundColor)}>
      {image.filename != null && (
        <div className={styles.cardImageWrapper}>
          <AspectRatioImage
            filename={image.filename}
            alt=""
            className={styles.cardImage}
            imageSize="card"
            aspectRatio="3x2"
          />
        </div>
      )}
      <div className={styles.cardContent}>
        {headline && (
          <Heading className={styles.cardHeading}>
            <SbLink link={link} classes={styles.headingLink}>
              {headline}
            </SbLink>
          </Heading>
        )}
        {ctaText && (
          <Paragraph
            color="white"
            weight="semibold"
            icon={link?.linktype === 'url' ? 'external' : 'chevron-right'}
            iconProps={{ className: styles.cardCtaTextIcon }}
          >
            {ctaText}
          </Paragraph>
        )}
      </div>
    </article>
  );
};
