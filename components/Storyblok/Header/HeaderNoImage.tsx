import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { type HeaderProps } from './Header.types';
import { darkBgColors } from '@/utilities/datasource';

type HeaderNoImageProps = Partial<HeaderProps>;

export const HeaderNoImage = ({ blok }: HeaderNoImageProps) => {
  const {
    title,
    intro: introText,
    headerBackgroundColor: bgColor,
  } = blok;

  return (
    <div className="break-words">
      <Container pt={7} pb={9} className={darkBgColors[bgColor || 'palo-alto-dark']}>
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
        <div className="bg-white w-full mb-0 mt-[-3em] md:mt-[-6em] rs-p-4 relative basis-0 shrink-0 max-w-full shadow-md">
          {hasRichText(introText) && (
            <div className="relative w-full xl:w-3/4 mx-auto">
              <RichText wysiwyg={introText} className="md:text-center text-20 md:text-25 lg:text-29" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
