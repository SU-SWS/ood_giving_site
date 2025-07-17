import { cnb } from 'cnbuilder';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { FlexBox } from '@/components/FlexBox';
import { GAProvider, GTAG } from '@/components/GAProvider';
import { SearchModalProvider } from '@/components/Search/Modal/SearchModalContext';
import { LazyMotionProvider } from './LazyMotionProvider';
// https://docs.fontawesome.com/web/use-with/react/use-with#getting-font-awesome-css-to-work
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getSearchConfigBlokCached } from '@/utilities/data/getSearchConfigBlok';
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
  const searchConfig = await getSearchConfigBlokCached();

  return (
    <GAProvider>
      <SearchModalProvider searchConfig={searchConfig}>
        <LazyMotionProvider>
          <html
            lang="en"
            className={cnb(
              source_sans.variable,
              source_serif.variable,
              stanford.variable,
            )}
          >
            {/* Absolutely necessary to have a body tag here, otherwise your components won't get any interactivity */}
            <body>
              <GTAG />
              <FlexBox justifyContent="between" direction="col" className="min-h-screen relative">
                {children}
              </FlexBox>
            </body>
          </html>
        </LazyMotionProvider>
      </SearchModalProvider>
    </GAProvider>
  );
};

export default RootLayout;
