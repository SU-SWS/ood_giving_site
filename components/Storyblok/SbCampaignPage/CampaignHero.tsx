import { type SbBlokData } from '@storyblok/react/rsc';
import { SimpleCard } from '@/components/SimpleCard';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';
import { FlexBox } from '@/components/FlexBox';
import { FullWidthImage, type VisibleHorizontalType } from '@/components/Image';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { modTypeSizes, type ModTypeSizeTypes, type AllCardBgColorType } from '@/utilities/datasource';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './SbCampaignPage.styles';

type CampaignHeroProps = {
  title?: string;
  intro?: string;
  image?: SbImageType;
  logo?: SbImageType;
  // options
  heroStyle?: 'fullwidth-image' | 'left-image';
  heroTitleFontSerif?: boolean;
  heroIntroFontSerif?: boolean;
  visibleHorizontal?: VisibleHorizontalType;
  logoAlignment?: string;
  heroBgColor?: AllCardBgColorType;
  heroContentColor?: string; // Deprecated
  heroContentAlignment?: string;
  heroContentPosition?: string;
  heroTitleType?: ModTypeSizeTypes;
  bar?: boolean;
  barBgColor?: string;
  barAlignment?: string;
  heroCta?: SbBlokData[];
  // htmlId?: string;
};

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */
export const CampaignHero = ({
  title,
  intro,
  image,
  logo,
  heroStyle = 'fullwidth-image',
  heroTitleFontSerif,
  heroIntroFontSerif,
  visibleHorizontal,
  logoAlignment,
  heroBgColor = 'bay-dark',
  heroContentColor = 'white',
  heroContentAlignment = 'center',
  heroContentPosition = 'left',
  heroTitleType,
  bar,
  barBgColor = 'cardinal-red',
  barAlignment = 'center',
  heroCta,
  // tmlId,
}: CampaignHeroProps) => {
  const isFullWidthImage = heroStyle !== 'left-image';
  const isDarkContent = heroBgColor === 'white' || heroBgColor === 'fog-light';

  const campaignContentClasses = `campaign-page__hero-content
  campaign-page__hero-${heroContentPosition}
  su-bg-${heroBgColor}
  su-${heroContentColor}
  ${
    isFullWidthImage
      ? 'flex-container column-grid centered-container su-align-items-center'
      : ''
  }
  ${
    heroContentPosition === 'right' && isFullWidthImage
      ? 'su-flex-row-reverse'
      : ''
  }`;

  const full_width_image =
    image?.filename != null ? (
      <FullWidthImage
        filename={image?.filename}
        visibleVertical="center"
        visibleHorizontal={visibleHorizontal}
        alt={image?.alt || ''}
      />
    ) : (
      <div className={'full-width-image-placeholder'} aria-hidden="true" />
    );

  return (
    <div
      className={styles.heroRoot}
      // id={htmlId}
    >
      <div className="campaign-page__image-wrapper">{full_width_image}</div>
      <SimpleCard bgColor={heroBgColor} className={styles.contentWrapper}>
        {logo?.filename && (
          <img
            src={getProcessedImage(logo?.filename)}
            alt={logo?.alt}
          />
        )}
        <FlexBox direction="col">
          <Heading
            as="h1"
            color={isDarkContent ? 'black' : 'white'}
            size={modTypeSizes[heroTitleType] || 'f4'}
            weight={isFullWidthImage ? 'normal' : 'semibold'}
            font={heroStyle === 'fullwidth-image' && heroTitleFontSerif ? 'serif' : 'sans'}
            className="campaign-page__title"
          >
            {title}
          </Heading>
          {bar && (
            <div
              aria-hidden="true"
              className={`campaign-page__hero-bar su-bg-${barBgColor} ${barAlignment}`}
            />
          )}
          {intro && (
            <p>
              {intro}
            </p>
          )}
          {heroCta && <CreateBloks blokSection={heroCta} />}
        </FlexBox>
      </SimpleCard>
    </div>
  );
};
