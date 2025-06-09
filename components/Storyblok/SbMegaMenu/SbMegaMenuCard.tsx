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
  <article {...storyblokEditable(props.blok)} className="ood-mega-nav__card">
    <SbLink
      link={props.blok.link}
      classes="ood-mega-nav__card__link no-underline"
    >
      {props.blok.image.filename != null && (
        <AspectRatioImage
          {...props}
          filename={props.blok.image.filename}
          alt=""
          classPrefix="ood-mega-nav__card"
          imageSize="card"
          aspectRatio="3x2"
        />
      )}
      <div
        className={styles.MegaMenuCardContent({ backgroundColor: props.blok.backgroundColor })}
      >
        <Heading as="h3" className="ood-mega-nav__card-headline">
          {props.blok.headline}
        </Heading>
        <Paragraph
          className={styles.MegaMenuCardCta({ external: props.blok.link.linktype === 'url' })}
        >
          {props.blok.ctaText}
        </Paragraph>
      </div>
    </SbLink>
  </article>
);
