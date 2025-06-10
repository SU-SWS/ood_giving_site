'use client';
import React, { useState, useRef } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { cnb } from 'cnbuilder';
import { CreateBloks } from '@/components/CreateBloks';
import { Grid } from '@/components/Grid';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
import { HeroIcon } from '@/components/HeroIcon';
import { useOnClickOutside } from 'usehooks-ts';
import { useEscape } from '@/hooks/useEscape';
import * as styles from './SbMegaMenu.styles';

/**
 * Display name of this component is Mega Menu Panel in Storyblok.
 */
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
        className={cnb('group ood-mega-nav__trigger inline-block cursor-pointer bg-transparent border-0', styles.MegaMenuNavLevel1Cta)}
        aria-expanded={sectionOpened}
        onClick={toggleSection}
      >
        {props.blok.linkText}
        <HeroIcon
          icon="chevron-down"
          className="inline-block ood-mega-nav__trigger-icon ml-2 transition-transform group-aria-expanded:rotate-180"
        />
      </button>
      <div className={`ood-mega-nav__section ${styles.section}`} aria-hidden={!sectionOpened}>
        <Grid gap="default" lg={3} pt={4} pb={5} className={styles.sectionContent}>
          <div className="lg:col-span-2">
            <Grid gap="default" lg={3} className="ood-mega-nav__section-links">
              <CreateBloks blokSection={props.blok.linkGroups} />
            </Grid>
            <CreateBloks blokSection={props.blok.sectionCtaLink} />
          </div>
          <div className="lg:col-span-1">
            <CreateBloks blokSection={props.blok.card} />
          </div>
        </Grid>
      </div>
    </li>
  );
};
