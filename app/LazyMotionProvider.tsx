'use client';
import { LazyMotion, domAnimation } from 'motion/react';

interface LazyMotionProviderProps {
  children: React.ReactNode;
}

export const LazyMotionProvider = ({ children }: LazyMotionProviderProps) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};
