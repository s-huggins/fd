import { AppThemeEnum } from './app-theme.enum';
import { ISummary } from './summary.interface';

export interface IAppContext {
  theme: AppThemeEnum;
  extensionActive: boolean;
  setExtensionActive: (enabled: boolean) => void;
  summaries: ISummary[];
  hydrated: boolean;
}
