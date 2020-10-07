import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'

class AccordionItem extends React.Component {

  // This is required.
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  // On render, collapse all the items.
  componentDidMount() {
    this.setState({expanded: false});
  }

  // Expand/Collapse toggle.
  toggle = () => {
    this.state.expanded ? this.collapse() : this.expand();
  }

  // Open the doors!
  expand = () => {
    this.setState({ expanded: true });
  }

  // Close the hatches!
  collapse = () => {
    this.setState({ expanded: false });
  }

  // RENDER!
  render() {
    let Heading = this.props.blok.headingLevel ? this.props.blok.headingLevel : "h4";
    let props = this.props;

    return (
      <SbEditable content={props.blok}>
        <li className="su-accordion__item ood-accordion__item su-border-color-palo-alto-light">
          <Heading className={`su-accordion__title ood-accordion__title su-serif`}>
            <button className="su-accordion__button ood-accordion__button" aria-expanded={this.state.expanded} onClick={this.toggle}>{props.blok.title}</button>
          </Heading>
          <div className="su-accordion__content ood-accordion__content" aria-hidden={!this.state.expanded}>
            <RichTextField data={props.blok.content}/>
          </div>
        </li>
      </SbEditable>
    )
  }
}

export default AccordionItem
