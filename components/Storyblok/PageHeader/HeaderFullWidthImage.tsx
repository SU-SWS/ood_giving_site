import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { FullWidthImage } from '@/components/Image/FullWidthImage';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { type HeaderProps } from './Header.types';

type HeaderFullWidthImageProps = Partial<HeaderProps>;

export const HeaderFullWidthImage = ({ blok }: HeaderFullWidthImageProps) => {
  const {
    title,
    intro,
    headerImage: { filename, alt } = {},
    headerLogo: { filename: logoFilename, alt: logoAlt } = {},
    // headerSpacingBottom,
    visibleVertical,
  } = blok;

  // Display fog light background color behind logo if there's a logo image but no hero image
  const fullWidthImage = filename ? (
    <FullWidthImage
      filename={filename}
      classPrefix="ood-interior-page"
      visibleVertical={visibleVertical}
      visibleHorizontal="center"
      alt={alt || ''}
      className="print:hidden h-160 sm:h-240 md:h-[33rem] lg:h-400 xl:h-500 2xl:h-600"
    />
  ) : (
    <div
      className="bg-fog-light overflow-hidden w-full h-160 sm:h-240 md:h-[33rem] lg:h-400 xl:h-500 2xl:h-600"
      aria-hidden="true"
    />
  );

  return (
    <div className="w-full relative break-words">
      <div className="relative overflow-hidden w-full h-160 sm:h-240 md:h-[33rem] lg:h-400 xl:h-500 2xl:h-600">
        {fullWidthImage}
        {logoFilename && (
          <img
            className="absolute top-22 sm:top-58 md:top-45 lg:top-260 xl:top-300 2xl:top-350 left-1/2 -translate-x-1/2 z-20 max-h-[11.5rem] sm:max-h-[12.5rem] md:max-h-[13.7rem] lg:max-h-[17.6rem] xl:max-h-[22rem] 2xl:max-h-[26rem]"
            src={logoFilename}
            alt={logoAlt}
          />
        )}
      </div>
      <Container className="w-full md:mt-[-5em] mx-0 md:mx-auto px-0 md:px-19 lg:px-32 xl:px-58 2xl:px-65">
        <div className="bg-white w-full 2xl:max-w-1300 rs-p-4 mx-0 md:mx-auto relative z-30 shadow-md">
          <Heading
            as="h1"
            id="page-title"
            align="center"
            className="text-black w-full mb-08em fluid-type-5 md:text-left text-balance"
          >
            {title}
          </Heading>
          {hasRichText(intro) && (
            <div className="w-full subheading">
              <RichText wysiwyg={intro} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
