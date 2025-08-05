import { useId } from 'react';
import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faSquareFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { CreateBloks } from '@/components/CreateBloks';
import { CtaLink } from '@/components/Cta';
import { Container } from '@/components/Container';
import { Grid } from '@/components/Grid';
import { FlexBox } from '@/components/FlexBox';
import { Heading, SrOnlyText } from '@/components/Typography';
import { type SbNavItemProps } from './Storyblok.types';
import { getNumBloks } from '@/utilities/getNumBloks';

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
  heading: string;
  links: SbNavItemProps[];
};

const styles = {
  root: 'print:hidden w-full',
  logoWrapper: 'text-25 md:text-[3.2rem] rs-pb-3',
  grid: 'text-18 leading-snug gap-30 md:gap-60',
  address: 'gap-2',
  ctaWrapper: 'rs-mt-2',
  linkGroup: 'list-unstyled *:mb-10',
  linkGroupHeading: 'text-20 mb-08em',
  socialList: 'list-unstyled gap-x-20 rs-mt-3 *:mb-0',
  socialInstagram: 'flex text-black hocus:text-instagram transition-colors',
  socialFacebook: 'flex text-black hocus:text-facebook transition-colors',
  socialLinkedin: 'flex text-black hocus:text-linkedin transition-colors',
};

// Extract subcomponent for the link groups
const FooterLinkGroup = ({
  heading,
  links,
}: FooterLinkGroupProps) => {
  const headingId = useId();

  return (
    <nav aria-labelledby={headingId}>
      <Heading id={headingId} tracking="normal" className={styles.linkGroupHeading}>
        {heading}
      </Heading>
      <ul className={styles.linkGroup}>
        {links.map((navItem) => (
          <li key={navItem._uid}>
            <CtaLink sbLink={navItem.link} variant="local-footer" icon={navItem.linkClass}>
              {navItem.linkTextLabel}
            </CtaLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const SbLocalFooter = ({ blok }: SbLocalFooterProps) => {
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
  } = blok;

  return (
    <Container {...storyblokEditable(blok)} bgColor="white" pt={4} pb={5} className={styles.root}>
      <div className={styles.logoWrapper}>
        <CreateBloks blokSection={websiteLogo} />
      </div>
      <Grid md={2} xl={4} className={styles.grid}>
        <section>
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
          <nav aria-label="Social Media">
            <FlexBox as="ul" className={styles.socialList}>
              <li>
                <a href="https://www.instagram.com/stanfordgiving/" className={styles.socialInstagram}>
                  <SrOnlyText>Stanford Giving Instagram</SrOnlyText>
                  <FontAwesomeIcon icon={faSquareInstagram} size="2x" widthAuto />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/stanford.university.giving/" className={styles.socialFacebook}>
                  <SrOnlyText>Stanford University Giving Facebook</SrOnlyText>
                  <FontAwesomeIcon icon={faSquareFacebook} size="2x" widthAuto />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/school/stanford-giving/" className={styles.socialLinkedin}>
                  <SrOnlyText>Stanford Giving LinkedIn</SrOnlyText>
                  <FontAwesomeIcon icon={faLinkedin} size="2x" widthAuto />
                </a>
              </li>
            </FlexBox>
          </nav>
        </section>
        {!!getNumBloks(linkGroupOod) && (
          <FooterLinkGroup
            heading={headingGroupOod}
            links={linkGroupOod}
          />
        )}
        <div>
          {!!getNumBloks(linkGroupGift) && (
            <FooterLinkGroup
              heading={headingGroupGift}
              links={linkGroupGift}
            />
          )}
          <Heading tracking="normal" mt={2} className={styles.linkGroupHeading}>Tax ID</Heading>
          <span>{taxId}</span>
        </div>
        {!!getNumBloks(linkGroupInfo) && (
          <FooterLinkGroup
            heading={headingGroupInfo}
            links={linkGroupInfo}
          />
        )}
      </Grid>
    </Container>
  );
};
