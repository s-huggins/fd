import React, { FC, createContext, useState } from 'react';
import { IAppContext } from './app-context.interface';
import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

const DEFAULT_APP_CONTEXT: IAppContext = {
  theme: AppThemeEnum.Light,
  enabled: false,
  setEnabled: (enabled: boolean) => {},
  summaries: []
};

export const AppContext = createContext(DEFAULT_APP_CONTEXT);

export const AppContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<AppThemeEnum>(DEFAULT_APP_CONTEXT.theme);
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_APP_CONTEXT.enabled);
  const [summaries, setSummaries] = useState<ISummary[]>(DEFAULT_APP_CONTEXT.summaries);

  // TODO: add state setters
  // TODO: use redux pattern (useReducer)
  const context: IAppContext = {
    theme,
    enabled,
    setEnabled: (enableExtension: boolean) => setEnabled(enableExtension),
    summaries
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
