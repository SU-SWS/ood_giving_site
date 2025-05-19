import { render, type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { cnb } from 'cnbuilder';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import {
  Heading,
  Paragraph,
  textAligns,
  textColors,
  textVariants,
  type TextColorType,
  type FontSizeType,
  type TextAlignType,
} from '@/components/Typography';
import { wysiwygClasses, type WysiwygClassesType } from '@/utilities/wysiwygClasses';

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
      styled: (children, props) => {
        // Custom classes are string of class name(s) separated by spaces, e.g., 'ood-has-tab-before su-sans su-before-bg-bay-dark', 'su-bold'
        const { class: wysiwygCustomClasses } = props;
        // Split the class string into an array of classes separted by spaces
        const wysiwygClassArray = wysiwygCustomClasses.split(' ');
        // Trim any whitespace from the class names
        const trimmedClassArray = wysiwygClassArray.map((className) => className.trim());

        // Pass each class name in the trimmedClassArray and find the matching class in the wysiwygClasses object
        // At the end, join all the classes together into a single string
        const finalClassString = trimmedClassArray.map((className) => {
          // If a matching class name can't be found in the wysiwygClasses object, return the original class name
          return className in wysiwygClasses ? wysiwygClasses[className as WysiwygClassesType] : className;
        }).join(' ');

        return (
          <span className={finalClassString}>{children}</span>
        );
      },
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
      paragraph: (children) => (
        <Paragraph>{children}</Paragraph>
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
        baseFontSize !== 'default' && textVariants[baseFontSize],
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
