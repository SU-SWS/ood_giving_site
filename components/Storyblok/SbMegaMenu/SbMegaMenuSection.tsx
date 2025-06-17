'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { CreateBloks } from '@/components/CreateBloks';
import { Grid } from '@/components/Grid';
import { HeroIcon } from '@/components/HeroIcon';
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

export const SbMegaMenuSection = ({ blok }: SbMegaMenuSectionProps) => {
  const {
    linkText,
    linkGroups,
    sectionCtaLink,
    card,
  } = blok;

  return (
    <Popover as="li" className={styles.sectionRoot}>
      {({ open }) => (
        <>
          <PopoverButton aria-label={`${open ? 'Close' : 'Open'} main menu`} className={styles.panelButton}>
            {linkText}
            <HeroIcon icon="chevron-down" strokeWidth={1.8} noBaseStyle className={styles.panelButtonIcon} />
          </PopoverButton>
          <Transition
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-y-95"
            enterTo="opacity-100 scale-y-100"
            leave="duration-200 ease-out"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-95"
          >
            <PopoverPanel className={styles.section}>
              <div className={styles.innerShadow} aria-hidden="true" />
              <Grid {...storyblokEditable(blok)} gap="default" lg={3} pt={4} pb={5} className={styles.sectionContent}>
                <div className={styles.sectionLinksWrapper}>
                  <Grid gap="default" md={3} className={styles.sectionLinkGroupGrid}>
                    <CreateBloks blokSection={linkGroups} />
                  </Grid>
                  <div className={styles.sectionCtaWrapper}>
                    <CreateBloks blokSection={sectionCtaLink} />
                  </div>
                </div>
                <div className={styles.sectionCardWrapper}>
                  <CreateBloks blokSection={card} />
                </div>
              </Grid>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
