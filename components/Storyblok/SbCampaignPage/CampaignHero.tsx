import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading, Paragraph } from '@/components/Typography';
import { FlexBox } from '@/components/FlexBox';
import { FullWidthImage, type VisibleHorizontalType } from '@/components/Image';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { modTypeSizes, type ModTypeSizeTypes, type AllCardBgColorType } from '@/utilities/datasource';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getNumBloks } from '@/utilities/getNumBloks';
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
  logoAlignment?: styles.LogoAlignmentType;
  heroBgColor?: AllCardBgColorType;
  heroContentPosition?: styles.HeroContentPositionType; // Position of the content box for the fullwidth image style
  heroContentAlignment?: styles.HeroContentAlignmentType; // Text alignment
  heroTitleType?: ModTypeSizeTypes;
  bar?: boolean;
  barBgColor?: AllCardBgColorType;
  heroCta?: SbBlokData[];
};

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */
export const CampaignHero = ({
  title,
  intro,
  image: { filename, alt } = {},
  logo: { filename: logoFilename, alt: logoAlt } = {},
  heroStyle = 'fullwidth-image',
  heroTitleFontSerif,
  heroIntroFontSerif,
  visibleHorizontal,
  logoAlignment = 'su-mr-auto',
  heroBgColor = 'cardinal-red',
  heroContentAlignment,
  heroContentPosition = 'right',
  heroTitleType,
  bar,
  barBgColor = 'cardinal-red',
  heroCta,
}: CampaignHeroProps) => {
  const isFullWidthImage = heroStyle !== 'left-image';
  const isDarkContent = heroBgColor === 'white' || heroBgColor === 'fog-light';

  const { width: originalWidth, height: originalHeight } = logoFilename
    ? getSbImageSize(logoFilename)
    : { width: 0, height: 0 };
  // If the logo is wider than 430px, resize it to 430px otherwise keep original dimensions
  const processedLogo = logoFilename ? getProcessedImage(logoFilename, originalWidth > 430 ? '430x0' : '') : '';

  const full_width_image =
    !!filename ? (
      <FullWidthImage
        filename={filename}
        visibleVertical="center"
        visibleHorizontal={visibleHorizontal}
        fetchPriority="high"
        alt={alt || ''}
        className={styles.heroImage(isFullWidthImage)}
      />
    ) : (
      <div className={styles.heroBgNoImage} aria-hidden="true" />
    );

  return (
    <div className={styles.heroRoot(isFullWidthImage)}>
      <div className={styles.heroImageWrapper(isFullWidthImage)}>{full_width_image}</div>
      <div className={styles.contentWrapper(isFullWidthImage, heroContentPosition, heroBgColor)}>
        <div className={styles.contentInnerWrapper(isFullWidthImage, heroBgColor)}>
          <FlexBox direction="col">
            {!!logoFilename && (
              <img
                src={processedLogo}
                alt={logoAlt || 'Campaign logo'}
                width={originalWidth}
                height={originalHeight}
                fetchPriority="high"
                className={styles.heroLogo(logoAlignment, isFullWidthImage)}
              />
            )}
            <Heading
              as="h1"
              color={isDarkContent ? 'black' : 'white'}
              size={modTypeSizes[heroTitleType]}
              weight={isFullWidthImage ? 'normal' : 'semibold'}
              font={heroTitleFontSerif || isFullWidthImage ? 'serif' : 'sans'}
              mt={3}
              mb="none"
              className={styles.heading(heroContentAlignment)}
            >
              {title}
            </Heading>
            {bar && (
              <div aria-hidden="true" className={styles.bar(barBgColor, heroContentAlignment)} />
            )}
            {intro && (
              <Paragraph
                mb="none"
                mt={2}
                color={isDarkContent ? 'black' : 'white'}
                font={heroIntroFontSerif ? 'serif' : 'sans'}
                className={styles.intro(heroContentAlignment)}
              >
                {intro}
              </Paragraph>
            )}
            {!!getNumBloks(heroCta) && (
              <div className={styles.ctaWrapper}><CreateBloks blokSection={heroCta} /></div>
            )}
          </FlexBox>
        </div>
      </div>
    </div>
  );
};
