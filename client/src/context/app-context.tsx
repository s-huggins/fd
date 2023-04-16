import React, { FC, createContext, useEffect, useState } from 'react';
import { EXTENSION_ENABLED } from '../storage/keys';
import { Storage } from '../storage/storage';
import { IAppContext } from './app-context.interface';
import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

const DEFAULT_APP_CONTEXT: IAppContext = {
  theme: AppThemeEnum.Light,
  extensionActive: false,
  setExtensionActive: (active: boolean) => {},
  summaries: [],
  hydrated: false
};

export const AppContext = createContext(DEFAULT_APP_CONTEXT);

export const AppContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<AppThemeEnum>(DEFAULT_APP_CONTEXT.theme);
  const [active, setActive] = useState<boolean>(DEFAULT_APP_CONTEXT.extensionActive);
  const [hydrated, setHydrated] = useState<boolean>(DEFAULT_APP_CONTEXT.hydrated);
  const [summaries, setSummaries] = useState<ISummary[]>(DEFAULT_APP_CONTEXT.summaries);

  const setExtensionActive = (active: boolean) => {
    setActive(active);
    Storage.set(EXTENSION_ENABLED, active);
  };

  const hydrateFromStorage = async () => {
    // await Storage.setIfNotExists(EXTENSION_ENABLED, false);
    const extensionEnabled: boolean = await Storage.get(EXTENSION_ENABLED);
    setActive(extensionEnabled);
    setHydrated(true);
  };

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  // TODO: add state setters
  // TODO: use redux pattern (useReducer)
  const context: IAppContext = {
    theme,
    extensionActive: active,
    setExtensionActive,
    summaries,
    hydrated
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
