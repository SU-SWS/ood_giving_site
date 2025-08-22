import { StanfordLogo } from '@/components/Logo';
import { Container } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import * as styles from './GlobalFooter.styles';

type GlobalFooterProps = {
  color?: styles.FooterColorType;
};

// TODO: Fix custom bg colors
export const GlobalFooter = ({ color, ...rest }: GlobalFooterProps) => (
  <Container className={styles.root(color)} {...rest}>
    <FlexBox direction="col" className={styles.outerWrapper}>
      <div className={styles.logoWrapper}>
        <StanfordLogo isLink tabIndex={-1} aria-hidden className={styles.logo} type="stacked" color="white" />
      </div>
      <div className={styles.contentWrapper}>
        <FlexBox
          as="nav"
          justifyContent="center"
          aria-label="global footer menu"
          className={styles.menusWrapper}
        >
          <ul className={styles.stanfordMenu}>
            <li className={styles.listItem}>
              <a
                href="https://www.stanford.edu"
                rel="nofollow"
                className={styles.link}
              >
                Stanford Home
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="https://visit.stanford.edu/plan/"
                rel="nofollow"
                className={styles.link}
              >
                Maps &amp; Directions
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="https://www.stanford.edu/search/"
                rel="nofollow"
                className={styles.link}
              >
                Search Stanford
              </a>
            </li>
            <li>
              <a
                href="https://emergency.stanford.edu"
                rel="nofollow"
                className={styles.link}
              >
                Emergency Info
              </a>
            </li>
          </ul>
          <ul className={styles.legalMenu}>
            <li className={styles.listItem}>
              <a
                href="https://www.stanford.edu/site/terms/"
                rel="nofollow"
                title="Terms of use for sites"
                className={styles.link}
              >
                Terms of Use
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="https://www.stanford.edu/site/privacy/"
                rel="nofollow"
                title="Privacy and cookie policy"
                className={styles.link}
              >
                Privacy
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="https://uit.stanford.edu/security/copyright-infringement"
                rel="nofollow"
                title="Report alleged copyright infringement"
                className={styles.link}
              >
                Copyright
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4"
                rel="nofollow"
                title="Ownership and use of Stanford trademarks and images"
                className={styles.link}
              >
                Trademarks
              </a>
            </li>
            <li className={styles.listItem}>
              <a
                href="https://non-discrimination.stanford.edu/"
                rel="nofollow"
                title="Non-discrimination policy"
                className={styles.link}
              >
                Non-Discrimination
              </a>
            </li>
            <li>
              <a
                href="https://www.stanford.edu/site/accessibility"
                rel="nofollow"
                title="Report web accessibility issues"
                className={styles.link}
              >
                Accessibility
              </a>
            </li>
          </ul>
        </FlexBox>
        <div className={styles.copyright}>
          <span className={styles.copyrightText}>&copy; Stanford University.</span>
          <span className={styles.copyrightText}>&nbsp; Stanford, California 94305.</span>
        </div>
      </div>
    </FlexBox>
  </Container>
);
