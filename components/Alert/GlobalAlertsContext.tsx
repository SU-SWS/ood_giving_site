'use client';

import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { type AlertContent } from '@/utilities/data';

type GlobalAlertsContextProps = {
  globalAlerts: AlertContent[];
  dismissGlobalAlert?: (uuid: string) => void;
};

/**
 * A context to hold global alerts.
 */
export const GlobalAlertsContext = createContext<GlobalAlertsContextProps>({
  globalAlerts: [],
  dismissGlobalAlert: () => null,
});
export const GlobalAlertsContextProvider = GlobalAlertsContext.Provider;

type GlobalAlertsProviderProps = {
  children: React.ReactElement;
  globalAlerts: AlertContent[];
};

/**
 * A provider to manage the state of global alerts.
 */
export function GlobalAlertsProvider({
  children,
  globalAlerts,
}: GlobalAlertsProviderProps) {
  const [dismissedGlobalAlerts, setDismissedGlobalAlerts] = useState<string[]>([]);

  const dismissGlobalAlert = useCallback((uuid: string) => {
    setDismissedGlobalAlerts((currentDismissedAlerts) => [...currentDismissedAlerts, uuid]);
  }, [setDismissedGlobalAlerts]);

  const shownGlobalAlerts = useMemo(() => (
    globalAlerts.filter((alert) => !dismissedGlobalAlerts.includes(alert.uuid))
  ), [globalAlerts, dismissedGlobalAlerts]);

  // Provider wrapper.
  return (
    <GlobalAlertsContextProvider
      value={{
        globalAlerts: shownGlobalAlerts,
        dismissGlobalAlert,
      }}
    >
      {children}
    </GlobalAlertsContextProvider>
  );
};
