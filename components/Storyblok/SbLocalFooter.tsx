import React from 'react';
import { dcnb } from 'cnbuilder';
import { storyblokEditable } from '@storyblok/react';
import { type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Grid } from '@/components/Grid';
import { FlexBox } from '../FlexBox';

export type SbLocalFooterProps = {
  blok: SbBlokData & {
    contactHeading?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    phone?: string;
    email?: string;
    headingGroupOod?: string;
    headingGroupGift?: string;
    taxId?: string;
    headingGroupInfo?: string;
    websiteLogo?: SbBlokData[];
    cta?: SbBlokData[];
    linkGroupOod?: SbBlokData[];
    linkGroupGift?: SbBlokData[];
    linkGroupInfo?: SbBlokData[];
  }
};

const styles = {
  linkGroup: dcnb('list-none m-0 p-0 [&_a]:leading-snug [&_a]:font-normal [&_a]:text-digital-red [&_a:hover]:text-black [&_a:focus]:text-black'),
  linkGroupHeading: dcnb('text-20 font-serif'),
}; 

export const SbLocalFooter = (props: SbLocalFooterProps) => (
  <div {...storyblokEditable(props.blok)} className="pb-38 pt-34 md:pb-72 md:pt-58 bg-white">
    <CenteredContainer>
      <div className="pb-32 md:pb-45">
        <CreateBloks blokSection={props.blok.websiteLogo} />
      </div>
      <Grid as="section" md={2} xl={4} className="text-18 leading-snug gap-60">
        <div>
          {props.blok.contactHeading && (
            <h2 className="text-20 font-serif">
              {props.blok.contactHeading}
            </h2>
          )}
          <FlexBox as="address" direction="col" className="gap-2">
            {props.blok.addressLine1 && (
              <span>{props.blok.addressLine1}</span>
            )}
            {props.blok.addressLine2 && (
              <span>{props.blok.addressLine2}</span>
            )}
            {props.blok.addressLine3 && (
              <span>{props.blok.addressLine3}</span>
            )}
            {props.blok.phone && <span>{props.blok.phone}</span>}
            {props.blok.email && (
              <a href={`mailto:${props.blok.email}`}>{props.blok.email}</a>
            )}
          </FlexBox>
          {props.blok.cta && (
            <div className="mt-36">
              <CreateBloks blokSection={props.blok.cta} />
            </div>
          )}
        </div>
        <div>
          <nav aria-label="Local footer Office of Development links">
            {props.blok.headingGroupOod && (
              <h2 className={styles.linkGroupHeading}>
                {props.blok.headingGroupOod}
              </h2>
            )}
            <ul className={styles.linkGroup}>
              <CreateBloks blokSection={props.blok.linkGroupOod} />
            </ul>
          </nav>
        </div>
        <div>
          <nav aria-label="Local footer Make a Gift links">
            {props.blok.headingGroupGift && (
              <h2 className={styles.linkGroupHeading}>
                {props.blok.headingGroupGift}
              </h2>
            )}
            <ul className={styles.linkGroup}>
              <CreateBloks blokSection={props.blok.linkGroupGift} />
            </ul>
          </nav>
          <h2 className={dcnb(styles.linkGroupHeading, 'mt-3 md:mt-36')}>Tax ID</h2>
          <p>{props.blok.taxId}</p>
        </div>
        <div>
          <nav aria-label="Local footer information links">
            {props.blok.headingGroupInfo && (
              <h2 className={styles.linkGroupHeading}>
                {props.blok.headingGroupInfo}
              </h2>
            )}
            <ul className={styles.linkGroup}>
              <CreateBloks blokSection={props.blok.linkGroupInfo} />
            </ul>
          </nav>
        </div>
      </Grid>
    </CenteredContainer>
  </div>
);
