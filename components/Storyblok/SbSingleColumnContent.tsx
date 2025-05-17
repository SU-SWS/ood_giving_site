import { storyblokEditable, type SbBlokData } from '@storyblok/react';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { RichText } from '@/components/RichText';
import { type PaddingType } from '@/utilities/datasource';

type SbSingleColumnContentProps = {
  blok: SbBlokData & {
    id?: string;
    content: StoryblokRichtext;
    backgroundColor?: 'black' | 'white' | 'black-70' | 'black-60' | 'black-50' | 'none';
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  },
  // isDarkTheme?: boolean;
  // baseFontSize?: RichTextBaseFontSizeType;
};

export const SbSingleColumnContent = (props: SbSingleColumnContentProps) => (
  <div
    {...storyblokEditable(props.blok)}
    className={`ood-single-column-content
                  ${
                    props.blok.backgroundColor !== ''
                      ? `su-bg-${props.blok.backgroundColor}`
                      : ''
                  }
                  ${
                    props.blok.spacingTop !== 'none'
                      ? `su-pt-${props.blok.spacingTop}`
                      : ''
                  }
                  ${
                    props.blok.spacingBottom !== 'none'
                      ? `su-pb-${props.blok.spacingBottom}`
                      : ''
                  }
  `}
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
        <RichTextField data={props.blok.content} />
      </div>
    </div>
  </div>
);
