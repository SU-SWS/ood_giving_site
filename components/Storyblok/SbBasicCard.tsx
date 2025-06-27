import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';

// TODO: This is a placeholder
export type SbBasicCardProps = {
  blok: SbBlokData & {
    headline?: string;
    content?: StoryblokRichtext;
    ctaLink?: SbBlokData[];
  };
}

export const SbBasicCard = ({ blok }: SbBasicCardProps) => {
  const { headline, content, ctaLink } = blok;

  const RichTextContent = hasRichText(content) ? <RichText wysiwyg={content} /> : undefined;

  return (
    <div {...storyblokEditable(blok)} className="bg-white rs-p-2 shadow-md">
      <Heading size={2} color="black">Basic Card {headline}</Heading>
      {RichTextContent}
      <CreateBloks blokSection={ctaLink} />
    </div>
  );
};
