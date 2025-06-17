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
    className="relative z-[130] ood-header shadow-md bg-white md:border-t-[1rem] border-t-cardinal-red"
  >
    <Skiplink />
    <CreateBloks blokSection={props.blok.subMenu} />
    <Container className="pt-15 md:pt-0">
      <div className="lg:pb-10 text-21 sm:text-25 md:text-[3.2rem]">
        <CreateBloks blokSection={props.blok.lockup} />
      </div>
      <FlexBox justifyContent="between" className={`ood-header__megamenu-wrapper`}>
        <CreateBloks blokSection={props.blok.megaMenu} />
        <OpenSearchModalButton id="mastead-search-openmodal-mobile" />
      </FlexBox>
    </Container>
  </header>
);
