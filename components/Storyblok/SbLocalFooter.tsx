import { storyblokEditable } from '@storyblok/react/rsc';
import { type SbBlokData } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CtaLink } from '@/components/Cta';
import { Container } from '@/components/Container';
import { Grid } from '@/components/Grid';
import { FlexBox } from '@/components/FlexBox';
import { Heading } from '@/components/Typography';
import { type SbNavItemProps } from './Storyblok.types';

type SbLocalFooterProps = {
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
    linkGroupOod?: SbNavItemProps[];
    linkGroupGift?: SbNavItemProps[];
    linkGroupInfo?: SbNavItemProps[];
  }
};

type FooterLinkGroupProps = {
  heading?: string;
  links?: SbNavItemProps[];
  ariaLabel?: string;
};

const styles = {
  root: 'print:hidden w-full',
  logoWrapper: 'text-25 md:text-[3.2rem] rs-pb-3',
  grid: 'text-18 leading-snug gap-30 md:gap-60',
  address: 'gap-2',
  ctaWrapper: 'rs-mt-2',
  linkGroup: 'list-unstyled *:mb-10',
  linkGroupHeading: 'text-20 mb-08em',
};

// Extract subcomponent for the link groups
const FooterLinkGroup = ({
  heading,
  links,
  ariaLabel,
}: FooterLinkGroupProps) => (
  <nav aria-label={ariaLabel}>
    {heading && (
      <Heading tracking="normal" className={styles.linkGroupHeading}>
        {heading}
      </Heading>
    )}
    <ul className={styles.linkGroup}>
      {links?.map((navItem) => (
        <li key={navItem._uid}>
          <CtaLink sbLink={navItem.link} variant="local-footer" icon={navItem.linkClass}>
            {navItem.linkTextLabel}
          </CtaLink>
        </li>
      ))}
    </ul>
  </nav>
);

export const SbLocalFooter = (props: SbLocalFooterProps) => {
  const {
    contactHeading,
    addressLine1,
    addressLine2,
    addressLine3,
    phone,
    email,
    headingGroupOod,
    headingGroupGift,
    taxId,
    headingGroupInfo,
    websiteLogo,
    cta,
    linkGroupOod,
    linkGroupGift,
    linkGroupInfo,
  } = props.blok;

  return (
    <Container {...storyblokEditable(props.blok)} bgColor="white" pt={4} pb={5} className={styles.root}>
      <div className={styles.logoWrapper}>
        <CreateBloks blokSection={websiteLogo} />
      </div>
      <Grid as="section" md={2} xl={4} className={styles.grid}>
        <div>
          {contactHeading && (
            <Heading tracking="normal" className={styles.linkGroupHeading}>
              {contactHeading}
            </Heading>
          )}
          <FlexBox as="address" direction="col" className={styles.address}>
            {addressLine1 && (
              <span>{addressLine1}</span>
            )}
            {addressLine2 && (
              <span>{addressLine2}</span>
            )}
            {addressLine3 && (
              <span>{addressLine3}</span>
            )}
            {phone && <span>{phone}</span>}
            {email && (
              <a href={`mailto:${email}`}>{email}</a>
            )}
          </FlexBox>
          {cta && (
            <div className={styles.ctaWrapper}>
              <CreateBloks blokSection={cta} />
            </div>
          )}
        </div>
        <FooterLinkGroup
          heading={headingGroupOod}
          links={linkGroupOod}
          ariaLabel="Local footer Office of Development links"
        />
        <div>
          <FooterLinkGroup
            heading={headingGroupGift}
            links={linkGroupGift}
            ariaLabel="Local footer Make a Gift links"
          />
          <Heading tracking="normal" mt={2} className={styles.linkGroupHeading}>Tax ID</Heading>
          <span>{taxId}</span>
        </div>
        <FooterLinkGroup
          heading={headingGroupInfo}
          links={linkGroupInfo}
          ariaLabel="Local footer information links"
        />
      </Grid>
    </Container>
  );
};
