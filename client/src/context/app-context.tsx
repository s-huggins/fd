import React, { FC, createContext, useContext, useState } from 'react';
import { CreatedAtSortOrder, RequestSummaryQuery } from '../gql/graphql';
import { IAppContext, ILibraryPerspective, ITooltipLoadedSummary } from './app-context.interface';
import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

const DEFAULT_APP_CONTEXT: IAppContext = {
  theme: AppThemeEnum.Dark,
  setTheme: (theme: AppThemeEnum) => {},
  tooltipOpen: false,
  setTooltipOpen: (open: boolean) => {},
  openTooltip: () => {},
  closeTooltip: () => {},
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
  const [actionInFlight, setActionInFlight] = useState<boolean>(DEFAULT_APP_CONTEXT.actionInFlight);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(DEFAULT_APP_CONTEXT.tooltipOpen);
  const [loadedSummary, setLoadedSummary] = useState<ITooltipLoadedSummary>(DEFAULT_APP_CONTEXT.loadedTooltipSummary);
  const [highlightedText, setHighlightedText] = useState<string>(DEFAULT_APP_CONTEXT.highlightedText);
  const [librarySummaries, setLibrarySummaries] = useState<ISummary[]>(DEFAULT_APP_CONTEXT.libraryContext.summaries);
  const [libraryPerspective, setLibraryPerspective] = useState<ILibraryPerspective>(
    DEFAULT_APP_CONTEXT.libraryContext.perspective
  );

  const loadSummary = (summaryQueryOutput: RequestSummaryQuery) => {
    setLoadedSummary({
      summary: summaryQueryOutput.summary,
      saved: false
    });
  };

  const saveLoadedSummary = () => {
    setLoadedSummary((loadedSummary: ITooltipLoadedSummary) => ({ ...loadedSummary, saved: true }));
  };

  const openTooltip = (): void => {
    setTooltipOpen(true);
  };

  const closeTooltip = (): void => {
    setTooltipOpen(false);
  };

  // TODO: add state setters
  // TODO: use redux pattern (useReducer)
  const context: IAppContext = {
    theme,
    setTheme,
    actionInFlight,
    setActionInFlight,
    libraryContext: {
      setSummaries: setLibrarySummaries,
      summaries: librarySummaries,
      perspective: libraryPerspective,
      setPerspective: setLibraryPerspective
    },
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
