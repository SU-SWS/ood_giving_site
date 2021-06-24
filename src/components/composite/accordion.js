import React from "react";
import SbEditable from "storyblok-react";
import Components from "../components";
import Heading from "../partials/heading";

class Accordion extends React.Component {
  // Must build the things.
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };

    // Storage for the accordion items.
    this.accordionItems = [];

    // If there are neste accordion items we need to track them so we can call their handlers.
    if (this.props.blok.accordionItems !== undefined) {
      this.accordionItems = this.props.blok.accordionItems.map(
        (item, index) => {
          return React.createRef();
        }
      );
    }
  }

  // Expand all children accordion items.
  expandAll = () => {
    this.setState({ expanded: true });
    this.accordionItems.map((item) => {
      item.current.expand();
    });
  };

  // Collapse all children accordion items.
  collapseAll = () => {
    this.setState({ expanded: false });
    this.accordionItems.map((item) => {
      item.current.collapse();
    });
  };

  // Render method.
  render() {
    let props = this.props;

    let accordionBorderColor = "su-border-color-palo-alto-light";
    let accordionButtonColor = "ood-cta__button--secondary";
    let accordionAfterColor = "ood-accordion__button";
    let accordionFont = true;
    let accordionFontWeight = "bold";
    if (props.blok.accordionColor === "digital-red") {
      accordionBorderColor = "su-border-color-digital-red su-sans";
      accordionButtonColor = "ood-cta__button--secondary-digital-red";
      accordionAfterColor = "ood-accordion__button--digital-red";
      accordionFont = false;
      accordionFontWeight = "semibold";
    }

    return (
      <SbEditable content={props.blok}>
        <div
          className={`su-accordion
            ${
              props.blok.spacingTop !== "none"
                ? `su-pt-${props.blok.spacingTop}`
                : ""
            }
            ${
              props.blok.spacingBottom !== "none"
                ? `su-pb-${props.blok.spacingBottom}`
                : ""
            }`}
          {...(props.blok.id ? { id: props.blok.id } : {})}
        >
          {props.blok.title && (
            <Heading
              defaultLevel={"h3"}
              level={props.blok.headingLevel}
              serif={accordionFont}
              weight={accordionFontWeight}
              classes={"ood-accordion__heading"}
            >
              {props.blok.title}
            </Heading>
          )}
          {props.blok.accordionItems.length > 1 && (
            <>
              <button
                className={`su-accordion__collapse-all su-button ${accordionButtonColor}`}
                onClick={this.collapseAll}
              >
                Collapse all
              </button>
              <button
                className={`su-accordion__expand-all su-button ${accordionButtonColor}`}
                onClick={this.expandAll}
              >
                Expand all
              </button>
            </>
          )}
          <ul
            className={`su-accordion__list ood-accordion__list ${accordionBorderColor}`}
          >
            {props.blok.accordionItems &&
              props.blok.accordionItems.map((blok, index) =>
                React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok,
                  ref: this.accordionItems[index],
                  accordionBorderColor: accordionBorderColor,
                  accordionAfterColor: accordionAfterColor,
                  accordionFont: accordionFont,
                  accordionFontWeight: accordionFontWeight,
                })
              )}
          </ul>
        </div>
      </SbEditable>
    );
  }
}

export default Accordion;
