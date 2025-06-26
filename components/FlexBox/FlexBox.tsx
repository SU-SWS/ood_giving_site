import React, { ReactNode, HTMLAttributes, forwardRef } from 'react';
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
import { gridGaps, type GridGapType } from '@/components/Grid';
import * as styles from './FlexBox.styles';
import * as types from './FlexBox.types';

type FlexBoxProps = HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  direction?: types.FlexDirectionType;
  wrap?: types.FlexWrapType;
  gap?: GridGapType;
  justifyContent?: types.FlexJustifyContentType;
  alignContent?: types.FlexAlignContentType;
  alignItems?: types.FlexAlignItemsType;
  children?: ReactNode;
  mt?: MarginType;
  mb?: MarginType;
  my?: MarginType;
  pt?: PaddingType;
  pb?: PaddingType;
  py?: PaddingType;
};

export const FlexBox = forwardRef<HTMLElement, FlexBoxProps>(({
  as: AsComponent = 'div',
  direction,
  gap,
  wrap,
  justifyContent,
  alignContent,
  alignItems,
  mt,
  mb,
  my,
  pt,
  pb,
  py,
  children,
  className,
  ...props
}, ref) => (
  <AsComponent
    {...props}
    ref={ref}
    className={cnb(
      'flex',
      direction ? styles.flexDirection[direction] : '',
      wrap ? styles.flexWrap[wrap] : '',
      justifyContent ? styles.flexJustifyContent[justifyContent] : '',
      alignContent ? styles.flexAlignContent[alignContent] : '',
      alignItems ? styles.flexAlignItems[alignItems] : '',
      gap ? gridGaps[gap] : '',
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
));
