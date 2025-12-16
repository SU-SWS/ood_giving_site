import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Heading, Paragraph } from '@/components/Typography';
import ENDOWED_POSITIONS_MAP from '@/constants/ENDOWED_POSITIONS_MAP.json';
import ENDOWED_POSITIONS from '@/fixtures/endowedPositions.json';
import { EndowedPositionsPagination } from '@/components/EndowedPositions';
import { config } from '@/utilities/config';
import { logInfo } from '@/utilities/logger';

type PathsType = {
  slug: string;
};

type ParamsType = {
  params: Promise<PathsType>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Generate static params for all endowed position categories
 */
export const generateStaticParams = async () => {
  return ENDOWED_POSITIONS_MAP.map((position) => ({
    slug: position.to,
  }));
};

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async ({ params }: ParamsType): Promise<Metadata> => {
  const { slug } = await params;
  const matchingData = ENDOWED_POSITIONS_MAP.find((p) => p.to === slug);

  // If no matching data found, return 404 metadata
  if (!matchingData) {
    return {
      title: 'Page Not Found',
      description: 'The requested endowed position page could not be found.',
    };
  }

  const title = `Endowed Positions at Stanford: "${matchingData.label}" | ${config.siteTitle}`;
  const description = 'Endowed positions are gifted by donors to support outstanding faculty, staff, and campus leaders. Through these meaningful investments, donors help enhance the Stanford community and strengthen the university\'s future.';

  return {
    title,
    description,
  };
};

/**
 * Fetch the path data for the page and render it.
 */
const Page = async ({ params, searchParams }: ParamsType) => {
  const { slug } = await params;
  const { page = '1' } = await searchParams;

  logInfo('Rendering EndowedPositionPage at runtime', { slug, page, timestamp: new Date().toISOString() });

  const matchingData = ENDOWED_POSITIONS_MAP.find((p) => p.to === slug);

  // Slug didn't match anything known
  if (!matchingData) {
    notFound();
  }

  const positions = ENDOWED_POSITIONS.filter((p) => p.SUBCATEGORY === matchingData.id);
  const currentPage = (Array.isArray(page) ? parseInt(page[0], 10) : parseInt(page, 10)) || 1;
  const totalPages = Math.ceil(positions.length / 25);
  const start = (currentPage - 1) * 25;
  const pagedPositions = positions.slice(start, start + 25);

  // Paging is out of bounds
  if (!pagedPositions.length) {
    notFound();
  }

  return (
    <>
      <Heading id="endowedPositionHeading" className="w-full" size={3} font="sans" tabIndex={-1}>
        {matchingData.label}
      </Heading>
      <Paragraph id="endowedPositionDescription">
        The information presented in the table below is arranged alphabetically by title.
        {matchingData.link && (
          <>
            {' '}Additional information is at{' '}
            <a href={matchingData.link}>{matchingData.label}</a>.
          </>
        )}
      </Paragraph>
      <table className="rs-mt-0" aria-labelledby="endowedPositionHeading" aria-describedby="endowedPositionDescription">
        <thead>
          <tr>
            <th>Title</th>
            <th>Current Holder</th>
          </tr>
        </thead>
        <tbody>
          {pagedPositions.map((p, index) => (
            <tr key={index} className="odd:bg-black-10 even:bg-white">
              <th scope="row" className="font-semibold">{p.POSITION}</th>
              <td>{p['CURRENT HOLDER']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EndowedPositionsPagination currentPage={currentPage} totalPages={totalPages} focusOnPageChangeId="endowedPositionHeading" />
    </>
  );
};

export default Page;
