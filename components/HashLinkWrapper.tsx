'use client';

import { useHashLink } from '@/hooks/useHashLink';

interface HashLinkWrapperProps {
  children: React.ReactNode;
}

export const HashLinkWrapper = ({ children }: HashLinkWrapperProps) => {
  useHashLink();

  return children;
};
