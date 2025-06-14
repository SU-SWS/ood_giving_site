import { storyblokEditable } from '@storyblok/react/rsc';
import { type SbBlokData } from '@storyblok/react/rsc';
import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexBox } from '@/components/FlexBox';
import { Skiplink } from '@/components/SkipLink';
import { OpenSearchModalButton } from '@/components/Search/Modal/OpenSearchModalButton';

export type SbLocalHeaderProps = {
  blok: SbBlokData & {
    subMenu: SbBlokData[];
    lockup: SbBlokData[];
    megaMenu: SbBlokData[];
  };
};

export const SbLocalHeader = (props: SbLocalHeaderProps) => (
  <header
    {...storyblokEditable(props.blok)}
    className="relative z-[130] ood-header shadow-md bg-white lg:border-t-[1rem] border-t-cardinal-red"
  >
    <Skiplink />
    <Container className={`ood-header__submenu-container bg-cardinal-red-dark lg:bg-white`}>
      <CreateBloks blokSection={props.blok.subMenu} />
    </Container>
    <Container className={'ood-header__masthead'}>
      <div className="lg:pb-20">
        <CreateBloks blokSection={props.blok.lockup} />
      </div>
      <FlexBox justifyContent="between" className={`ood-header__megamenu-wrapper`}>
        <CreateBloks blokSection={props.blok.megaMenu} />
        <OpenSearchModalButton id="mastead-search-openmodal-mobile" />
      </FlexBox>
    </Container>
  </header>
);
