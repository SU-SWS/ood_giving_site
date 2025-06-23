import { cnb } from 'cnbuilder';
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
    visibleVertical,
  } = blok;

  const hasIntro = hasRichText(intro);

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
    <div className="w-full relative">
      <div className="relative overflow-hidden w-full h-160 sm:h-240 md:h-[33rem] lg:h-400 xl:h-500 2xl:h-600">
        {fullWidthImage}
        {logoFilename && (
          <img
            className="absolute max-sm:top-22 sm:max-md:top-58 md:bottom-120 lg:bottom-130 xl:bottom-140 2xl:bottom-150 left-1/2 -translate-x-1/2 z-20 max-h-[11.5rem] sm:max-h-[12.5rem] md:max-h-[13.7rem] lg:max-h-[17.6rem] xl:max-h-[22rem] 2xl:max-h-[26rem]"
            src={logoFilename}
            alt={logoAlt}
          />
        )}
      </div>
      <Container className="w-full md:-mt-[5em] mx-0 md:mx-auto px-0 md:px-19 lg:px-32 xl:px-58 2xl:px-65">
        <div className="bg-white w-full 2xl:max-w-1300 rs-p-4 mx-0 md:mx-auto relative z-30 shadow-md">
          <Heading
            as="h1"
            id="page-title"
            size="f5"
            align="center"
            mb="04em"
            className={cnb('w-full text-pretty last:mb-02em', hasIntro && 'md:text-left')}
          >
            {title}
          </Heading>
          {hasIntro && (
            <RichText wysiwyg={intro} className="w-full subheading [&_p]:text-pretty" />
          )}
        </div>
      </Container>
    </div>
  );
};
