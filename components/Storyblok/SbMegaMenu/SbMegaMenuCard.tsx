import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { AspectRatioImage } from '@/components/Image';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { Heading, Paragraph } from '@/components/Typography';
import { type SbImageType, type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type DarkBgColorsType } from '@/utilities/datasource';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuCardProps = {
  blok: SbBlokData & {
    image?: SbImageType;
    backgroundColor?: DarkBgColorsType
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
        <div className="hidden lg:block overflow-hidden">
          <AspectRatioImage
            filename={image.filename}
            alt=""
            className="group-hocus-within:scale-105 transition-transform"
            imageSize="card"
            aspectRatio="3x2"
          />
        </div>
      )}
      <div className={styles.cardContent}>
        {headline && (
          <Heading as="h2" size={2} className={styles.cardHeading}>
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
            iconProps={{ className: 'group-hocus-within:translate-x-02em' }}
          >
            {ctaText}
          </Paragraph>
        )}
      </div>
    </article>
  );
};
