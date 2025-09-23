'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';

const Error = ({error}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Endowed positions search error', error);
  }, [error]);

  return (
    <div className="bg-black">
      <main>
        <Container width="site" className="rs-my-8 text-white">
          <h1>Search Error</h1>
          <p>Something went wrong while searching endowed positions.</p>
          <p>Please try your search again or return to the <Link href="/endowed-positions" className="underline text-blue-300">endowed positions listing</Link>.</p>
        </Container>
      </main>
    </div>
  );
};

export default Error;