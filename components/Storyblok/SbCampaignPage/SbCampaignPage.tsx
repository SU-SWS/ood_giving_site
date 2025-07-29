import { type SbBlokData } from '@storyblok/react/rsc';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { CampaignHero } from './CampaignHero';
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
    logoAlignment?: 'su-mr-auto' | 'su-ml-auto' | 'su-mr-auto';
    heroBgColor?: AllCardBgColorType;
    heroContentColor?: 'text-white' | 'text-black'; // Deprecated, use heroBgColor to determine text color
    heroContentPosition?: 'left' | 'right' | 'center'; // Box alignment
    heroContentAlignment?: 'su-text-align-left' | 'su-text-align-center' | 'su-text-align-right'; // Text alignment
    heroTitleType?: ModTypeSizeTypes;
    bar?: boolean;
    barBgColor?: AllCardBgColorType;
    barAlignment?: 'su-mr-auto' | 'su-ml-auto' | 'su-mr-auto';
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
    heroStyle = 'fullwidth-image',
    heroTitleFontSerif,
    heroIntroFontSerif,
    visibleHorizontal,
    logoAlignment = 'su-mr-auto',
    heroBgColor = 'cardinal-red',
    heroContentColor = 'white',
    heroContentAlignment = 'su-text-align-left',
    heroContentPosition = 'right',
    heroTitleType,
    bar,
    barBgColor = 'cardinal-red',
    barAlignment = 'su-mr-auto',
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
        heroStyle={heroStyle}
        heroTitleFontSerif={heroTitleFontSerif}
        heroIntroFontSerif={heroIntroFontSerif}
        visibleHorizontal={visibleHorizontal}
        logoAlignment={logoAlignment}
        heroBgColor={heroBgColor}
        heroContentColor={heroContentColor}
        heroContentAlignment={heroContentAlignment}
        heroContentPosition={heroContentPosition}
        heroTitleType={heroTitleType}
        bar={bar}
        barBgColor={barBgColor}
        barAlignment={barAlignment}
        heroCta={heroCta}
      />
      <CreateBloks blokSection={content} />
    </PageLayout>
  );
};
