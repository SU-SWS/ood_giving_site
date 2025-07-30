import { type SbBlokData } from '@storyblok/react/rsc';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { CampaignHero } from './CampaignHero';
import { type HeroTextAlignmentType, type LogoAlignmentType } from './SbCampaignPage.styles';
import { CreateBloks } from '@/components/CreateBloks';
import { type VisibleHorizontalType } from '@/components/Image';
import {type ModTypeSizeTypes, type AllCardBgColorType } from '@/utilities/datasource';
import { type SbImageType } from '../Storyblok.types';

export type SbCampaignPageProps = {
  blok: SbBlokData & {
    // Header
    alertPicker: SbBlokData[];
    oodCampaignHeader: SbBlokData[];
    // Hero
    title?: string;
    intro?: string;
    image?: SbImageType;
    logo?: SbImageType;
    // Hero options
    heroStyle?: 'fullwidth-image' | 'left-image';
    heroTitleFontSerif?: boolean;
    heroIntroFontSerif?: boolean;
    visibleHorizontal?: VisibleHorizontalType;
    logoAlignment?: LogoAlignmentType;
    heroBgColor?: AllCardBgColorType;
    // heroContentColor?: 'text-white' | 'text-black'; // Deprecated, use heroBgColor to determine text color
    heroContentPosition?: 'left' | 'right' | 'center'; // Box alignment
    heroContentAlignment?: HeroTextAlignmentType; // Text alignment
    heroTitleType?: ModTypeSizeTypes;
    bar?: boolean;
    barBgColor?: AllCardBgColorType;
    // barAlignment?: 'su-mr-auto' | 'su-ml-auto' | 'su-mx-auto'; // Deprecated, use heroContentAlignment
    heroCta?: SbBlokData[];
    // Main content
    content: SbBlokData[];
    // Below content
    iconCardHeading?: string;
    iconCards?: SbBlokData[];
    // Footer
    localFooter?: SbBlokData[];
    globalFooter?: SbBlokData[];
  };
};

export const SbCampaignPage = ({ blok }: SbCampaignPageProps) => {
  const {
    alertPicker,
    oodCampaignHeader,
    title,
    intro,
    image,
    logo,
    heroStyle,
    heroTitleFontSerif,
    heroIntroFontSerif,
    visibleHorizontal,
    logoAlignment,
    heroBgColor,
    // heroContentColor,
    heroContentAlignment = 'su-text-align-left',
    heroContentPosition,
    heroTitleType,
    bar,
    barBgColor,
    //barAlignment = 'su-mr-auto',
    heroCta,
    content,
    iconCardHeading,
    iconCards,
    localFooter,
    globalFooter,
  } = blok;

  return (
    <PageLayout
      blok={blok}
      alertPicker={alertPicker}
      oodCampaignHeader={oodCampaignHeader}
      iconCards={iconCards}
      iconCardHeading={iconCardHeading}
      localFooter={localFooter}
      globalFooter={globalFooter}
    >
      <CampaignHero
        title={title}
        intro={intro}
        image={image}
        logo={logo}
        heroStyle={heroStyle || 'fullwidth-image'}
        heroTitleFontSerif={heroTitleFontSerif}
        heroIntroFontSerif={heroIntroFontSerif}
        visibleHorizontal={visibleHorizontal}
        logoAlignment={logoAlignment || 'su-mr-auto'}
        heroBgColor={heroBgColor || 'cardinal-red'}
        // heroContentColor={heroContentColor}
        heroContentAlignment={heroContentAlignment}
        heroContentPosition={heroContentPosition || 'right'}
        heroTitleType={heroTitleType}
        bar={bar}
        barBgColor={barBgColor || 'white'}
        // barAlignment={barAlignment}
        heroCta={heroCta}
      />
      <CreateBloks blokSection={content} />
    </PageLayout>
  );
};
