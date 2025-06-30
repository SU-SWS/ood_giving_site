'use client';
import Fuse from 'fuse.js';
import ENDOWED_POSITIONS from '@/fixtures/endowedPositions.json';
import { Heading, Paragraph } from '@/components/Typography';
import { CtaLink } from '@/components/Cta';
import { useSearchParams } from 'next/navigation';

const fuse = new Fuse(ENDOWED_POSITIONS, {
  keys: ['SUBCATEGORY', 'POSITION', 'CURRENT HOLDER'],
  includeScore: true,
  minMatchCharLength: 3,
  threshold: 0.2,
  ignoreLocation: true,
});

const Page = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term') || '';
  const item = searchParams.get('item');
  const itemIndex = item ? parseInt(item, 10) : undefined;
  const results = fuse.search(searchTerm);
  const searchResults = !Number.isNaN(itemIndex) && !!results.at(itemIndex)
    ? [results[itemIndex]]
    : results;
  const hasSearchResults = !!searchResults?.length;

  return (
    <>
      <Heading className="w-full" size={3} font="sans">
        {hasSearchResults ? 'Search' : 'No'} results for &quot;{searchTerm}&quot;
      </Heading>
      {hasSearchResults && (
        <ul className="list-none m-0 p-0">
          {searchResults.map(({ item }, index) => (
            <li key={`${item.Key}_${item['CURRENT HOLDER']}_${item.POSITION}`} className="border-b border-black rs-mb-0 rs-pb-neg1">
              <CtaLink href={`?term=${searchTerm}&item=${itemIndex ? itemIndex : index}`} className="group block w-full !no-underline !text-black">
                <Heading as="h3" font="sans" size={2} className="group-hocus:underline mb-0">{item['CURRENT HOLDER']}</Heading>
                <Paragraph weight="normal" className="text-16 md:text-18 2xl:text-19 leading-cozy">
                  <strong>Title:</strong> {item['POSITION']}
                  <br />
                  {item['SUBCATEGORY']}
                </Paragraph>
              </CtaLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Page;
