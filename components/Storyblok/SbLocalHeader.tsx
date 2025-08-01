import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexBox } from '@/components/FlexBox';
import { OpenSearchModalButton, SearchModal } from '@/components/Search/Modal';

type SbLocalHeaderProps = {
  blok: SbBlokData & {
    subMenu: SbBlokData[];
    lockup: SbBlokData[];
    megaMenu: SbBlokData[];
  };
  slug?: string;
};

const styles = {
  root: 'relative print:hidden z-[130] ood-header shadow-md bg-white md:border-t-[1rem] border-t-cardinal-red',
  wrapper: 'cc pt-15 md:pt-26 lg:pt-0 lg:flex-col',
  lockupWrapper: 'max-sm:mt-2 lg:pb-10 text-21 sm:text-25 md:text-[3.2rem]',
  menuSearchWrapper: 'gap-16 flex-row-reverse lg:flex-row lg:items-center lg:justify-center',
};

export const SbLocalHeader = ({ blok, slug }: SbLocalHeaderProps) => {
  const {
    subMenu,
    lockup,
    megaMenu,
  } = blok;

  return (
    <div {...storyblokEditable(blok)} className={styles.root}>
      <CreateBloks blokSection={subMenu} />
      <FlexBox justifyContent="between" className={styles.wrapper}>
        <div className={styles.lockupWrapper}>
          <CreateBloks blokSection={lockup} />
        </div>
        <FlexBox className={styles.menuSearchWrapper}>
          <CreateBloks blokSection={megaMenu} slug={slug} />
          <OpenSearchModalButton id="mastead-search-openmodal-mobile" />
        </FlexBox>
      </FlexBox>
      <SearchModal />
    </div>
  );
};
