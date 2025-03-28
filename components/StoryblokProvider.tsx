'use client';
import { getStoryblokApi } from '@/utilities/storyblok';

interface ProviderProps {
  children: React.ReactNode;
  isEditor?: boolean;
};

export default function StoryblokProvider({ children, isEditor = false }: ProviderProps) {
  getStoryblokApi({ isPreview: isEditor });
  return children;
}
