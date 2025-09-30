import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CtaLink } from '@/components/Cta';
import { FlexBox } from '@/components/FlexBox';
import { SbLink } from '@/components/Storyblok/partials';
import { SbImageType, SbLinkType } from '../Storyblok.types';
import { getNumBloks } from '@/utilities/getNumBloks';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import * as styles from './SbCampaignPage.styles';

type SbCampaignHeaderProps = {
  blok: SbBlokData & {
    lockup?: SbBlokData[];
    headerColor?: 'su-text-white' | 'su-text-black';
    logoImage?: SbImageType;
    logoLink?: SbLinkType;
    homeLink?: SbLinkType;
    hideHomeLink?: boolean;
  };
};

export const SbCampaignHeader = ({ blok }: SbCampaignHeaderProps) => {
  const {
    lockup,
    headerColor = 'su-text-white',
    logoImage: { filename, alt } = {},
    logoLink,
    homeLink,
    hideHomeLink,
  } = blok;

  // Use all white text and links in the header if no color is chosen or if white is chosen
  const isWhiteHeader = headerColor !== 'su-text-black';
  const { width: logoWidth, height: logoHeight } = filename
    ? getSbImageSize(filename)
    : { width: 0, height: 0 };

  return (
    <FlexBox
      {...storyblokEditable(blok)}
      className={styles.headerRoot(isWhiteHeader)}
      justifyContent="between"
      alignItems="center"
      gap="default"
    >
      {!!getNumBloks(lockup) && !filename && (
        <div className={styles.lockupWrapper}>
          <CreateBloks blokSection={lockup} color={isWhiteHeader ? 'white' : 'default'} />
        </div>
      )}
      {filename && (
        <SbLink link={logoLink} className={styles.logoLink}>
          <img
            src={getProcessedImage(filename, `${logoWidth > 400 ? 400 : logoWidth}x0`)}
            alt={alt || 'Campaign logo'}
            width={logoWidth}
            height={logoHeight}
            className={styles.logoImage}
          />
        </SbLink>
      )}
      {!hideHomeLink && (
        <CtaLink
          sbLink={homeLink}
          variant={isWhiteHeader ? 'campaign-home-white' : 'campaign-home'}
          icon="home"
          iconProps={{ className: styles.homeIcon, noBaseStyle: true }}
          className={styles.homeLink}
        >
          Home
        </CtaLink>
      )}
    </FlexBox>
  );
};
