import { HTMLAttributes } from 'react';
import { cnb } from 'cnbuilder';
import {
  paddingTops, paddingBottoms, type PaddingType, marginTops, marginBottoms, type MarginType,
} from '@/utilities/datasource';
import * as styles from './Container.styles';
import * as types from './Container.types';

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: types.ContainerElementType;
  mt?: MarginType;
  mb?: MarginType;
  pt?: PaddingType;
  pb?: PaddingType;
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
  pt,
  pb,
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
      mt ? marginTops[mt] : '',
      mb ? marginBottoms[mb] : '',
      pt ? paddingTops[pt] : '',
      pb ? paddingBottoms[pb] : '',
      className,
    )}
  >
    {children}
  </AsComponent>
);
