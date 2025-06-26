import { Container, type ContainerProps } from '@/components/Container';
import { Heading, type FontSizeType, type HeadingType } from '@/components/Typography';
import * as styles from './Section.styles';

type SectionProps = ContainerProps & {
  // Header
  title?: string;
  intro?: React.ReactNode;
  srOnlyHeader?: boolean;
  isEdgeToEdgeHeader?: boolean;
  titleStyle?: styles.TitleStyleType[];
  tabColor?: string;
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
  tabColor,
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
      id={id}
      width="full"
      // className={styles.container}
      bgColor={bgColor}
      pt={pt}
      pb={pb}
    >
      {hasHeader && (
        <Container mb={3} as="header" width={isEdgeToEdgeHeader ? 'full' : 'site'}>
          {title && (
            <Heading
              as={headingLevel}
              //className={styles.title(headerStyles)}
              size={titleSize}
              srOnly={srOnlyHeader}
            >
              {title}
            </Heading>
          )}
          {intro && <div>{intro}</div>}
        </Container>
      )}
      <Container pt={!hasHeader ? 3 : undefined}>
        {children}
      </Container>
    </Container>
  );
};
