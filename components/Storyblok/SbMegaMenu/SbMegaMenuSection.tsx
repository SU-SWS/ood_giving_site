'use client';
import React, { useState, useRef } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
import { useOnClickOutside } from 'usehooks-ts';
import { useEscape } from '@/hooks/useEscape';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuSectionProps = {
  blok: SbBlokData & {
    linkGroups?: SbBlokData[];
    sectionCtaLink?: SbBlokData[];
    card?: SbBlokData[];
    linkText?: string;
  };
};

export const SbMegaMenuSection = (props: SbMegaMenuSectionProps) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const toggleSection = () => {
    setSectionOpened(!sectionOpened);
  };

  useEscape(() => {
    const openParent = document.querySelector<HTMLElement>('.ood-mega-nav__trigger[aria-expanded="true"]');
    const hamburger = document.querySelector<HTMLElement>('.ood-mega-nav__toggle');

    if (openParent && !hamburger) {
      setSectionOpened(false);
      openParent.focus();
    }
  });

  useOnClickOutside(ref, () => setSectionOpened(false));

  return (
    <li
      {...storyblokEditable(props.blok)}
      className="ood-mega-nav__item--parent"
      ref={ref}
    >
      <button
        type="button"
        className="ood-mega-nav__trigger inline-block cursor-pointer font-semibold leading-cozy bg-transparent border-0"
        aria-expanded={sectionOpened}
        onClick={toggleSection}
      >
        {props.blok.linkText}
      </button>
      <div className={`ood-mega-nav__section ${styles.MegaMenuSection}`} aria-hidden={!sectionOpened}>
        <CenteredContainer flex={true} classes="pt-4 pb-5">
          <FlexCell lg={8} className="flex flex-col">
            <div className="flex flex-row flex-wrap justify-between ood-mega-nav__section-links">
              <CreateBloks blokSection={props.blok.linkGroups} />
            </div>
            <CreateBloks blokSection={props.blok.sectionCtaLink} />
          </FlexCell>
          <FlexCell lg={4}>
            <CreateBloks blokSection={props.blok.card} />
          </FlexCell>
        </CenteredContainer>
      </div>
    </li>
  );
};
