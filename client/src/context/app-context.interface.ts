import { CreatedAtSortOrder, RequestSummaryQuery } from '../gql/graphql';
import { ISummary } from './summary.interface';

type ILoadedSummary = Omit<RequestSummaryQuery['summary'], '__typename'>;

// state for the summary shown in the tooltip
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
  // shows/hides loading bar
  actionInFlight: boolean;
  setActionInFlight: (inFlight: boolean) => void;
  tooltipOpen: boolean;
  setTooltipOpen: (open: boolean) => void;
  openTooltip: () => void;
  closeTooltip: () => void;
  highlightedText: string;
  setHighlightedText: (text: string) => void;
  loadedTooltipSummary: ITooltipLoadedSummary;
  saveLoadedSummary: () => void;
  loadSummary: (summary: RequestSummaryQuery) => void;
  libraryContext: ILibraryContext;
}
