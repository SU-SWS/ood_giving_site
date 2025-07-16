import { useState, useEffect, useRef } from 'react';
import { m } from 'motion/react';
import { CtaButton } from '@/components/Cta';
import { Container } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { type MarginType } from '@/utilities/datasource';
import { type HeadingType } from '@/components/Typography';
import { type SbAccordionItemsTypes } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Accordion.styles';

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  headingLevel?: HeadingType;
  items: SbAccordionItemsTypes[];
  id?: string;
  color?: styles.AccordionColorType;
  hideControls?: boolean;
  mt?: MarginType;
  mb?: MarginType;
}

export const Accordion = ({
  title,
  headingLevel = 'h2',
  items,
  id,
  color,
  hideControls,
  mt,
  mb,
  ...props
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<boolean[]>([]);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!items?.length) return;
    const initialState = items.map(item => item.defaultOpen);
    setOpenItems(initialState);
  }, [items]);

  const toggleItem = (index: number) => {
    setOpenItems(prevState => prevState.map((item, i) => i === index ? !item : item));
  };

  const allExpanded = openItems.every(item => item);
  const allCollapsed = openItems.every(item => !item);

  /**
   * Focus on first accordion item after expanding/collapsing all
   */
  const expandAll = () => {
    setOpenItems(items.map(() => true));
    firstItemRef.current?.focus();
  };

  const collapseAll = () => {
    setOpenItems(items.map(() => false));
    firstItemRef.current?.focus();
  };

  const showControls = !hideControls && items?.length > 1;

  return (
    <Container id={id} mt={mt} mb={mb} className={styles.root} {...props}>
      {title && <Heading size={3} as={headingLevel} className={styles.title}>{title}</Heading>}
      {showControls && (
        <FlexBox justifyContent="end" className={styles.controls}>
          <CtaButton
            disabled={allExpanded}
            variant="ghost"
            size="small"
            color={isDarkTheme ? 'white' : 'black'}
            icon="plus"
            iconProps={{ className: styles.expandAllIcon}}
            onClick={expandAll}
            className={styles.controlButton(isDarkTheme)}
          >
            Expand All
          </CtaButton>
          <CtaButton
            disabled={allCollapsed}
            variant="ghost"
            size="small"
            color={isDarkTheme ? 'white' : 'black'}
            icon="minus"
            iconProps={{ className: styles.collapseAllIcon}}
            onClick={collapseAll}
            className={styles.controlButton(isDarkTheme)}
          >
            Collapse All
          </CtaButton>
        </FlexBox>
      )}
      <ul className={styles.list}>
        {items?.map((item, index) => (
          <li key={item._uid} className={styles.listItem}>
            <Heading as={item.headingLevel || 'h3'} leading="tight" className={styles.itemHeading}>
              <CtaButton
                id={`button-${item._uid}`}
                ref={index === 0 ? firstItemRef : undefined}
                onClick={() => toggleItem(index)}
                variant="unset"
                color={isDarkTheme ? 'white' : 'black'}
                aria-expanded={openItems[index] || false}
                aria-controls={`content-${item._uid}`}
                className={styles.button}
              >
                <span aria-hidden="true" className={styles.bar} />
                {item.title}
                <HeroIcon icon={openItems[index] ? 'minus' : 'plus'} className={styles.circleIcon} />
              </CtaButton>
            </Heading>
            <m.div
              role="region"
              aria-labelledby={`button-${item._uid}`}
              id={`content-${item._uid}`}
              aria-hidden={!openItems[index]}
              animate={{
                height: openItems[index] ? 'auto' : 0,
                visibility: openItems[index] ? 'visible' : 'hidden',
              }}
              initial={false}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className={styles.contentWrapper}
            >
              {/* @ts-expect-error Reason: inert not fully support in React 18. Using '' sets it to true */}
              <div className={styles.richtextWrapper} {...(!openItems[index] ? { inert: '' } : {})}>
                {hasRichText(item.content) && (
                  <RichText
                    type="card"
                    textColor={isDarkTheme ? 'white' : 'black'}
                    linkColor={isDarkTheme ? 'digital-red-xlight' : 'unset'}
                    wysiwyg={item.content}
                    className={styles.richtext}
                  />
                )}
              </div>
            </m.div>
          </li>
        ))}
      </ul>
    </Container>
  );
};
