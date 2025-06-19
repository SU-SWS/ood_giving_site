import { cnb } from 'cnbuilder';
import { AspectRatioImage } from '@/components/Image';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { darkBgColors } from '@/utilities/datasource';
import { type HeaderProps } from './Header.types';

type HeaderSmallImageProps = Partial<HeaderProps>;

export const HeaderSmallImage = ({ blok }: HeaderSmallImageProps) => {
  const {
    title,
    intro,
    headerImage: { filename, focus, alt } = {},
    headerBackgroundColor: bgColor,
  } = blok;

  return (
    <div className="relative block pt-38 md:pt-0 bg-white break-words">
      <Container className="flex flex-col md:flex-row md:items-start md:pt-58 lg:pt-72 2xl:pt-95 grid-gap mx-auto">
        <div className="w-full md:w-7/12 xl:w-6/12">
          <Heading
            as="h1"
            id="page-title"
            size="f5"
            align="center"
            mb="04em"
            className=" text-black mt-0 md:text-left"
          >
            {title}
          </Heading>
          {hasRichText(intro) && (
            <RichText wysiwyg={intro} className="subheading" />
          )}
        </div>
        {filename && (
          <>
            <div
              className={cnb(
                'block md:absolute md:top-0 md:right-0 w-full aspect-[3/2] md:aspect-none md:w-[calc(41vw-6rem)] md:h-[calc(27.33vw-4rem)] lg:w-[calc(48vw-10rem)] lg:h-[calc(32vw-6.67rem)] 3xl:h-[48rem]',
                darkBgColors[bgColor || 'palo-alto-dark'],
              )}
              aria-hidden="true"
            />
            <AspectRatioImage
              filename={filename}
              focus={focus}
              alt={alt}
              imageSize="header"
              className="print:hidden relative md:w-5/12 xl:w-6/12 mr-0 -ml-20 w-[calc(100%+2rem)] sm:-ml-30 sm:w-[calc(100%+3rem)] md:ml-0 -mt-[60vw] md:mt-0 z-10 pb-0"
            />
          </>
        )}
      </Container>
    </div>
  );
};
