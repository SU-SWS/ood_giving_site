import { Text, type TextProps } from './Text';

export const SrOnlyText = ({ children = '(link is external)' }: TextProps) => (
  <Text as="span" srOnly className="white-space-pre" data-component="SrOnlyText">{` ${children}`}</Text>
);
