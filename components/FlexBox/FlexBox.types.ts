import * as styles from './FlexBox.styles';

export type FlexElementType = 'div' | 'section' | 'article' | 'main' | 'footer' | 'aside' | 'header' | 'nav' | 'form' | 'button' | 'fieldset' | 'ul' | 'ol' | 'li' | 'span';

export type FlexDirectionType = keyof typeof styles.flexDirection;

export type FlexWrapType = keyof typeof styles.flexWrap;

export type FlexJustifyContentType = keyof typeof styles.flexJustifyContent;

export type FlexAlignContentType = keyof typeof styles.flexAlignContent;

export type FlexAlignItemsType = keyof typeof styles.flexAlignItems;
