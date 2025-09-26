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
      canonicalURL?: SbLinkType;
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
      canonicalURL,
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
  if (canonicalURL) {
    switch (canonicalURL.linktype) {
      case 'story': {
          if (canonicalURL.cached_url && canonicalURL.cached_url.length) {
            canonical = `${siteUrlProd}${sbStripSlugURL(canonicalURL.cached_url)}`;
          }
        }
        break;
      case 'url': {
        if (canonicalURL.url && (canonicalURL.url as string).length) {
          canonical = canonicalURL.url as string;
        }
      }
      break;
    }
  }

  // Only process content image fallback if neither og image nor twitter image is set in the SEO field
  const needsContentImage = !seo?.og_image && !seo?.twitter_image;
  const contentImage = needsContentImage
    ? getProcessedImage(headerImageSrc, '1200x630', headerImageFocus)
      || getProcessedImage(heroImageSrc, '1200x630', heroImageFocus)
      || getProcessedImage(storyImageSrc, '1200x630', storyImageFocus)
    : undefined;

  const ogImage = seo?.og_image ? getProcessedImage(seo.og_image, '1200x630') : contentImage;

  // Whatever is used for og:image will be used for twitter card image, so no need to fallback to contentImage again
  const twitterImage = seo?.twitter_image ? getProcessedImage(seo.twitter_image, '1200x600') : undefined;

  // Title priority: Story SEO field title > Story title field > Story name
  const baseStoryTitle = seo?.title || title || name;

  // Description priority: SEO field description > Hardcoded site description in config
  const baseDescription = seo?.description || siteDescription;

  return {
    title: `${baseStoryTitle} | ${siteTitle}`,
    description: baseDescription,
    metadataBase: new URL(siteUrlProd),
    openGraph:{
      title: seo?.og_title || baseStoryTitle,
      description: seo?.og_description || baseDescription,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      type: 'website',
    },
    /**
     * Twitter automatically uses og:title, og:description, and og:image if twitter:title, twitter:description, and twitter:image are not provided
     * So we don't really need to provide twitter fallbacks since fallbacks are already provided in the og tags
     */
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitter_title,
      description: seo?.twitter_description,
      images: twitterImage,
    },
    alternates: {
      canonical,
    },
    robots: noindex && 'noindex',
  };
};
