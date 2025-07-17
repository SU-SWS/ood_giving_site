import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { Accordion, type AccordionColorType } from '@/components/Accordion';
import { type HeadingType } from '@/components/Typography';
import { type MarginType } from '@/utilities/datasource';
import { type SbAccordionItemsTypes } from './Storyblok.types';
import { getNumBloks } from '@/utilities/getNumBloks';

type SbAccordionProps = {
  blok: SbBlokData & {
    title?: string;
    id?: string;
    headingLevel?: HeadingType;
    accordionItems?: SbAccordionItemsTypes[];
    accordionColor?: AccordionColorType;
    spacingTop?: MarginType;
    spacingBottom?: MarginType;
  };
};

export const SbAccordion = ({
  blok: {
    title,
    id,
    headingLevel,
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

  return (
    <Accordion
      {...storyblokEditable(blok)}
      title={title}
      id={id}
      headingLevel={headingLevel || 'h2'}
      items={accordionItems}
      color={accordionColor || 'palo-alto-light'}
      mt={spacingTop}
      mb={spacingBottom}
    />
  );
};
