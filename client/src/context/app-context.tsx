import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { RequestSummaryQuery } from '../gql/graphql';
import { EXTENSION_ENABLED_KEY } from '../storage/keys';
import { Storage } from '../storage/storage';
import { IAppContext, ITooltipLoadedSummary } from './app-context.interface';
import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

const DEFAULT_APP_CONTEXT: IAppContext = {
  theme: AppThemeEnum.Dark,
  setTheme: (theme: AppThemeEnum) => {},
  extensionActive: false,
  tooltipOpen: false,
  setTooltipOpen: (open: boolean) => {},
  openTooltip: () => {},
  closeTooltip: () => {},
  setExtensionActive: (active: boolean) => {},
  highlightedText: null,
  setHighlightedText: (text: string) => {},
  libraryContext: {
    summaries: [],
    setSummaries: (summaries: ISummary[]) => {}
  },
  hydrated: false,
  loadedTooltipSummary: {
    summary: null,
    saved: false
  },
  loadSummary: () => {},
  saveLoadedSummary: () => {}
};

export const AppContext = createContext(DEFAULT_APP_CONTEXT);

export const AppContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<AppThemeEnum>(DEFAULT_APP_CONTEXT.theme);
  const [active, setActive] = useState<boolean>(DEFAULT_APP_CONTEXT.extensionActive);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(DEFAULT_APP_CONTEXT.tooltipOpen);
  const [hydrated, setHydrated] = useState<boolean>(DEFAULT_APP_CONTEXT.hydrated);
  const [loadedSummary, setLoadedSummary] = useState<ITooltipLoadedSummary>(DEFAULT_APP_CONTEXT.loadedTooltipSummary);
  const [highlightedText, setHighlightedText] = useState<string>(DEFAULT_APP_CONTEXT.highlightedText);
  const [librarySummaries, setLibrarySummaries] = useState<ISummary[]>(DEFAULT_APP_CONTEXT.libraryContext.summaries);
  const setExtensionActive = (active: boolean) => {
    setActive(active);
    Storage.set(EXTENSION_ENABLED_KEY, active);
  };

  const loadSummary = (summaryQueryOutput: RequestSummaryQuery) => {
    setLoadedSummary({
      summary: summaryQueryOutput.summary,
      saved: false
    });
  };

  const saveLoadedSummary = () => {
    setLoadedSummary((loadedSummary: ITooltipLoadedSummary) => ({ ...loadedSummary, saved: true }));
  };

  const hydrateFromStorage = async () => {
    const extensionEnabled: boolean = await Storage.get(EXTENSION_ENABLED_KEY);
    setActive(extensionEnabled);
    setHydrated(true);
  };

  const openTooltip = (): void => {
    setTooltipOpen(true);
  };

  const closeTooltip = (): void => {
    setTooltipOpen(false);
  };

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  // TODO: add state setters
  // TODO: use redux pattern (useReducer)
  const context: IAppContext = {
    theme,
    setTheme,
    extensionActive: active,
    setExtensionActive,
    libraryContext: {
      setSummaries: setLibrarySummaries,
      summaries: librarySummaries
    },
    hydrated,
    loadedTooltipSummary: loadedSummary,
    loadSummary,
    saveLoadedSummary,
    highlightedText,
    setHighlightedText,
    tooltipOpen,
    setTooltipOpen,
    openTooltip,
    closeTooltip
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
