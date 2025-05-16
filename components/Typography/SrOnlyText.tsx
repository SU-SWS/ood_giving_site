import { Text, type TextProps } from './Text';

export const SrOnlyText = ({ as = 'span', children = '(link is external)' }: TextProps) => (
  <Text srOnly as={as} className="white-space-pre">{` ${children}`}</Text>
);
