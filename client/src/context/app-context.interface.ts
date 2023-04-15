import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

export interface IAppContext {
  theme: AppThemeEnum;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  summaries: ISummary[];
}
