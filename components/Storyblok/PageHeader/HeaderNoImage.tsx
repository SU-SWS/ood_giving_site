import { cnb } from 'cnbuilder';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { type HeaderProps } from './Header.types';
import { darkBgColors } from '@/utilities/datasource';

/**
 * This header variant is used for Interior Pages, Support Page and Story Overview Page.
 */
type HeaderNoImageProps = Partial<HeaderProps> & {
  hasContentMenu?: boolean;
};

export const HeaderNoImage = ({
  title,
  intro,
  headerBackgroundColor: bgColor,
  hasContentMenu,
}: HeaderNoImageProps) => {
  return (
    <>
      <Container
        pb={9}
        className={cnb(
          darkBgColors[bgColor || 'palo-alto-dark'],
          hasContentMenu ? 'pt-38 md:pt-72 lg:pt-108 2xl:pt-114' : 'rs-pt-7',
        )}
      >
        <Heading
          as="h1"
          id="page-title"
          align="center"
          size="f5"
          mb="none"
          color={bgColor === 'fog-light' ? 'black' : 'white'}
          className="relative w-full mx-auto max-w-1200"
        >
          {title}
        </Heading>
      </Container>
      <Container mb="none">
        <div className="relative bg-white w-full max-w-full -mt-[3em] md:-mt-[6em] rs-p-4 shadow-md">
          {hasRichText(intro) && (
            <div className="relative w-full xl:w-3/4 mx-auto">
              <RichText wysiwyg={intro} className="md:text-center text-20 md:text-25 lg:text-29 [&_p]:text-pretty [&_p]:leading-cozy" />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
