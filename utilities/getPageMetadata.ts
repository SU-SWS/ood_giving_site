import { type ISbStoryData } from '@storyblok/react/rsc';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { config } from './config';
import { sbStripSlugURL } from '@/utilities/sbStripSlugUrl';

type PageMetadataProps = {
  story: ISbStoryData & {
    content: ISbStoryData['content'] & {
      noindex?: boolean;
      title?: string;
      canonicalUrl?: SbLinkType;
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
 * @param sbConfig - The global configuration.
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

  // SEO metadata.
  // Title priority: Story SEO > Story Title > Config Blok Site Title
  // Description priority: Story SEO > Config Blok Site Description > Hardcoded Site Description
  return {
    title: `${title || name} | ${siteTitle}`,
    description: siteDescription,
    metadataBase: new URL(siteUrlProd),
    alternates: {
      canonical,
    },
    robots: noindex && 'noindex',
  };
};
