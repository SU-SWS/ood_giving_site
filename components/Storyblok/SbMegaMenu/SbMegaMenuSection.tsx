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

export const SbMegaMenuSection = (props: SbMegaMenuSectionProps) => {
  return (
    <Popover as="li" className="mb-0">
      {({ open }) => (
        <>
          <PopoverButton aria-label={`${open ? 'Close' : 'Open'} main menu`} className={styles.panelButton}>
            {props.blok.linkText}
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
              <Grid {...storyblokEditable(props.blok)} gap="default" lg={3} pt={4} pb={5} className={styles.sectionContent}>
                <div className="lg:col-span-2">
                  <Grid gap="default" lg={3} className="gap-y-40 lg:gap-y-0">
                    <CreateBloks blokSection={props.blok.linkGroups} />
                  </Grid>
                  <div className="rs-mt-4 empty:mt-0">
                    <CreateBloks blokSection={props.blok.sectionCtaLink} />
                  </div>
                </div>
                <div className="lg:col-span-1 mt-20 lg:mt-0">
                  <CreateBloks blokSection={props.blok.card} />
                </div>
              </Grid>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
