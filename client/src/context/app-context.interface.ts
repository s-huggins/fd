import { RequestSummaryQuery } from '../gql/graphql';
import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

type ILoadedSummary = Omit<RequestSummaryQuery['summary'], '__typename'>;
export interface ITooltipLoadedSummary {
  summary: ILoadedSummary;
  saved: boolean;
}

export interface IAppContext {
  theme: AppThemeEnum;
  extensionActive: boolean;
  tooltipOpen: boolean;
  setTooltipOpen: (open: boolean) => void;
  openTooltip: () => void;
  closeTooltip: () => void;
  highlightedText: string;
  setHighlightedText: (text: string) => void;
  setExtensionActive: (enabled: boolean) => void;
  summaries: ISummary[];
  hydrated: boolean;
  loadedSummary: ITooltipLoadedSummary;
  saveLoadedSummary: () => void;
  loadSummary: (summary: RequestSummaryQuery) => void;
}
