import { type ISbStoryData } from '@storyblok/react/rsc';
import { type SbLinkType, type SbImageType } from '@/components/Storyblok/Storyblok.types';
import { config } from '@/utilities/config';
import { sbStripSlugURL } from '@/utilities/sbStripSlugUrl';
import { getProcessedImage } from '@/utilities/getProcessedImage';

type SbSEOType = {
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
      headerImage?: SbImageType;
      heroImage?: SbImageType;
      image?: SbImageType;
    };
  };
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
      headerImage: { filename: headerImageSrc, focus: headerImageFocus } = {}, // from Interior Page
      heroImage: { filename: heroImageSrc, focus: heroImageFocus } = {}, // from Story
      image: { filename: storyImageSrc, focus: storyImageFocus } = {}, // from Campaign Page
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
  const contentImage = getProcessedImage(headerImageSrc, '1200x630', headerImageFocus)
    || getProcessedImage(heroImageSrc, '1200x630', heroImageFocus)
    || getProcessedImage(storyImageSrc, '1200x630', storyImageFocus);
  const ogImage = seo?.og_image ? getProcessedImage(seo.og_image, '1200x630') : contentImage;
  const twitterImage = seo?.twitter_image ? getProcessedImage(seo.twitter_image, '1200x600') : undefined;

  // SEO metadata.
  // Title priority: Story SEO > Story Title
  // Description priority: Story SEO > Hardcoded Site Description
  return {
    title: `${title || name} | ${siteTitle}`,
    description: seo?.description || seo?.og_description || seo?.twitter_description || siteDescription,
    metadataBase: new URL(siteUrlProd),
    openGraph:{
      title: seo?.og_title || title || name,
      description: seo?.og_description || seo?.description || siteDescription,
      images: ogImage,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter_title || title || name,
      description: seo?.twitter_description || seo?.description || siteDescription,
      images: twitterImage,
    },
    alternates: {
      canonical,
    },
    robots: noindex && 'noindex',
  };
};
