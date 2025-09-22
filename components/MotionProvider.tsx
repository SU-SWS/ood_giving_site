'use client';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

interface LazyMotionProviderProps {
  children: React.ReactNode;
}

export const MotionProvider = ({ children }: LazyMotionProviderProps) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
};
