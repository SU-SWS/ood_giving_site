import { cnb } from 'cnbuilder';
import { Source_Sans_3 } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { FlexBox } from '@/components/FlexBox';
import { GAProvider, GTAG } from '@/components/GAProvider';

type LayoutProps = {
  children: React.ReactNode,
};

const source_sans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
});

const stanford = localFont({
  src: '../public/fonts/stanford.woff2',
  weight: '300',
  variable: '--font-stanford',
});

const grotesk = localFont({
  src: '../public/fonts/PPRightGrotesk-SpatialBlack.woff2',
  weight: '900',
  variable: '--font-grotesk',
});

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <GAProvider>
      <html
        lang="en"
        className={cnb(
          source_sans.variable,
          grotesk.variable,
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
    </GAProvider>
  );
};

export default RootLayout;
