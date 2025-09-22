import { FAIcon, type FAIconProps } from '@/components/FAIcon';
import { FlexBox, type FlexAlignItemsType } from '@/components/FlexBox';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { Text } from '@/components/Typography';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type CardBgColorType } from '@/utilities/datasource';
import * as styles from './IconCard.styles';

type IconCardProps = React.HTMLAttributes<HTMLDivElement> & FAIconProps & {
  headline: string;
  link: SbLinkType;
  backgroundColor?: CardBgColorType;
  contentAlign?: styles.ContentAlignType;
}

export const IconCard = ({
  icon,
  iconStyle,
  title,
  headline,
  link,
  backgroundColor,
  contentAlign = 'center',
}: IconCardProps) => {
  return (
    <FlexBox
      direction="col"
      alignItems={styles.align[contentAlign] as FlexAlignItemsType}
      pt={4}
      pb={5}
      className={styles.root(backgroundColor)}
    >
      <FAIcon icon={icon} iconStyle={iconStyle} title={title} size="2x" className={styles.icon(backgroundColor)} />
      <SbLink link={link} className={styles.link(backgroundColor)}>
        <Text
          as="span"
          size={2}
          weight="semibold"
          color={backgroundColor === 'white' ? 'black' : 'white'}
          mt={1}
          align={contentAlign}
          className="inline-block"
        >
          {headline}
        </Text>
      </SbLink>
    </FlexBox>
  );
};
