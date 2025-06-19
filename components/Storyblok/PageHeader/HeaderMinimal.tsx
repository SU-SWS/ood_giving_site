import { cnb } from 'cnbuilder';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Typography';
import { type HeaderProps } from '@/components/Storyblok/PageHeader';
import { darkBgColors } from '@/utilities/datasource';

type HeaderMinimalProps = Partial<HeaderProps>;

export const HeaderMinimal = ({ blok }: HeaderMinimalProps) => {
  const { title, headerBackgroundColor: bgColor } = blok;

  return (
    <Container
      className={cnb(
        'py-38 md:py-72 lg:py-108 xl:py-[11.1rem] break-words',
        darkBgColors[bgColor || 'palo-alto-dark'],
      )}
    >
      <Heading
        as="h1"
        id="page-title"
        className={cnb('mb-0 mx-auto fluid-type-5 max-w-1200 text-balance', bgColor === 'fog-light' ? 'text-black' : 'text-white')}
        align="center"
      >
        {title}
      </Heading>
    </Container>
  );
};
