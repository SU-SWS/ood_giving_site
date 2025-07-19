import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { HomepageHero } from '@/components/Hero';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { type DarkBgColorType, type LightPageBgColorType, type LightBeforeColorType } from '@/utilities/datasource';
import { type SbImageType, type SbLinkType } from './Storyblok.types';

type SbHomepageHeroProps = {
  blok: SbBlokData & {
    splashText?: string;
    ctaHeadline?: string;
    ctaText?: string;
    link?: SbLinkType;
    // Image
    image?: SbImageType;
    visibleVertical?: VisibleVerticalType;
    visibleHorizontal?: VisibleHorizontalType;
    // Options
    splashTextSize: 8 | 9;
    tabColor?: LightBeforeColorType;
    ctaBackgroundColor?: DarkBgColorType; // Background color of the card
    backgroundColor?: LightPageBgColorType; // Background color next to the overhang of the card so it matches the section below
  };
};

export const SbHomepageHero = ({ blok }: SbHomepageHeroProps) => {
  const {
    splashText,
    ctaHeadline,
    ctaText,
    link,
    image: { filename, alt } = {},
    visibleVertical = 'center',
    visibleHorizontal = 'center',
    splashTextSize = 9,
    tabColor = 'digital-red',
    ctaBackgroundColor = 'cardinal-red',
    backgroundColor = 'white',
  } = blok;

  const isDarkText = ctaBackgroundColor === 'fog-light';

  return (
    <HomepageHero
      {...storyblokEditable(blok)}
      splashText={splashText}
      ctaHeadline={ctaHeadline}
      ctaText={ctaText}
      link={link}
      filename={filename}
      alt={alt}
      visibleVertical={visibleVertical}
      visibleHorizontal={visibleHorizontal}
      splashTextSize={splashTextSize}
      tabColor={tabColor}
      bgColor={ctaBackgroundColor}
      sectionBgColor={backgroundColor}
      isDarkText={isDarkText}
    />
  );
};
