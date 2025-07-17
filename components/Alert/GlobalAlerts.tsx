'use client';

import { useContext } from 'react';
import { GlobalAlertsContext } from './GlobalAlertsContext';
import { Alert } from './Alert';

export const GlobalAlerts = () => {
  const {
    globalAlerts,
    dismissGlobalAlert,
  } = useContext(GlobalAlertsContext);

  return (
    <>
      {globalAlerts.map(({
        uuid,
        backgroundColor,
        fontAwesomeIcon,
        label,
        ctaText,
        cta,
        alertBodyText,
      }) => (
        <Alert
          key={uuid}
          bg={backgroundColor}
          icon={fontAwesomeIcon}
          label={label}
          ctaText={ctaText}
          cta={cta}
          bodyText={alertBodyText}
          onDismiss={() => dismissGlobalAlert(uuid)}
        />
      ))}
    </>
  );
};
