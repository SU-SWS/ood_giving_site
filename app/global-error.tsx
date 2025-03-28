'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Masthead } from '@/components/Masthead';
import { Container } from '@/components/Container';

export default function Error({error}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Segment error', error);
  }, [error]);

  return (
    <div className="bg-black">
      <Masthead />
      <main>
        <Container width="site" className="rs-my-8 text-white">
          <h1>Something went wrong.</h1>
          <p>Try refreshing your browser.</p>
        </Container>
      </main>
    </div>
  );
}
