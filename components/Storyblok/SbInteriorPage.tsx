import { cnb } from 'cnbuilder';
import { type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import {
  HeaderFullWidthImage, HeaderMinimal, HeaderNoImage, HeaderSmallImage,
} from '@/components/Storyblok/PageHeader';
import { Container } from '@/components/Container';
import { CreateBloks } from '@/components/CreateBloks';
import { PageLayout } from '@/components/Storyblok/partials/PageLayout';
import { Skiplink } from '@/components/SkipLink';
import { Heading } from '@/components/Typography';
import { type VisibleVerticalType } from '@/components/Image';
import { getNumBloks } from '@/utilities/getNumBloks';
import { darkBgColors, type DarkBgColorType, type MarginType } from '@/utilities/datasource';
import { type SbImageType } from './Storyblok.types';

export type SbInteriorPageProps = {
  blok: SbBlokData & {
    layout?: 'left-sidebar' | 'no-sidebar';
    // Header
    title?: string;
    intro?: StoryblokRichtext;
    headerStyle?: 'has-image' | 'no-image' | 'minimal' | 'full-width-image';
    headerBackgroundColor?: DarkBgColorType;
    headerLogo?: SbImageType;
    headerImage?: SbImageType;
    headerSpacingBottom?: MarginType;
    visibleVertical?: VisibleVerticalType;
    localHeader?: SbBlokData[];
    alertPicker?: SbBlokData[];
    // Above content
    aboveContent?: SbBlokData[];
    // Main body content
    pageContent?: SbBlokData[];
    bodyTitle?: string;
    // Sidebar
    contentMenu?: SbBlokData[];
    contactInfo?: SbBlokData[];
    // Below content
    belowContent?: SbBlokData[];
    iconCardHeading?: string;
    iconCards?: SbBlokData[];
    // Footer
    localFooter?: SbBlokData[];
    globalFooter?: SbBlokData[];
  };
  slug?: string;
};

export const SbInteriorPage = ({ blok, slug }: SbInteriorPageProps) => {
  const {
    layout = 'left-sidebar',
    title,
    intro,
    headerStyle,
    headerLogo,
    headerImage,
    headerBackgroundColor,
    headerSpacingBottom,
    visibleVertical,
    localHeader,
    alertPicker,
    bodyTitle,
    pageContent,
    contactInfo,
    contentMenu,
    aboveContent,
    belowContent,
    iconCardHeading,
    iconCards,
    localFooter,
    globalFooter,
  } = blok;

  const hasHeroImage = headerStyle === 'has-image' || headerStyle === 'full-width-image';
  const hasContentMenu = !!getNumBloks(contentMenu);
  const showMobileContentMenu = hasContentMenu && layout === 'left-sidebar';

  return (
    <PageLayout
      blok={blok}
      slug={slug}
      alertPicker={alertPicker}
      localHeader={localHeader}
      belowContent={belowContent}
      iconCards={iconCards}
      iconCardHeading={iconCardHeading}
      localFooter={localFooter}
      globalFooter={globalFooter}
    >
      {/* Article header */}
      <Container as="header" width="full" mb={headerSpacingBottom} className="break-words">
        {/* Mobile content (section) menu */}
        {showMobileContentMenu &&
          <Container
            pt={2}
            pb={hasHeroImage ? 2 : undefined}
            className={cnb(
              'lg:hidden',
              hasHeroImage ? 'bg-palo-alto-dark' : darkBgColors[headerBackgroundColor || 'palo-alto-dark'],
            )}
          >
            <CreateBloks blokSection={contentMenu} slug={slug} />
          </Container>
        }
        {headerStyle === 'has-image' && (
          <HeaderSmallImage
            title={title}
            intro={intro}
            headerImage={headerImage}
            headerBackgroundColor={headerBackgroundColor}
          />
        )}
        {headerStyle === 'no-image' && (
          <HeaderNoImage
            title={title}
            intro={intro}
            headerBackgroundColor={headerBackgroundColor}
            hasContentMenu={showMobileContentMenu}
          />
        )}
        {headerStyle === 'minimal' && <HeaderMinimal title={title} headerBackgroundColor={headerBackgroundColor} />}
        {headerStyle === 'full-width-image' && (
          <HeaderFullWidthImage
            title={title}
            intro={intro}
            headerImage={headerImage}
            headerLogo={headerLogo}
            visibleVertical={visibleVertical}
          />
        )}
      </Container>
      {!!getNumBloks(aboveContent) && (
        <CreateBloks blokSection={aboveContent} />
      )}
      {(bodyTitle || !!getNumBloks(pageContent)) && (
        <Container width="full" pt={6}>
          {/* Main body header */}
          {bodyTitle && (
            <Container as="header" pb={5}>
              <Heading mb="none" className="max-w-1200 before:block before:mb-03em before:content-[''] before:h-10 before:w-80 before:bg-cardinal-red">
                {bodyTitle}
              </Heading>
            </Container>
          )}
          <Container pb={6} className="cc lg:grid lg:grid-cols-12 lg:grid-gap">
            {/* Sidebar */}
            {layout === 'left-sidebar' && (
              <aside className="lg:col-span-4 xl:col-span-3 gap-y-20 md:gap-y-26 2xl:gap-y-27">
                <div className="hidden lg:block">
                  <Skiplink href="#body-content" className="hidden left-0 lg:block focus:block focus:w-fit focus:relative focus:bg-cardinal-red -top-60 focus:mx-auto">
                    Skip past section menu to page content
                  </Skiplink>
                  <CreateBloks blokSection={contentMenu} slug={slug} />
                </div>
                {!!getNumBloks(contactInfo) && (
                  <div className="max-md:mb-45 md:max-lg:mb-72">
                    <CreateBloks blokSection={contactInfo} />
                  </div>
                )}
              </aside>
            )}
            {/* Main body content */}
            <div id="body-content" className={layout === 'left-sidebar' ? 'lg:col-span-8 xl:col-start-5' : 'slg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3'}>
              <CreateBloks blokSection={pageContent} />
            </div>
          </Container>
        </Container>
      )}
    </PageLayout>
  );
};
