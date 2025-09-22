import * as styles from './Container.styles';

export type ContainerElementType = 'div' | 'section' | 'article' | 'main' | 'footer' | 'aside' | 'header' | 'nav' | 'form' | 'fieldset' | 'figure' | 'figcaption';

export type WidthType = keyof typeof styles.widths;

export type BgColorType = keyof typeof styles.bgColors | '';
