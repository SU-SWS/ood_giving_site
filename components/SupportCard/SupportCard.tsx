import { FAIcon, type FAIconProps } from '@/components/FAIcon';
import { FlexBox } from '@/components/FlexBox';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { SimpleCard, type SimpleCardProps } from '@/components/SimpleCard';
import { Text } from '@/components/Typography';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type AreasToSupportType } from '../Storyblok/SbSupportPage';
import * as styles from './SupportCard.styles';

type SupportCardProps = SimpleCardProps & FAIconProps & {
  taxonomy?: AreasToSupportType[];
  headline?: string;
  link?: SbLinkType;
};

export const SupportCard = ({
  taxonomy,
  headline,
  link,
  icon,
  iconStyle,
  bgColor = 'lagunita',
  ...props
}: SupportCardProps) => {
  const isDarkCardBg = bgColor !== 'white';
  const isExternalLink = link?.linktype !== 'story';

  return (
    <SimpleCard
      {...props}
      hasLink
      bgColor={bgColor}
      className={styles.root}
    >
      <FlexBox direction="col" alignItems="start" justifyContent="between" className={styles.wrapper}>
        <SbLink link={link} className={styles.link(bgColor)}>
          <Text
            as="span"
            size="f2"
            leading="display"
            weight="semibold"
            color={bgColor === 'white' ? 'black' : 'white'}
            icon={isExternalLink ? 'external' : undefined}
            iconProps={{
              className: styles.linkIcon,
              noBaseStyle: true,
              title: isExternalLink ? '(external link)' : undefined,
            }}
            className={styles.linkText}
          >
            {headline}
          </Text>
        </SbLink>
        <FAIcon icon={icon} iconStyle={iconStyle} size="3x" className={styles.icon(isDarkCardBg)} />
      </FlexBox>
    </SimpleCard>
  );
};
