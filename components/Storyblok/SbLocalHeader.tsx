import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
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
  slug?: string;
};

export const SbLocalHeader = (props: SbLocalHeaderProps) => (
  <header
    {...storyblokEditable(props.blok)}
    className="relative z-[130] ood-header shadow-md bg-white md:border-t-[1rem] border-t-cardinal-red"
  >
    <Skiplink />
    <CreateBloks blokSection={props.blok.subMenu} />
    <FlexBox justifyContent="between" className="cc pt-15 md:pt-26 lg:pt-0 lg:flex-col">
      <div className="lg:pb-10 text-21 sm:text-25 md:text-[3.2rem]">
        <CreateBloks blokSection={props.blok.lockup} />
      </div>
      <FlexBox className="gap-16 flex-row-reverse lg:flex-row lg:items-center lg:justify-center">
        <CreateBloks blokSection={props.blok.megaMenu} slug={props.slug} />
        <OpenSearchModalButton id="mastead-search-openmodal-mobile" />
      </FlexBox>
    </FlexBox>
  </header>
);
