import { HTMLAttributes } from 'react';
import { cnb } from 'cnbuilder';
import * as styles from './Container.styles';
import * as types from './Container.types';

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: types.ContainerElementType;
  width?: types.WidthType;
  bgColor?: types.BgColorType;
  style?: React.CSSProperties;
};

export const Container = ({
  as: AsComponent = 'div',
  width = 'site',
  bgColor,
  style,
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
      className,
    )}
  >
    {children}
  </AsComponent>
);
