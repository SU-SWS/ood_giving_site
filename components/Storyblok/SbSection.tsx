import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { CreateBloks } from '@/components/CreateBloks';
import { RichText } from '@/components/RichText';
import { Section, type SectionContentWidthType, type TitleStyleType } from '@/components/Section';
import { type HeadingType } from '@/components/Typography';
import {
  modTypeSizes, type PaddingType, type ModTypeSizeTypes, type LightPageBgColorType,
} from '@/utilities/datasource';
import { hasRichText } from '@/utilities/hasRichText';

type SbSectionProps = {
  blok: SbBlokData & {
    hideSection?: boolean;
    id?: string;
    // Header
    title?: string;
    intro?: StoryblokRichtext;
    srOnlyHeader?: boolean;
    disableWrapping?: boolean;
    titleStyle?: TitleStyleType[];
    tabColor?: string;
    titleSize?: ModTypeSizeTypes;
    headingLevel?: HeadingType;
    // Campaign page only header options
    isCenterAlign?: boolean; // Center align the header
    isSansSemibold?: boolean; // Use sans-serif semibold Title
    // Content
    content: SbBlokData[];
    contentWidth?: string;
    backgroundColor?: LightPageBgColorType;
    spacingTop?: PaddingType;
    spacingBottom?: PaddingType;
  };
}

export const SbSection = ({ blok }: SbSectionProps) => {
  const {
    hideSection,
    id,
    title,
    intro,
    srOnlyHeader,
    disableWrapping,
    titleStyle,
    tabColor,
    titleSize,
    headingLevel,
    isCenterAlign,
    isSansSemibold,
    content,
    contentWidth,
    backgroundColor,
    spacingTop,
    spacingBottom,
  } = blok;

  if (hideSection) return null;

  const Intro = hasRichText(intro) ? <RichText baseFontSize="base23" wysiwyg={intro} /> : null;

  return (
    <Section
      {...storyblokEditable(blok)}
      id={id}
      title={title}
      intro={Intro}
      srOnlyHeader={srOnlyHeader}
      isEdgeToEdgeHeader={disableWrapping}
      titleStyle={titleStyle}
      tabColor={tabColor}
      titleSize={modTypeSizes[titleSize || 'su-mod-type-4']}
      headingLevel={headingLevel}
      isCenterAlignHeader={isCenterAlign}
      isSansSemiboldTitle={isSansSemibold}
      contentWidth={contentWidth as SectionContentWidthType}
      bgColor={backgroundColor}
      pt={spacingTop}
      pb={spacingBottom}
    >
      <CreateBloks blokSection={content} />
    </Section>
  );
};
