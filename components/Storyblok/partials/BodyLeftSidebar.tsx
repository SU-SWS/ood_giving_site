'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { useWindowSize } from 'usehooks-ts';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
import { Skiplink } from '@/components/SkipLink';
import { config } from '@/utilities/config';

export type BodyLeftSidebarProps = {
  blok: SbBlokData & {
    contentMenu: SbBlokData[];
    contactInfo: SbBlokData[];
    pageContent: SbBlokData[];
  }
};

/* The BodyLeftSidebar component is referenced by the Interior Page type.  */
export const BodyLeftSidebar = (props: BodyLeftSidebarProps) => {
  const windowSize = useWindowSize();

  return (
    <>
      <FlexCell
        {...storyblokEditable(props.blok)}
        element={'aside'}
        lg={4}
        xl={3}
        className="ood-interior-page__body-sidebar"
      >
        {windowSize.width >= config.breakpoints.lg && (
          <>
            <Skiplink href="#body-content">
              Skip past section menu to page content
            </Skiplink>
            <CreateBloks blokSection={props.blok.contentMenu} />
          </>
        )}
        <CreateBloks blokSection={props.blok.contactInfo} />
      </FlexCell>
      <FlexCell
        lg={8}
        className="ood-interior-page__body-content"
        id={'body-content'}
      >
        <CreateBloks blokSection={props.blok.pageContent} />
      </FlexCell>
    </>
  );
};
