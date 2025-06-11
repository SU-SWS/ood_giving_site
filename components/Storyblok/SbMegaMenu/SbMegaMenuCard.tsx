import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { AspectRatioImage } from '@/components/Image';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { Heading, Paragraph } from '@/components/Typography';
import { type SbImageType, type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type DarkBgColorsType } from '@/utilities/datasource';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuCardProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    image?: SbImageType;
    backgroundColor?: DarkBgColorsType
    headline?: string;
    ctaText?: string;
  };
};

export const SbMegaMenuCard = (props: SbMegaMenuCardProps) => (
  <article {...storyblokEditable(props.blok)} className={styles.cardRoot(props.blok.backgroundColor)}>
    {props.blok.image.filename != null && (
      <div className="overflow-hidden">
        <AspectRatioImage
          {...props}
          filename={props.blok.image.filename}
          alt=""
          classPrefix="ood-mega-nav__card"
          className="group-hover:scale-105 transition-transform"
          imageSize="card"
          aspectRatio="3x2"
        />
      </div>
    )}
    <Heading as="h3" size={2} className={styles.cardHeading}>
      <SbLink
        link={props.blok.link}
        classes="stretched-link no-underline text-white hocus:text-white hocus:underline"
      >
        {props.blok.headline}
      </SbLink>
    </Heading>
    <Paragraph
      color="white"
      weight="semibold"
      icon={props.blok.link?.linktype === 'url' ? 'external' : 'chevron-right'}
      className={styles.cardCta}
    >
      {props.blok.ctaText}
    </Paragraph>
  </article>
);
