'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { cnb } from 'cnbuilder';
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
          <PopoverButton aria-label={`${open ? 'Close' : 'Open'} main menu`} className={cnb('group ood-mega-nav__trigger inline-block cursor-pointer bg-transparent border-0 outline-none', styles.MegaMenuNavLevel1Cta)}>
            {props.blok.linkText}
            <HeroIcon icon="chevron-down" strokeWidth={1.8} className="!w-18 -mt-01em inline-block ood-mega-nav__trigger-icon ml-2 transition-transform group-aria-expanded:rotate-180 text-black group-hocus-visible:text-black" />
          </PopoverButton>
          <Transition
            enter="duration-300 ease-out"
            enterFrom={cnb('opacity-0', '-translate-y-30')}
            enterTo="opacity-100 translate-y-0"
            leave="duration-200 ease-out"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo={cnb('opacity-0', '-translate-y-30')}
          >
            <PopoverPanel className={`ood-mega-nav__section ${styles.section}`}>
              <Grid {...storyblokEditable(props.blok)} gap="default" lg={3} pt={4} pb={5} className={styles.sectionContent}>
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
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
