'use client';
import { useState, useEffect, useRef } from 'react';
import * as m from 'motion/react-m';
import { CtaButton } from '@/components/Cta';
import { Container } from '@/components/Container';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { Heading } from '@/components/Typography';
import { RichText } from '@/components/RichText';
import { hasRichText } from '@/utilities/hasRichText';
import { type PaddingType } from '@/utilities/datasource';
import { type HeadingType } from '@/components/Typography';
import { type SbAccordionItemsTypes } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Accordion.styles';

/**
 * We do not use HeadlessUI Disclosure here because it does not work well with
 * adding the expand/collapse all functionality
 */
type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  headingLevel?: HeadingType;
  items: SbAccordionItemsTypes[];
  id?: string;
  color?: styles.AccordionColorType;
  hideControls?: boolean;
  pt?: PaddingType;
  pb?: PaddingType;
}

export const Accordion = ({
  title,
  headingLevel = 'h2',
  items,
  id,
  color,
  hideControls,
  pt,
  pb,
  ...props
}: AccordionProps) => {
  const isDigitalRed = color === 'digital-red';
  const buttonStyle = isDigitalRed ? 'secondary-digital-red' : 'secondary-palo-alto-light';
  const font = isDigitalRed ? 'sans' : 'serif';
  const fontWeight = isDigitalRed ? 'semibold' : 'bold';

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
    <Container id={id} pt={pt} pb={pb} className={styles.root} {...props}>
      {title &&
        <Heading size={3} font={font} weight={fontWeight} as={headingLevel} className={styles.title}>{title}</Heading>
      }
      {showControls && (
        <FlexBox justifyContent="end" className={styles.controls}>
          <CtaButton
            isButton
            disabled={allExpanded}
            buttonStyle={buttonStyle}
            buttonSize="small"
            icon="plus"
            iconProps={{ className: styles.expandAllIcon }}
            onClick={expandAll}
          >
            Expand All
          </CtaButton>
          <CtaButton
            isButton
            disabled={allCollapsed}
            buttonStyle={buttonStyle}
            buttonSize="small"
            icon="minus"
            iconProps={{ className: styles.collapseAllIcon }}
            onClick={collapseAll}
          >
            Collapse All
          </CtaButton>
        </FlexBox>
      )}
      <ul className={styles.list}>
        {items?.map((item, index) => (
          <li key={item._uid} className={styles.listItem(color)}>
            <Heading as={item.headingLevel || 'h3'} font={font} weight={fontWeight} leading="tight" className={styles.itemHeading}>
              <button
                type="button"
                id={`button-${item._uid}`}
                ref={index === 0 ? firstItemRef : undefined}
                onClick={() => toggleItem(index)}
                aria-expanded={openItems[index] || false}
                aria-controls={`content-${item._uid}`}
                className={styles.button}
              >
                <span aria-hidden="true" className={styles.bar} />
                {item.title}
                <HeroIcon icon={openItems[index] ? 'minus' : 'plus'} noBaseStyle className={styles.circleIcon(color)} />
              </button>
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
              <div className={styles.richtextWrapper} inert={!openItems[index]}>
                {hasRichText(item.content) && (
                  <RichText
                    wysiwyg={item.content}
                    baseFontSize="base23"
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
