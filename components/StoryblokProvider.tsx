'use client';
import { getStoryblokApi } from '@/utilities/storyblok';

type ProviderProps = {
  children: React.ReactNode;
  isEditor?: boolean;
};

export const StoryblokProvider = ({ children, isEditor = false }: ProviderProps) => {
  getStoryblokApi({ isPreview: isEditor });
  return children;
};
