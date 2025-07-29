import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import Link from 'next/link';
import { CreateBloks } from '@/components/CreateBloks';
import { CtaLink } from '@/components/Cta';
import { FlexBox } from '@/components/FlexBox';
import { SbLink } from '@/components/Storyblok/partials';
import { SbLockup } from '@/components/Storyblok/SbLockup';
import { HeroIcon } from '@/components/HeroIcon';
import { SbImageType, SbLinkType } from '../Storyblok.types';
import { getNumBloks } from '@/utilities/getNumBloks';
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

  const isWhiteHeader = headerColor !== 'su-text-black';

  return (
    <FlexBox
      {...storyblokEditable(blok)}
      className={styles.headerRoot}
      justifyContent="between"
      alignItems="center"
      gap="default"
    >
      {!!getNumBloks(lockup) && (
        <div className={styles.lockupWrapper}>
          <CreateBloks blokSection={lockup} color={isWhiteHeader ? 'white' : 'default'} />
        </div>
      )}
      {filename && (
        <SbLink link={logoLink} classes={styles.logoLink}>
          <img
            src={getProcessedImage(filename, '400x0')}
            alt={alt || 'Campaign logo'}
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
