import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { Container } from '@/components/Container';
import { RichText } from '@/components/RichText';
import { type PaddingType } from '@/utilities/datasource';

type SbSingleColumnContentProps = {
  blok: SbBlokData & {
    id?: string;
    content: StoryblokRichtext;
    backgroundColor?: 'white' | 'fog-light'
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  },
};

export const SbSingleColumnContent = (props: SbSingleColumnContentProps) => (
  <Container
    {...storyblokEditable(props.blok)}
    width="full"
    bgColor={props.blok.backgroundColor}
    pt={props.blok.spacingTop}
    pb={props.blok.spacingBottom}
  >
    <div
      id={props.blok.id}
      className={`${
        props.blok.contentWidth !== 'fit-container'
          ? 'centered-container'
          : ''
      } flex-container`}
    >
      <div
        className={`ood-single-column-content__wrapper ${
          props.blok.contentWidth
        }
            ${
              props.blok.contentWidth === 'fit-container'
                ? 'su-ml-none'
                : 'su-mx-auto'
            }`}
      >
        <RichText baseFontSize="base23" wysiwyg={props.blok.content} />
      </div>
    </div>
  </Container>
);
