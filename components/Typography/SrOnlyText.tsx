import { Text, type TextProps } from './Text';

export const SrOnlyText = ({ children = '(link is external)' }: TextProps) => (
  <Text srOnly className="white-space-pre">{` ${children}`}</Text>
);
