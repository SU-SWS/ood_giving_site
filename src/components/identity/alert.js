import React, { useState } from 'react'
import RichTextField from '../../utilities/richTextField'
import SbLink from '../partials/sbLink';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const [isDismissed, setDismissed] = useState(false);

  const color = props.blok.backgroundColor;
  const icon = props.blok.fontAwesomeIcon;
  const label = props.blok.label;
  const text = props.blok.alertBodyText;

  const colorsMapping = {
    'green': 'success',
    'red': 'error',
    'blue': 'info',
  };

  let classList = 'su-bg-foggy-light';
  let linkBlack = 'su-link-black-false';
  let textBlack = 'su-text-white';
  let hocus = 'hocus:su-text-white';

  let iconClass = 'fas fa-' + icon;
  if (icon === 'bell') {
    iconClass = 'far fa-bell';
  }

  if (color === 'green' || color === 'red' || color === 'blue') {
    classList = 'su-alert--text-light su-bg-digital-' + color + ' su-text-white su-link-white su-alert--' + colorsMapping[color];
  }
  else if (color === 'yellow') {
    classList = 'su-bg-illuminating-dark su-alert--warning';
    linkBlack = 'su-link-black-true';
    textBlack = 'su-text-black';
    hocus = 'hocus:su-text-black';
  }
  else if (color === 'light-grey') {
    linkBlack = 'su-link-black-true';
    textBlack = 'su-text-black';
    hocus = 'hocus:su-text-black';
  }

  const DefaultDismiss = (
    <button aria-label="Dismiss alert" className={"su-alert__dismiss-button su-button su-group su-leading-display su-bg-transparent hocus:su-bg-transparent su-p-0 su-flex su-items-center su-w-fit su-sans su-font-semibold su-text-17 su-uppercase su-font-bold su-inline-block su-tracking-widest su-mr-0 su-ml-auto " + textBlack + " " + hocus} type="button" onClick={() => { setDismissed(true); }}>
      Dismiss
      <i className="fas fa-times-circle"> </i>
    </button>
  );
  const dismissBtn = props.dismissBtn ?? DefaultDismiss;

  // Dismissed State.
  if (isDismissed === true) {
    return null;
  }

  return (
    <div className={"su-alert " + classList}>
      <div className="centered-container">
        {props.hasDismiss && (
          <div className="su-alert__dismiss">{dismissBtn}</div>
        )}
        <div className="su-alert__header">
          <span className="su-alert__icon">
            <i className={iconClass} />
          </span>
          <span className="su-alert__label">{label}</span>
        </div>
        <div className="su-alert__body">
          <div className={"su-alert__text su-text-normal " + linkBlack + " " + textBlack}>
            <RichTextField data={text} />
          </div>
          {props.blok.cta && props.blok.ctaText &&
            <div className={"su-alert__footer " + linkBlack + " " + textBlack}>
              <SbLink link={props.blok.cta} classes={'su-link su-link--action'}>{props.blok.ctaText}</SbLink>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default Alert

// Prop Types.
Alert.propTypes = {
  hasDismiss: PropTypes.bool
};

// Default Props.
Alert.defaultProps = {
  hasDismiss: true
};
