import { storyblokEditable } from '@storyblok/react';
import { type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '../CreateBloks';
import { CenteredContainer } from './partials/CenteredContainer';

import CenteredContainer from '../partials/centeredContainer';
import HeaderSearchButton from '../Search/HeaderSearchButton';
import { Skiplink } from '../SkipLink';

export const SbLocalHeader = (props) => (
  <header
    {...storyblokEditable(props.blok)}
    className={`ood-header su-bg-white su-border-color-${props.blok.topBarColor}`}
  >
    <Skiplink href="#main-content" />
    <div className={`ood-header__submenu-container`}>
      <CreateBloks blokSection={props.blok.subMenu} />
    </div>
    <CenteredContainer classes={'ood-header__masthead'}>
      <CreateBloks blokSection={props.blok.lockup} />
      <div className={`ood-header__megamenu-wrapper`}>
        <CreateBloks blokSection={props.blok.megaMenu} />
        <HeaderSearchButton />
      </div>
    </CenteredContainer>
  </header>
);
