import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { Accordion, type AccordionColorType } from '@/components/Accordion';
import { type HeadingType } from '@/components/Typography';
import { type PaddingType } from '@/utilities/datasource';
import { type SbAccordionItemsTypes } from './Storyblok.types';
import { getNumBloks } from '@/utilities/getNumBloks';

type SbAccordionProps = {
  blok: SbBlokData & {
    title?: string;
    id?: string;
    headingLevel?: HeadingType;
    itemHeadingLevel?: HeadingType;
    accordionItems?: SbAccordionItemsTypes[];
    accordionColor?: AccordionColorType;
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  };
};

/**
 * Derive item heading level from title and headingLevel.
 * If title exists: derive from headingLevel (or h2 if not provided), one level lower, capped at h6.
 * If no title: use explicit itemHeadingLevel if provided, otherwise default to h2.
 */
const resolveItemHeadingLevel = (
  title?: string,
  headingLevel?: HeadingType,
  itemHeadingLevel?: HeadingType,
): HeadingType => {
  if (title) {
    // Treat empty/falsy headingLevel as h2
    const baseHeading = headingLevel ? headingLevel : 'h2';
    const baseNum = Math.max(parseInt(String(baseHeading).replace('h', ''), 10) || 2, 1);
    return (`h${Math.min(baseNum + 1, 6)}` as HeadingType);
  }
  return itemHeadingLevel ? itemHeadingLevel : 'h2';
};

export const SbAccordion = ({
  blok: {
    title,
    id,
    headingLevel,
    itemHeadingLevel,
    accordionItems,
    accordionColor,
    spacingTop,
    spacingBottom,
  },
  blok,
}: SbAccordionProps) => {
  if (!getNumBloks(accordionItems)) {
    return null;
  }

  const resolvedItemHeadingLevel = resolveItemHeadingLevel(title, headingLevel, itemHeadingLevel);

  return (
    <Accordion
      {...storyblokEditable(blok)}
      title={title}
      id={id}
      headingLevel={headingLevel || 'h2'}
      itemHeadingLevel={resolvedItemHeadingLevel}
      items={accordionItems}
      color={accordionColor || 'palo-alto-light'}
      pt={spacingTop}
      pb={spacingBottom}
    />
  );
};
