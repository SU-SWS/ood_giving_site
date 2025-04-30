import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { useWindowSize } from 'usehooks-ts';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
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
        classes={'ood-interior-page__body-sidebar'}
      >
        {windowSize.width >= config.breakpoints.lg && (
          <>
            <a href="#body-content" className="su-skiplinks">
              Skip past section menu to page content
            </a>
            <CreateBloks blokSection={props.blok.contentMenu} />
          </>
        )}
        <CreateBloks blokSection={props.blok.contactInfo} />
      </FlexCell>
      <FlexCell
        lg={8}
        classes={'ood-interior-page__body-content'}
        id={'body-content'}
      >
        <CreateBloks blokSection={props.blok.pageContent} />
      </FlexCell>
    </>
  );
};
