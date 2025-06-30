'use client';
import { notFound } from 'next/navigation';
import { Heading, Paragraph } from '@/components/Typography';
import ENDOWED_POSITIONS_MAP from '@/constants/ENDOWED_POSITIONS_MAP.json';
import ENDOWED_POSITIONS from '@/fixtures/endowedPositions.json';
import { EndowedPositionsPagination } from '@/components/EndowedPositions';
import { use } from 'react';

type PathsType = {
  slug: string;
};

type ParamsType = {
  params: Promise<PathsType>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Fetch the path data for the page and render it.
 */
const Page = ({ params, searchParams }: ParamsType) => {
  const { slug } = use(params);
  const { page = '1' } = use(searchParams);
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
      <Heading className="w-full" size={3} font="sans">
        {matchingData.label}
      </Heading>
      <Paragraph>
        The information presented in the table below is arranged alphabetically by title.
        {matchingData.link && (
          <>
            {' '}Additional information is at{' '}
            <a href={matchingData.link}>{matchingData.label}</a>.
          </>
        )}
      </Paragraph>
      <table className="rs-mt-0">
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
      <EndowedPositionsPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default Page;
