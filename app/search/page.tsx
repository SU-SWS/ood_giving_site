import { use, useMemo } from 'react';
import { type Metadata } from 'next';
import { Heading } from '@/components/Typography';
import { config } from '@/utilities/config';

type ParamsType = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: `Search for... | ${config.siteTitle}`,
};

const Page = ({ searchParams }: ParamsType) => {
  const { q = '' } = use(searchParams);
  const searchTerm = useMemo(() => Array.isArray(q) ? q[0] : q, [q]);

  return (
    <Heading className="w-full" size={3} font="sans">
      You searched for &quot;{searchTerm}&quot;
    </Heading>
  );
};

export default Page;
