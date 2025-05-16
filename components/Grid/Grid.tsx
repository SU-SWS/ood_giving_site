import React, { HTMLAttributes } from 'react';
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
import * as styles from './Grid.styles';
import * as types from './Grid.types';

export type GridProps = HTMLAttributes<HTMLElement> & {
  as?: types.GridElementType;
  isList?: boolean;
  gap?: types.GridGapType;
  rtl?: boolean;
  xs?: types.GridNumColsType;
  sm?: types.GridNumColsType;
  md?: types.GridNumColsType;
  lg?: types.GridNumColsType;
  xl?: types.GridNumColsType;
  xxl?: types.GridNumColsType;
  justifyContent?: types.GridJustifyContentType,
  justifyItems?: types.GridJustifyItemsType,
  alignContent?: types.GridAlignContentType,
  alignItems?: types.GridAlignItemsType,
  mt?: MarginType;
  mb?: MarginType;
  my?: MarginType;
  pt?: PaddingType;
  pb?: PaddingType;
  py?: PaddingType;
};

export const Grid = ({
  isList,
  as: AsComponent = isList ? 'ul' : 'div',
  gap,
  rtl,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  justifyContent,
  justifyItems,
  alignContent,
  alignItems,
  mt,
  mb,
  my,
  pt,
  pb,
  py,
  className,
  children,
  ...props
}: GridProps) => (
  <AsComponent
    {...props}
    className={cnb(
      'grid',
      gap ? styles.gridGaps[gap] : '',
      rtl ? styles.rtl : '',
      xs ? styles.gridNumCols.xs[xs] : '',
      sm ? styles.gridNumCols.sm[sm] : '',
      md ? styles.gridNumCols.md[md] : '',
      lg ? styles.gridNumCols.lg[lg] : '',
      xl ? styles.gridNumCols.xl[xl] : '',
      xxl ? styles.gridNumCols.xxl[xxl] : '',
      justifyContent ? styles.gridJustifyContent[justifyContent] : '',
      justifyItems ? styles.gridJustifyItems[justifyItems] : '',
      alignContent ? styles.gridAlignContent[alignContent] : '',
      alignItems ? styles.gridAlignItems[alignItems] : '',
      py ? paddingVerticals[py] : '',
      pt ? paddingTops[pt] : '',
      pb ? paddingBottoms[pb] : '',
      mt ? marginTops[mt] : '',
      mb ? marginBottoms[mb] : '',
      my ? marginVerticals[my] : '',
      isList ? 'list-unstyled *:mb-0' : '',
      className,
    )}
  >
    {children}
  </AsComponent>
);
