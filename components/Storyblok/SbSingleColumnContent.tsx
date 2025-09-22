import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { cnb } from 'cnbuilder';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { Container } from '@/components/Container';
import { RichText } from '@/components/RichText';
import { type PaddingType } from '@/utilities/datasource';
import { hasRichText } from '@/utilities/hasRichText';

const contentWidths = {
  'fit-container': 'w-full',
  'flex-lg-8-of-12': 'lg:basis-8/12',
  'flex-md-10-of-12 flex-lg-8-of-12 flex-2xl-7-of-12': 'md:basis-10/12 lg:basis-8/12 2xl:basis-7/12',
};
type ContentWidthType = keyof typeof contentWidths;

type SbSingleColumnContentProps = {
  blok: SbBlokData & {
    id?: string;
    content: StoryblokRichtext;
    contentWidth?: ContentWidthType;
    backgroundColor?: 'white' | 'fog-light'
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  },
};

export const SbSingleColumnContent = (props: SbSingleColumnContentProps) => {
  if (!hasRichText(props.blok.content)) {
    return null;
  }

  return (
    <Container
      {...storyblokEditable(props.blok)}
      id={props.blok.id}
      width={props.blok.contentWidth !== 'fit-container' ? 'site' : 'full'}
      bgColor={props.blok.backgroundColor}
      pt={props.blok.spacingTop}
      pb={props.blok.spacingBottom}
      className="flex"
    >
      <div
        className={cnb(
          !props.blok.contentWidth || props.blok.contentWidth === 'fit-container' ? 'ml-none' : 'mx-auto',
          contentWidths[props.blok.contentWidth],
        )}
      >
        <RichText baseFontSize="base23" wysiwyg={props.blok.content} />
      </div>
    </Container>
  );
};
