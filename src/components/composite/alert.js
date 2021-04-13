import React, { useState } from 'react';
import RichTextField from '../../utilities/richTextField';
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
    'yellow': 'warning'
  };

  let classList = 'su-bg-foggy-light';

  let iconClass = 'fas fa-' + icon;
  if (icon === 'bell') {
    iconClass = 'far fa-bell';
  }

  if (color === 'green' || color === 'red' || color === 'blue') {
    classList = 'su-alert--text-light su-alert--' + colorsMapping[color];
  }
  else if (color === 'yellow') {
    classList = 'su-alert--' + colorsMapping[color];
  }

  const DefaultDismiss = (
    <button aria-label="Dismiss alert"
            className={'su-alert__dismiss-button su-button su-bg-transparent hocus:su-bg-transparent'}
            type="button"
            onClick={() => {setDismissed(true);
    }}>
      Dismiss
      <i className='fas fa-times-circle' />
    </button>
  );
  const dismissBtn = props.dismissBtn ?? DefaultDismiss;

  // Dismissed State.
  if (isDismissed === true) {
    return null;
  }

  return (
    <div className={'su-alert ' + classList}>
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
          <div className={'su-alert__text su-text-normal'}>
            <RichTextField data={text} />
          </div>
          {props.blok.cta && props.blok.ctaText &&
          <div className={'su-alert__footer'}>
            <SbLink link={props.blok.cta} classes={'su-link su-link--action'}>{props.blok.ctaText}</SbLink>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Alert;

// Prop Types.
Alert.propTypes = {
  hasDismiss: PropTypes.bool,
  dismissBtn: PropTypes.element,
  blok: PropTypes.object
};

// Default Props.
Alert.defaultProps = {
  hasDismiss: true
};
