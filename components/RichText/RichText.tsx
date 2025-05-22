import {
  render,
  type StoryblokRichtext,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STYLED,
  MARK_LINK,
  MARK_STRIKE,
  NODE_HEADING,
  NODE_PARAGRAPH,
  NODE_IMAGE,
} from 'storyblok-rich-text-react-renderer';
import { cnb } from 'cnbuilder';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import {
  Heading,
  Paragraph,
  Text,
  textAligns,
  textColors,
  type TextColorType,
  type FontSizeType,
  type TextAlignType,
} from '@/components/Typography';
import { wysiwygClasses, type WysiwygClassesType } from '@/utilities/wysiwygClasses';
import { getProcessedImage } from '@/utilities/getProcessedImage';

/**
 * "default" means using the inherited body font size as the base font size
 * "card" means using the card-paragraph style as the base font size (smaller than default)
 */
export type RichTextBaseFontSizeType = 'default' | 'card' | 'base23';

export type RichTextProps = {
  wysiwyg: StoryblokRichtext;
  baseFontSize?: RichTextBaseFontSizeType;
  textColor?: TextColorType;
  textAlign?: TextAlignType;
  className?: string;
};

export const RichText = ({
  wysiwyg,
  baseFontSize = 'default',
  textColor = 'black',
  textAlign = 'left',
  className,
}: RichTextProps) => {
  const printColor = 'print:text-black';

  const rendered = render(wysiwyg, {
    markResolvers: {
      [MARK_STYLED]: (children, props) => {
        // Custom classes are string of class name(s) separated by spaces, e.g., 'ood-has-tab-before su-sans su-before-bg-bay-dark', 'su-bold'
        const { class: wysiwygCustomClasses = '' } = props;

        // Expanded icon options as needed
        const hasIcon = wysiwygCustomClasses.includes('su-link--action');

        /**
         * Split the string of legacy classes into an array, filter out empty strings, and map to the corresponding TW class names
         * If a match is not found in the wysiwygClasses object, return the original legacy custom class name from the WYSIWYG
         * Stitch the array back into a string at the end
         */
        const finalClasses = wysiwygCustomClasses.split(/\s+/)
          .filter(Boolean)
          .map((className) =>
            className in wysiwygClasses ? wysiwygClasses[className as WysiwygClassesType] : className,
          ).join(' ');

        return (
          <Text
            as="span"
            icon={hasIcon ? 'chevron-right' : undefined}
            iconProps={{ className: hasIcon ? 'ml-02em group-hocus-within:translate-x-02em' : undefined }}
            className={finalClasses}
          >
            {children}
          </Text>
        );
      },
      [MARK_BOLD]: (children) => <strong>{children}</strong>,
      [MARK_ITALIC]: (children) => <em>{children}</em>,
      [MARK_STRIKE]: (children) => <del>{children}</del>,
      [MARK_LINK]: (children, props) => {
        const {
          href,
          target,
          linktype,
          anchor,
          custom,
        } = props;

        // Prevents empty links in the WYSIWYG editor from rendering (a11y issue)
        if (!children || (typeof children === 'string' && !children.trim())) {
          return null;
        }
        /**
         * The data shape of the inline links in WYSIWYG is different form regular Storyblok link field.
         * Here we structure it to match the sbLink type so we can pass that into SbLink component.
         */
        const sbLink = {
          linktype,
          cached_url: linktype === 'story' ? href : '',
          url: linktype === 'asset' || linktype === 'url' ? href : '',
          email: linktype === 'email' ? href : '',
          anchor: linktype === 'story' ? anchor : '',
          // The WYSIWYG inline links automatically add a target="_self" by default which is unnecessary
          target: target === '_blank' ? '_blank' : undefined,
        };

        return (
          <SbLink
            link={sbLink}
            classes="group"
            attributes={custom} // Custom link attributes
          >
            {children}
          </SbLink>
        );
      },
    },
    // TODO: DS-1437 - Will add Blockquote styles later
    nodeResolvers: {
      [NODE_HEADING]: (children, props) => {
        const { level } = props;
        /**
         * For main content WYSIWYG, this gets you type-3 for h2, type-2 for h3, type-1 for h4,
         * but h5 and h6 would be type-0 (the base paragraph font size)
         */
        const headingSize = Math.max(5 - level, 0);

        return (
          <Heading as={`h${level}`} size={headingSize as FontSizeType} leading="tight">
            {children}
          </Heading>
        );
      },
      [NODE_PARAGRAPH]: (children) => (
        <Paragraph variant={baseFontSize !== 'default'? baseFontSize : undefined}>{children}</Paragraph>
      ),
      [NODE_IMAGE]: (children, props) => {
        const { alt, src } = props;
        return (
          <img
            src={getProcessedImage(src, '1500x0')}
            alt={alt || ''}
            loading="lazy"
          />
        );
      },
    },
    defaultBlokResolver: (name) => (
      <Paragraph weight="bold">
        Missing blok resolver for blok type {name}.
      </Paragraph>
    ),
    defaultStringResolver: (str) => <div>{str}</div>,
  });

  return (
    <div
      className={cnb(
        'wysiwyg break-words', // wysiwyg class from Decanter adds vertical rhythm and basic styles
        textColors[textColor],
        printColor,
        textAligns[textAlign],
        className,
      )}
      data-component="RichText"
    >
      {rendered}
    </div>
  );
};
