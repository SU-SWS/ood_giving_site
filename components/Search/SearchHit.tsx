'use client';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { Heading, Paragraph } from '@/components/Typography';
import { CtaLink } from '@/components/Cta';
import { type SearchHit as SearchHitType } from './Search.types';

type HitProps = {
  hit: AlgoliaHit<SearchHitType>;
};

export const SearchHit = ({ hit }: HitProps) => {
  const { full_slug: fullSlug = '', content } = hit ?? {};
  const { title = '', seo } = content ?? {};
  const { description = '' } = seo ?? {};

  const url = fullSlug === 'home' ? '/' : `/${fullSlug}`;

  return (
    <article className="rs-px-0 rs-pb-2 rs-mb-2 border-b border-b-black-30">
      <Heading as="h2" className="mb-0">
        <CtaLink href={url} icon="su-link--action" className="!font-bold !text-20 md:!text-24">{title}</CtaLink>
      </Heading>
      {!!description && (
        <Paragraph className="rs-mt-0 mb-0">
          {description}
        </Paragraph>
      )}
    </article>
  );
};
