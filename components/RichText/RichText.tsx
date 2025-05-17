import { render, type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { cnb } from 'cnbuilder';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import {
  Heading,
  Paragraph,
  textAligns,
  textColors,
  type TextColorType,
  type FontSizeType,
  type TextAlignType,
} from '@/components/Typography';

/**
 * "default" means using the default body font size (defined in TW base) as the base font size
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
      styled: (children, props) => (
        <span className={props.class}>{children}</span>
      ),
      bold: (children) => <strong>{children}</strong>,
      italic: (children) => <em>{children}</em>,
      link: (children, props) => {
        const {
          href,
          target,
          linktype,
          anchor,
          custom,
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
          anchor,
          // The WYSIWYG inline links automatically add a target="_self" by default which is unnecessary
          target: target === '_blank' ? '_blank' : undefined,
        };

        return (
          <SbLink
            link={sbLink}
            // variant={textColor === 'white' ? 'inline-white' : 'inline'}
            // className="*:inline"
            {...custom} // Custom link attributes
          >
            {children}
          </SbLink>
        );
      },
    },
    nodeResolvers: {
      heading: (children, props) => {
        const { level } = props;
        /**
         * For main content WYSIWYG, this gets you type-2 for h2, type-1 for h3
         * but h4, h5 and h6 would be type-0 (the minimum font size)
         */
        const headingSize = Math.max(5 - level, 0);

        return (
          <Heading as={`h${level}`} size={headingSize as FontSizeType} leading="tight">
            {children}
          </Heading>
        );
      },
      paragraph: (children) => (
        <Paragraph variant={baseFontSize === 'default' ? undefined : baseFontSize}>
          {children}
        </Paragraph>
      ),
    },
    defaultBlokResolver: (name) => (
      <Paragraph weight="bold" variant={baseFontSize === 'default' ? undefined : baseFontSize}>
        Missing blok resolver for blok type {name}.
      </Paragraph>
    ),
    defaultStringResolver: (str) => <div>{str}</div>,
  });

  return (
    <div
      className={cnb(
        'wysiwyg', // wysiwyg class from Decanter adds vertical rhythm and basic styles
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
