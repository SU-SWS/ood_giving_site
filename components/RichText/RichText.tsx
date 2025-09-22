import {
  render,
  type StoryblokRichtext,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STYLED,
  MARK_LINK,
  MARK_STRIKE,
  MARK_TEXT_STYLE,
  NODE_HEADING,
  NODE_PARAGRAPH,
  NODE_IMAGE,
  NODE_QUOTE,
} from 'storyblok-rich-text-react-renderer';
import { cnb } from 'cnbuilder';
import { CtaLink } from '@/components/Cta';
import { QuoteCardContent } from '@/components/QuoteCard';
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
import { SbCtaLink, type SbCtaLinkProps } from '@/components/Storyblok/SbCtaLink';
import { wysiwygClasses, type WysiwygClassesType } from '@/utilities/wysiwygClasses';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { getProcessedImage } from '@/utilities/getProcessedImage';

/**
 * "default" means using the inherited body font size as the base font size
 * "card" means using the card-paragraph style as the base font size (smaller than default)
 */
export type RichTextBaseFontSizeType = 'default' | 'card' | 'ood-small' | 'base23' | 'intro';
export type RichTextLinkColorType = 'default' | 'white';

export type RichTextProps = {
  wysiwyg: StoryblokRichtext;
  baseFontSize?: RichTextBaseFontSizeType;
  textColor?: TextColorType;
  linkColor?: RichTextLinkColorType;
  textAlign?: TextAlignType;
  className?: string;
};

export const RichText = ({
  wysiwyg,
  baseFontSize = 'default',
  textColor = 'black',
  linkColor = 'default',
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
      [MARK_TEXT_STYLE]: (children, { color }) => <>{children}</>,
      [MARK_LINK]: (children, props) => {
        const {
          href,
          target,
          linktype,
          anchor,
        } = props;
        /**
         * The data shape of the inline links in WYSIWYG is different form regular Storyblok link field.
         * Here we structure it to match the sbLink type so we can pass that into CtaLink component.
         */
        const sbLink = {
          linktype,
          cached_url: linktype === 'story' ? href : '',
          url: linktype === 'asset' || linktype === 'url' ? href : '',
          email: linktype === 'email' ? href : '',
          anchor: linktype === 'story' ? anchor : '',
          // The WYSIWYG inline links automatically add a target="_self" by default which is unnecessary
          target: target === '_blank' ? '_blank' : undefined,
          // Adding rel="noopener" for all eternal links that opens in new window/tab for security reasons
          rel: linktype === 'url' && target === '_blank' ? 'noopener' : undefined,
        } as SbLinkType;

        return (
          <CtaLink
            sbLink={sbLink}
            variant={linkColor === 'white' ? 'inline-white' : 'inline'}
            className="group *:inline"
          >
            {children}
          </CtaLink>
        );
      },
    },
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
      [NODE_QUOTE]: (children) => (
        <QuoteCardContent quoteText={children} quotationMarkColor="palo-verde-light" className="rs-p-3" />
      ),
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
    blokResolvers: {
      ['ctaLink']: (props) => (
        <SbCtaLink blok={props as SbCtaLinkProps['blok']} />
      ),
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
    >
      {rendered}
    </div>
  );
};
