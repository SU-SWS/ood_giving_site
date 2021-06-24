import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import Heading from "../partials/heading";

class AccordionItem extends React.Component {
  // This is required.
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  // On render, collapse all the items.
  componentDidMount() {
    this.setState({ expanded: false });
  }

  // Expand/Collapse toggle.
  toggle = () => {
    this.state.expanded ? this.collapse() : this.expand();
  };

  // Open the doors!
  expand = () => {
    this.setState({ expanded: true });
  };

  // Close the hatches!
  collapse = () => {
    this.setState({ expanded: false });
  };

  // RENDER!
  render() {
    let props = this.props;

    return (
      <SbEditable content={props.blok}>
        <li
          className={
            "su-accordion__item ood-accordion__item " +
            props.accordionBorderColor
          }
        >
          <Heading
            level={props.blok.headingLevel}
            defaultLevel={"h4"}
            serif={props.accordionFont}
            weight={props.accordionFontWeight}
            classes="su-accordion__title ood-accordion__title"
            {...(props.blok.id ? { id: props.blok.id } : {})}
          >
            <button
              className={"su-accordion__button " + props.accordionAfterColor}
              aria-expanded={this.state.expanded}
              onClick={this.toggle}
            >
              {props.blok.title}
            </button>
          </Heading>
          <div
            className="su-accordion__content ood-accordion__content"
            aria-hidden={!this.state.expanded}
          >
            <RichTextField data={props.blok.content} />
          </div>
        </li>
      </SbEditable>
    );
  }
}

export default AccordionItem;
