import { Text, type TypographyProps } from './Text';

type ParagraphProps = Omit<TypographyProps, 'as'> & React.HTMLAttributes<HTMLParagraphElement>;

// Convenience component for paragraphs
export const Paragraph = ({ mb = 'none', ...rest }: ParagraphProps) => (
  <Text {...rest} as="p" mb={mb} />
);
