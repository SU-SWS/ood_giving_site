'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Container } from '@/components/Container';

const Error = ({error}: {
  error: Error & { digest?: string };
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Editor page error', error);
  }, [error]);

  return (
    <div className="bg-black">
      <main>
        <Container width="site" className="rs-my-8 text-white">
          <h1>Editor Page Error</h1>
          <p>Something went wrong while loading the editor page.</p>
          <p>Please check your permissions and try again, or contact support if the issue persists.</p>
        </Container>
      </main>
    </div>
  );
};

export default Error;