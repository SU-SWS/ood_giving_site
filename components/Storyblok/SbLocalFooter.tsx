import { storyblokEditable } from '@storyblok/react';
import { type SbBlokData } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { Container } from '@/components/Container';
import { Grid } from '@/components/Grid';
import { FlexBox } from '@/components/FlexBox';
import { Heading } from '@/components/Typography';

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
  linkGroup: 'list-none m-0 p-0 [&_a]:leading-snug [&_a]:font-normal [&_a:hover]:text-black [&_a:focus]:text-black',
  linkGroupHeading: 'text-20',
};

export const SbLocalFooter = (props: SbLocalFooterProps) => (
  <Container {...storyblokEditable(props.blok)} bgColor="white" pt={4} pb={5}>
    <div className="rs-pb-3">
      <CreateBloks blokSection={props.blok.websiteLogo} />
    </div>
    <Grid as="section" md={2} xl={4} className="text-18 leading-snug gap-30 md:gap-60">
      <div>
        {props.blok.contactHeading && (
          <Heading tracking="normal" className={styles.linkGroupHeading}>
            {props.blok.contactHeading}
          </Heading>
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
          <div className="rs-mt-2">
            <CreateBloks blokSection={props.blok.cta} />
          </div>
        )}
      </div>
      <div>
        <nav aria-label="Local footer Office of Development links">
          {props.blok.headingGroupOod && (
            <Heading tracking="normal" className={styles.linkGroupHeading}>
              {props.blok.headingGroupOod}
            </Heading>
          )}
          <ul className={styles.linkGroup}>
            <CreateBloks blokSection={props.blok.linkGroupOod} />
          </ul>
        </nav>
      </div>
      <div>
        <nav aria-label="Local footer Make a Gift links">
          {props.blok.headingGroupGift && (
            <Heading tracking="normal" className={styles.linkGroupHeading}>
              {props.blok.headingGroupGift}
            </Heading>
          )}
          <ul className={styles.linkGroup}>
            <CreateBloks blokSection={props.blok.linkGroupGift} />
          </ul>
        </nav>
        <Heading tracking="normal" mt={2} className={styles.linkGroupHeading}>Tax ID</Heading>
        <span>{props.blok.taxId}</span>
      </div>
      <div>
        <nav aria-label="Local footer information links">
          {props.blok.headingGroupInfo && (
            <Heading tracking="normal" className={styles.linkGroupHeading}>
              {props.blok.headingGroupInfo}
            </Heading>
          )}
          <ul className={styles.linkGroup}>
            <CreateBloks blokSection={props.blok.linkGroupInfo} />
          </ul>
        </nav>
      </div>
    </Grid>
  </Container>
);
