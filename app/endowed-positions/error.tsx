'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Container } from '@/components/Container';

const Error = ({error}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Endowed positions error', error);
  }, [error]);

  return (
    <div className="bg-black">
      <main>
        <Container width="site" className="rs-my-8 text-white">
          <h1>Endowed Positions Error</h1>
          <p>Something went wrong while loading the endowed positions section.</p>
          <p>Please try refreshing the page or return to the main site.</p>
        </Container>
      </main>
    </div>
  );
};

export default Error;
