import { type Metadata } from 'next';
import Fuse from 'fuse.js';
import ENDOWED_POSITIONS from '@/fixtures/endowedPositions.json';
import { Heading, Paragraph } from '@/components/Typography';
import Link from 'next/link';
import { config } from '@/utilities/config';
import { logInfo } from '@/utilities/logger';

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

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async ({ searchParams }: ParamsType): Promise<Metadata> => {
  const { term = '' } = await searchParams;
  const searchTerm = Array.isArray(term) ? term[0] : term;
  const title = `Endowed Positions at Stanford: Search results for "${searchTerm}" | ${config.siteTitle}`;
  const description = 'Endowed positions are gifted by donors to support outstanding faculty, staff, and campus leaders. Through these meaningful investments, donors help enhance the Stanford community and strengthen the university’s future.';

  return {
    title,
    description,
  };
};

const Page = async ({ searchParams }: ParamsType) => {
  const { term = '', item = '' } = await searchParams;
  const searchTerm = Array.isArray(term) ? term[0] : term;
  const searchItem = Array.isArray(item) ? item[0] : item;
  const itemIndex = searchItem ? parseInt(searchItem, 10) : undefined;
  const results = fuse.search(searchTerm);
  
  let searchResults = results;
  if (item && itemIndex !== undefined && !Number.isNaN(itemIndex) && !!results.at(itemIndex)) {
    searchResults = [results[itemIndex]];
  }

  const hasSearchResults = !!searchResults?.length;

  logInfo('Rendering EndowedPositions Search Page at runtime', { searchTerm, timestamp: new Date().toISOString() });

  return (
    <>
      <Heading className="w-full" size={3} font="sans">
        {hasSearchResults ? 'Search' : 'No'} results for &quot;{searchTerm}&quot;
      </Heading>
      {hasSearchResults && (
        <ul className="list-none m-0 p-0">
          {searchResults.map(({ item }, index) => (
            <li key={index} className="border-b border-black rs-mb-0 rs-pb-neg1">
              <Link href={`?term=${searchTerm}&item=${itemIndex ? itemIndex : index}`} className="group block w-full !no-underline !text-black">
                <Heading as="h3" font="sans" size={2} className="group-hocus:underline mb-0">{item['CURRENT HOLDER']}</Heading>
                <Paragraph weight="normal" className="text-16 md:text-18 2xl:text-19 leading-cozy">
                  <strong>Title:</strong> {item['POSITION']}
                  <br />
                  {item['SUBCATEGORY']}
                </Paragraph>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Page;
