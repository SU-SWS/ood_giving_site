import { Container, type ContainerProps } from '@/components/Container';
import { Heading, type FontSizeType, type HeadingType } from '@/components/Typography';
import { type DarkBeforeColorType } from '@/utilities/datasource';
import * as styles from './Section.styles';

type SectionProps = ContainerProps & {
  // Header
  title?: string;
  intro?: React.ReactNode;
  srOnlyHeader?: boolean;
  isEdgeToEdgeHeader?: boolean;
  titleStyle?: styles.TitleStyleType[];
  tabColor?: DarkBeforeColorType;
  titleSize?: FontSizeType;
  headingLevel?: HeadingType;
  // Campaign page only header options
  isCenterAlignHeader?: boolean;
  isSansSemiboldTitle?: boolean;
  // Content
  contentWidth?: styles.SectionContentWidthType;
};

export const Section = ({
  title,
  intro,
  srOnlyHeader,
  isEdgeToEdgeHeader,
  titleStyle = [],
  tabColor = 'cardinal-red',
  titleSize = 'f4',
  headingLevel = 'h2',
  isCenterAlignHeader,
  isSansSemiboldTitle,
  children,
  contentWidth = 'edge-to-edge',
  id,
  bgColor = 'white',
  pt,
  pb,
  ...props
}: SectionProps) => {
  const hasHeader = !!title || !!intro;

  return (
    <Container
      {...props}
      as={title ? 'section' : 'div'}
      id={id}
      width="full"
      // className={styles.container}
      bgColor={bgColor}
      pt={pt}
      pb={pb}
    >
      {hasHeader && (
        <Container mb={3} as="header" width={isEdgeToEdgeHeader ? 'full' : 'site'} className={srOnlyHeader && 'sr-only'}>
          {title && (
            <Heading
              as={headingLevel}
              srOnly={srOnlyHeader}
              className={styles.title(titleStyle, tabColor)}
              size={titleSize}
              align={isCenterAlignHeader ? 'center' : undefined}
            >
              {title}
            </Heading>
          )}
          {intro && <div className={srOnlyHeader && 'sr-only'}>{intro}</div>}
        </Container>
      )}
      <Container pt={!hasHeader ? 3 : undefined}>
        {children}
      </Container>
    </Container>
  );
};
