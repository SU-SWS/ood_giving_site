import { Container } from '@/components/Container';
import { Heading, Paragraph } from '@/components/Typography';
import { EndowedPositionsSearch } from './EndowedPositionsSearch';
import Link from 'next/link';

export const EndowedPositionsHeader = () => (
  <header className="flex flex-col items-center">
    <div className="w-full bg-palo-verde-dark pb-70 pt-38 md:pb-162 md:pt-72 lg:pt-108 2xl:pb-171 2xl:pt-114 px-20 sm:px-30 md:px-50 lg:px-80 xl:px-100">
      <Heading as="h1" size="f5" className="text-center text-white">Endowed Positions at Stanford</Heading>
    </div>
    <Container className="bg-white rs-px-4 rs-pt-4 rs-pb-5 shadow-md max-w-1500 -mt-48 md:-mt-108 xl:-mt-114 mx-20 sm:mx-30 md:mx-50 lg:mx-80 xl:mx-100">
      <div className="xl:w-3/4 mx-auto">
        <Paragraph className="text-20 md:text-25 lg:text-29 mb-20">
          <Link href="/endowed-positions">Endowed positions</Link> are
          gifted by donors to support outstanding faculty, staff,
          and campus leaders. Through these meaningful investments,
          donors help enhance the Stanford community and strengthen
          the university’s future.
        </Paragraph>
        <EndowedPositionsSearch variant="small" />
      </div>
    </Container>
  </header>
);
