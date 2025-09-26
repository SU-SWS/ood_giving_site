import { cnb } from 'cnbuilder';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import localFont from 'next/font/local';
// @ts-expect-error: allow importing global CSS in this file for Next.js layout
import '@/styles/globals.css';
// @ts-expect-error: allow importing global CSS in this file for Next.js layout
import '@/styles/slick.css';
// @ts-expect-error: allow importing global CSS in this file for Next.js layout
import '@/styles/tables.css';
import { FlexBox } from '@/components/FlexBox';
import { GAProvider, GTAG } from '@/components/GAProvider';
import { getGlobalAlerts, getSearchConfigBlok } from '@/utilities/data';
import { SearchModalProvider } from '@/components/Search/Modal/SearchModalContext';
import { MotionProvider } from '@/components/MotionProvider';
import { GlobalAlertsProvider } from '@/components/Alert';

// https://docs.fontawesome.com/web/use-with/react/use-with#getting-font-awesome-css-to-work
import { config } from '@fortawesome/fontawesome-svg-core';
// @ts-expect-error: allow importing global CSS in this file for Next.js layout
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

type LayoutProps = {
  children: React.ReactNode,
};

const source_sans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
});

const source_serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
});

const stanford = localFont({
  src: '../public/fonts/stanford.woff2',
  weight: '300',
  variable: '--font-stanford',
});

const RootLayout = async ({ children }: LayoutProps) => {
  const searchConfig = await getSearchConfigBlok();
  const globalAlerts = await getGlobalAlerts();

  return (
    <GAProvider>
      <GlobalAlertsProvider globalAlerts={globalAlerts}>
        <SearchModalProvider searchConfig={searchConfig}>
          <MotionProvider>
            <html
              lang="en"
              className={cnb(
                source_sans.variable,
                source_serif.variable,
                stanford.variable,
              )}
            >
              <GTAG />
              {/* Absolutely necessary to have a body tag here, otherwise your components won't get any interactivity */}
              <body>
                <FlexBox justifyContent="between" direction="col" className="min-h-screen relative">
                  {children}
                </FlexBox>
              </body>
            </html>
          </MotionProvider>
        </SearchModalProvider>
      </GlobalAlertsProvider>
    </GAProvider>
  );
};

export default RootLayout;
