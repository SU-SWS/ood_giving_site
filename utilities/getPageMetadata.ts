import { type ISbStoryData } from '@storyblok/react/rsc';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { config } from './config';
import { sbStripSlugURL } from '@/utilities/sbStripSlugUrl';
import { getFirstImage } from './getFirstImage';
import { getProcessedImage } from './getProcessedImage';

export type SbSEOType = {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
};

type PageMetadataProps = {
  story: ISbStoryData & {
    content: ISbStoryData['content'] & {
      noindex?: boolean;
      title?: string
      canonicalUrl?: SbLinkType;
      seo?: SbSEOType;
    };
  };
  sbConfig: ISbStoryData;
  slug: string;
};

/**
 * Get the page metadata for the story.
 * Merge the story data with the global configuration to generate the metadata.
 *
 * @param story - The story data.
 * @param slug - The slug of the story.
 *
 * @returns Metadata - The metadata for the page.
 */
export const getPageMetadata = ({ story, slug }: PageMetadataProps) => {
  // Story explicit content.
  const {
    name,
    content: {
      noindex,
      seo,
      title,
      canonicalUrl,
    },
  } = story;

  // Default hardcoded values.
  const {
    siteUrlProd,
    siteTitle,
    siteDescription,
  } = config;

  // Canonical URL.
  // Canonical priority: Story Canonical URL > Config Site URL + Slug
  let canonical = `${siteUrlProd}${sbStripSlugURL(slug)}`;
  if (canonicalUrl) {
    switch (canonicalUrl.linktype) {
      case 'story': {
          if (canonicalUrl.cached_url && canonicalUrl.cached_url.length) {
            canonical = `${siteUrlProd}${sbStripSlugURL(canonicalUrl.cached_url)}`;
          }
        }
        break;
      case 'url': {
        if (canonicalUrl.url && (canonicalUrl.url as string).length) {
          canonical = canonicalUrl.url as string;
        }
      }
      break;
    }
  }

  // Process the images.
  // Use the explicitly set image from the SEO component if available,
  // then use a known field if the CT has it,
  // otherwise use the first image in the content.
  const knownImageFields = ['heroImage']; // order of priority
  const firstImage = getFirstImage(knownImageFields, story.content);
  const firstImageProcessed = firstImage ? getProcessedImage(firstImage.filename, '1200x630', firstImage.focus) : undefined;
  // Process the images. Use the explicitly set image if available, otherwise use the first image in the content.
  const ogImage = seo?.og_image ? getProcessedImage(seo.og_image, '1200x630') : firstImageProcessed;
  const twitterImage = seo?.twitter_image ? getProcessedImage(seo.twitter_image, '1200x600') : firstImageProcessed;
  const defaultImage = firstImageProcessed;

  // SEO metadata.
  // Title priority: Story SEO > Story Title > Config Blok Site Title
  // Description priority: Story SEO > Config Blok Site Description > Hardcoded Site Description
  return {
    title: `${title || name} | ${siteTitle}`,
    description: siteDescription,
    metadataBase: new URL(siteUrlProd),
    openGraph:{
      title: seo?.og_title || title || name,
      description: seo?.og_description || seo?.description || siteDescription,
      images: ogImage || defaultImage,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter_title || title || name,
      description: seo?.twitter_description || seo?.description || siteDescription,
      images: twitterImage || defaultImage,
    },
    alternates: {
      canonical,
    },
    robots: noindex && 'noindex',
  };
};
