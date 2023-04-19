import { CreatedAtSortOrder, RequestSummaryQuery } from '../gql/graphql';
import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

type ILoadedSummary = Omit<RequestSummaryQuery['summary'], '__typename'>;
export interface ITooltipLoadedSummary {
  summary: ILoadedSummary;
  saved: boolean;
}

export interface IActiveTagFilter {
  tag: string;
  id: number;
}

export interface ILibraryPerspective {
  sortOrder: CreatedAtSortOrder;
  tagFilters: IActiveTagFilter[];
  page: number;
}

export interface ILibraryContext {
  summaries: ISummary[];
  setSummaries: (summaries: ISummary[]) => void;
  perspective: ILibraryPerspective;
  setPerspective: (
    newPerspective: ILibraryPerspective | ((oldPerspective: ILibraryPerspective) => ILibraryPerspective)
  ) => void;
}

export interface IAppContext {
  theme: AppThemeEnum;
  setTheme: (theme: AppThemeEnum) => void;
  extensionActive: boolean;
  tooltipOpen: boolean;
  setTooltipOpen: (open: boolean) => void;
  openTooltip: () => void;
  closeTooltip: () => void;
  highlightedText: string;
  setHighlightedText: (text: string) => void;
  setExtensionActive: (enabled: boolean) => void;
  hydrated: boolean;
  loadedTooltipSummary: ITooltipLoadedSummary;
  saveLoadedSummary: () => void;
  loadSummary: (summary: RequestSummaryQuery) => void;
  libraryContext: ILibraryContext;
}
