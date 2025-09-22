'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Container } from '@/components/Container';

const Error = ({error}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Segment error', error);
  }, [error]);

  return (
    // global-error must include html and body tags
    // https://nextjs.org/docs/app/getting-started/error-handling#global-errors
    <html lang="en">
      <body>
        <main>
          <Container width="site" className="rs-my-8 text-white">
            <h1>Something went wrong.</h1>
            <p>Try refreshing your browser.</p>
          </Container>
        </main>
      </body>
    </html>
  );
};

export default Error;
