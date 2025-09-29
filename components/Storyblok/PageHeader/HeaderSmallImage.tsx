import { cnb } from 'cnbuilder';
import { AspectRatioImage } from '@/components/Image';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { darkBgColors } from '@/utilities/datasource';
import { type HeaderProps } from './Header.types';

type HeaderSmallImageProps = Partial<HeaderProps>;

export const HeaderSmallImage = ({
  title,
  intro,
  headerImage: { filename, focus, alt } = {},
  headerBackgroundColor: bgColor,
}: HeaderSmallImageProps) => {
  return (
    <Container pt={6} pb={5} className="relative bg-white break-words flex flex-col md:flex-row md:items-start grid-gap mx-auto">
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
          <RichText wysiwyg={intro} className="text-20 md:text-23 lg:text-25 mb-07em md:mb-0 [&_p]:text-pretty" />
        )}
      </div>
      {filename && (
        <>
          <div
            className={cnb(
              'block translate-x-[2rem] sm:translate-x-[3rem] md:translate-x-0 md:absolute md:top-0 md:right-0 w-full aspect-[3/2] 3xl:aspect-none md:w-[calc(41vw-6rem)] lg:w-[calc(48vw-10rem)] 3xl:h-[48rem]',
              darkBgColors[bgColor || 'palo-alto-dark'],
            )}
            aria-hidden="true"
          />
          <div className="print:hidden relative md:w-5/12 xl:w-6/12 mr-0 -ml-20 w-[calc(100%+2rem)] sm:-ml-30 sm:w-[calc(100%+3rem)] md:ml-0 -mt-[59vw] md:mt-0 z-10 pb-0">
            <AspectRatioImage
              aspectRatio="3x2"
              filename={filename}
              focus={focus}
              alt={alt}
              imageSize="header"
              fetchPriority="high"
            />
          </div>
        </>
      )}
    </Container>
  );
};
