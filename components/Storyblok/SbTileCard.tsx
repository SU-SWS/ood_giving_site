import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { TileCard } from '@/components/TileCard';
import { type HeadingType } from '@/components/Typography';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { type SbImageType, type SbLinkType } from './Storyblok.types';
import { type CardBgColorType } from '@/utilities/datasource';

type SbTileCardProps = {
  blok: SbBlokData & {
    superheadline?: string;
    headline?: string;
    link?: SbLinkType;
    // Image
    image?: SbImageType;
    showImage?: boolean;
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
    // Options
    backgroundColor?: CardBgColorType;
    headingLevel?: HeadingType;
  };
}

export const SbTileCard = ({ blok }: SbTileCardProps) => {
  const {
    superheadline,
    headline,
    link,
    image: { filename, alt, focus } = {},
    showImage,
    visibleHorizontal = 'center',
    visibleVertical = 'center',
    backgroundColor,
    headingLevel,
  } = blok;

  return (
    <TileCard
      {...storyblokEditable(blok)}
      superheadline={superheadline}
      headline={headline}
      link={link}
      filename={showImage ? filename : ''}
      alt={showImage ? alt : ''}
      focus={showImage ? focus : ''}
      visibleHorizontal={showImage ? visibleHorizontal : undefined}
      visibleVertical={showImage ? visibleVertical : undefined}
      bgColor={backgroundColor || 'white'}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
