import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CampaignCard, type HeadlineColorType } from '@/components/CampaignCard';
import { type HeadingType } from '@/components/Typography';
import { type VisibleVerticalType, type VisibleHorizontalType } from '@/components/Image';
import { type SbImageType, type SbLinkType } from './Storyblok.types';

type SbCampaignCardProps = {
  blok: SbBlokData & {
    superheadline?: string;
    headline?: string;
    description?: string;
    link?: SbLinkType;
    // Image
    image?: SbImageType;
    showImage?: boolean;
    visibleHorizontal?: VisibleHorizontalType;
    visibleVertical?: VisibleVerticalType;
    // Options
    headlineColor?: HeadlineColorType;
    headingLevel?: HeadingType;
  };
};

export const SbCampaignCard = ({ blok }: SbCampaignCardProps) => {
  const {
    superheadline,
    headline,
    description,
    link,
    image: { filename, alt, focus } = {},
    showImage,
    visibleHorizontal,
    visibleVertical,
    headlineColor,
    headingLevel,
  } = blok;

  return (
    <CampaignCard
      {...storyblokEditable(blok)}
      superheadline={superheadline}
      headline={headline}
      description={description}
      link={link}
      filename={showImage ? filename : ''}
      alt={showImage ? alt : ''}
      focus={showImage ? focus : ''}
      visibleHorizontal={showImage ? visibleHorizontal : undefined}
      visibleVertical={showImage ? visibleVertical : undefined}
      headlineColor={headlineColor || 'digital-red'}
      headingLevel={headingLevel || 'h3'}
    />
  );
};
