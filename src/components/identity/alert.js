import React from 'react'
import RichTextField from '../../utilities/richTextField'

const Alert = (props) => {
  const [closed, setState] = React.useState(false);

  const color = props.blok.backgroundColor;
  const icon = props.blok.fontAwesomeIcon;
  const label = props.blok.label;
  const text = props.blok.alertBodyText;
  const link = props.blok.ctaLink[0];

  const dismissSVGPath = 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z';

  const colorsMapping = {
    'green': 'success',
    'red': 'error',
    'blue': 'info',
  };

  let classList = 'su-bg-foggy-light';
  let linkBlack = '';
  let textBlack = '';
  let hocus = 'hocus:su-text-white';

  let iconClass = 'fas fa-' + icon;
  if (icon === 'bell') {
    iconClass = 'far fa-bell';
  }

  if (color === 'green' || color === 'red' || color === 'blue') {
    classList = 'su-alert--text-light su-bg-digital-' + color + ' su-text-white su-link-white su-alert--' + colorsMapping[color];
  }
  if (color === 'yellow') {
    classList = 'su-bg-illuminating-dark su-alert--warning';
    linkBlack = 'su-link-black-true';
    textBlack = 'su-text-black';
    hocus = 'hocus:su-text-black';
  }
  if (color === 'light-grey') {
    linkBlack = 'su-link-black-true';
    textBlack = 'su-text-black';
    hocus = 'hocus:su-text-black';
  }

  function alertFooter() {
    if (link && link.link) {
      return <div className="su-alert__footer">
        <a href={link.link.url} className="su-link su-link--action">
          {link.linkText ? link.linkText : link.link.url}
        </a>
      </div>;
    }

    return '';
  }

  return (
    <div className={"su-alert " + classList + (closed ? " closed" : "")}>
      <div className="centered-container su-cc su-flex su-flex-wrap su-rs-py-1 sm:su-items-center">
        <div className="su-alert__dismiss su-order-3 su-rs-ml-1 su-mt-15 sm:su-mt-0 su-items-center su-flex-shrink su-text-right su-w-full sm:su-w-auto">
          <button
            className={"su-button su-group su-leading-display su-bg-transparent hocus:su-bg-transparent su-p-0 su-flex su-items-center su-w-fit su-sans su-font-semibold su-text-17 su-uppercase su-font-bold su-inline-block su-tracking-widest su-mr-0 su-ml-auto " + textBlack + " " + hocus}
            type="button"
            onClick={()=>{setState(!closed)}}
          >
            Dismiss
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="su-ml-02em"
            >
              <path fillRule="evenodd" d={dismissSVGPath} clipRule="evenodd"> </path>
            </svg>
          </button>
        </div>
        <div className="su-alert__header">
          <span className="su-alert__icon">
            <i className={iconClass}> </i>
          </span>
          <span className="su-alert__label">{label}</span>
        </div>
        <div className="su-alert__body su-order-2 su-flex-1 su-flex-grow">
          <div className={"su-text-normal hover:su-link-no-underline " + linkBlack + " " + textBlack}>
            <RichTextField data={text}/>
          </div>
          {alertFooter()}
        </div>
      </div>
    </div>
  )
};

export default Alert
