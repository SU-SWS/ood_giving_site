import * as styles from './Grid.styles';

export type GridElementType = 'div' | 'section' | 'article' | 'main' | 'footer' | 'aside' | 'header' | 'nav' | 'form' | 'button' | 'fieldset' | 'ul' | 'ol' | 'li';

export type GridGapType = keyof typeof styles.gridGaps;

export type GridNumColsType = keyof typeof styles.gridNumCols.xs;

export type GridJustifyContentType = keyof typeof styles.gridJustifyContent;

export type GridJustifyItemsType = keyof typeof styles.gridJustifyItems;

export type GridAlignContentType = keyof typeof styles.gridAlignContent;

export type GridAlignItemsType = keyof typeof styles.gridAlignItems;

export type GridWidthType = keyof typeof styles.gridWidths;

export type GridNegativeSpacingType = keyof typeof styles.negativeSpacing;
