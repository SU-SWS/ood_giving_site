import { CtaLink } from '../Cta';
import { Heading, Paragraph } from '../Typography';
import { EndowedPositionsSearch } from './EndowedPositionsSearch';

export const EndowedPositionsHeader = () => (
  <div className="su-bg-fog-light">
    <header>
      <Heading as="h1">Endowed Positions at Stanford</Heading>
      <Paragraph>
        <CtaLink href="/endowed-positions">Endowed positions</CtaLink> are
        gifted by donors to support outstanding faculty, staff,
        and campus leaders. Through these meaningful investments,
        donors help enhance the Stanford community and strengthen
        the university’s future.
      </Paragraph>
      <EndowedPositionsSearch />
    </header>
  </div>
);
