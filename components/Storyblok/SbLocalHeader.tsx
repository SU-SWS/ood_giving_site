import { storyblokEditable } from '@storyblok/react';
import { type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '../CreateBloks';
import { CenteredContainer } from './partials/CenteredContainer';
import { Skiplink } from '../SkipLink';
import { OpenSearchModalButton } from '@/components/Search/Modal/OpenSearchModalButton';

export type SbLocalHeaderProps = {
  blok: SbBlokData & {
    topBarColor: 'cardinal-red' | 'digital-red' | 'dark';
    subMenu: SbBlokData[];
    lockup: SbBlokData[];
    megaMenu: SbBlokData[];
  };
};

export const SbLocalHeader = (props: SbLocalHeaderProps) => (
  <header
    {...storyblokEditable(props.blok)}
    className={`ood-header bg-white lg:border-t-[1rem] border-t-${props.blok.topBarColor}`}
  >
    <Skiplink href="#main-content" />
    <div className={`ood-header__submenu-container`}>
      <CreateBloks blokSection={props.blok.subMenu} />
    </div>
    <CenteredContainer classes={'ood-header__masthead'}>
      <CreateBloks blokSection={props.blok.lockup} />
      <div className={`ood-header__megamenu-wrapper`}>
        <CreateBloks blokSection={props.blok.megaMenu} />
        <OpenSearchModalButton id="mastead-search-openmodal-mobile" />
      </div>
    </CenteredContainer>
  </header>
);
