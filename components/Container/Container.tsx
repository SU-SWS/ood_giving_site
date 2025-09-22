import { HTMLAttributes } from 'react';
import { cnb } from 'cnbuilder';
import {
  marginTops,
  marginBottoms,
  marginVerticals,
  paddingTops,
  paddingBottoms,
  paddingVerticals,
  type PaddingType,
  type MarginType,
} from '@/utilities/datasource';
import * as styles from './Container.styles';
import * as types from './Container.types';

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: types.ContainerElementType;
  mt?: MarginType;
  mb?: MarginType;
  my?: MarginType;
  pt?: PaddingType;
  pb?: PaddingType;
  py?: PaddingType;
  width?: types.WidthType;
  bgColor?: types.BgColorType;
  style?: React.CSSProperties;
};

export const Container = ({
  as: AsComponent = 'div',
  width = 'site',
  bgColor,
  style,
  mt,
  mb,
  my,
  pt,
  pb,
  py,
  className,
  children,
  ...props
}: ContainerProps) => (
  <AsComponent
    {...props}
    style={style}
    className={cnb(
      bgColor ? styles.bgColors[bgColor] : '',
      width ? styles.widths[width] : '',
      py ? paddingVerticals[py] : '',
      pt ? paddingTops[pt] : '',
      pb ? paddingBottoms[pb] : '',
      mt ? marginTops[mt] : '',
      mb ? marginBottoms[mb] : '',
      my ? marginVerticals[my] : '',
      className,
    )}
  >
    {children}
  </AsComponent>
);
