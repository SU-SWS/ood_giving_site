import { Heading } from '@/components/Typography';

export const SearchHeader = () => (
  <header className="flex flex-col items-center">
    <div className="w-full bg-palo-alto-dark py-38 md:py-72 lg:py-[11.4rem] px-20 sm:px-30 md:px-50 lg:px-80 xl:px-100">
      <Heading as="h1" size="f5" className="text-center text-white mb-0">Search for...</Heading>
    </div>
  </header>
);
