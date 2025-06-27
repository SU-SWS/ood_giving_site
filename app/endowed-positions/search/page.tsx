'use client';
import { use, useMemo } from 'react';
import Fuse from 'fuse.js';
import ENDOWED_POSITIONS from '@/fixtures/endowedPositions.json';
import { Container } from '@/components/Container';
import { Heading, Text } from '@/components/Typography';
import { CtaLink } from '@/components/Cta';
import { EndowedPositionsHeader } from '@/components/EndowedPositions';
import { CreateStories } from '@/components/CreateStories';

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'],
  includeScore: true,
  minMatchCharLength: 3,
  threshold: 0.2,
  ignoreLocation: true,
});

type ParamsType = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = ({ searchParams }: ParamsType) => {
  const { term = '', item = '' } = use(searchParams);
  const searchTerm = useMemo(() => Array.isArray(term) ? term[0] : term, [term]);
  const itemIndex = useMemo(() => Array.isArray(item) ? parseInt(item[0], 10) : parseInt(item, 10), [item]);
  const searchResults = useMemo(() => {
    const results = fuse.search(searchTerm);

    if (!Number.isNaN(itemIndex) && !!results.at(itemIndex)) {
      return [results[itemIndex]];
    }

    return results;
  }, [searchTerm, itemIndex]);
  const hasSearchResults = useMemo(() => !!searchResults?.length, [searchResults]);

  return (
    <>
      <CreateStories stories={[]} />
      <EndowedPositionsHeader />
      <section className="my-90">
        <Container>
          <Heading>
            {hasSearchResults ? 'Search' : 'No'} results for &quot;{searchTerm}&quot;
          </Heading>
          {hasSearchResults && (
            <ul>
              {searchResults.map(({ item }, index) => (
                <li key={item.Key}>
                  <CtaLink href={`?term=${searchTerm}&item=${index}`}>
                    <Heading as="h3">{item['CURRENT HOLDER']}</Heading>
                    <Text>Title: {item['POSITION']}</Text>
                    <Text>{item['SUBCATEGORY']}</Text>
                  </CtaLink>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
};

export default Page;
