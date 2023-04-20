import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { CreatedAtSortOrder, RequestSummaryQuery } from '../gql/graphql';
import { EXTENSION_ENABLED_KEY } from '../storage/keys';
import { Storage } from '../storage/storage';
import { IAppContext, ILibraryPerspective, ITooltipLoadedSummary } from './app-context.interface';
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
  actionInFlight: false,
  setActionInFlight: (actionInFlight: boolean) => {},
  libraryContext: {
    summaries: [],
    setSummaries: (summaries: ISummary[]) => {},
    perspective: {
      sortOrder: CreatedAtSortOrder.NewestFirst,
      tagFilters: [],
      page: 1
    },
    setPerspective: (newPerspective: ILibraryPerspective) => {}
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
  const [frontdoorEnabled, setFrontdoorEnabled] = useState<boolean>(DEFAULT_APP_CONTEXT.extensionActive);
  const [actionInFlight, setActionInFlight] = useState<boolean>(DEFAULT_APP_CONTEXT.actionInFlight);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(DEFAULT_APP_CONTEXT.tooltipOpen);
  const [hydrated, setHydrated] = useState<boolean>(DEFAULT_APP_CONTEXT.hydrated);
  const [loadedSummary, setLoadedSummary] = useState<ITooltipLoadedSummary>(DEFAULT_APP_CONTEXT.loadedTooltipSummary);
  const [highlightedText, setHighlightedText] = useState<string>(DEFAULT_APP_CONTEXT.highlightedText);
  const [librarySummaries, setLibrarySummaries] = useState<ISummary[]>(DEFAULT_APP_CONTEXT.libraryContext.summaries);
  const [libraryPerspective, setLibraryPerspective] = useState<ILibraryPerspective>(
    DEFAULT_APP_CONTEXT.libraryContext.perspective
  );

  const setExtensionActive = (active: boolean) => {
    setFrontdoorEnabled(active);
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
    setFrontdoorEnabled(extensionEnabled);
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
    extensionActive: frontdoorEnabled,
    setExtensionActive,
    actionInFlight,
    setActionInFlight,
    libraryContext: {
      setSummaries: setLibrarySummaries,
      summaries: librarySummaries,
      perspective: libraryPerspective,
      setPerspective: setLibraryPerspective
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
