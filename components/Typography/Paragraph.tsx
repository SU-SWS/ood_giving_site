import { Text, type TypographyProps } from './Text';

type ParagraphProps = Omit<TypographyProps, 'className'> & React.HTMLAttributes<HTMLParagraphElement> & {
  noMargin?: boolean; // If true, remove the bottom margin from base styles
};

// Convenience component for paragraphs
export const Paragraph = ({ noMargin, ...rest }: ParagraphProps) => (
  <Text {...rest} as="p" mb={noMargin ? 'none' : undefined} data-component="Paragraph" />
);
