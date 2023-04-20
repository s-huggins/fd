import { AppThemeEnum } from '../../../context/app-theme.enum';
import { ToggleThemeCommand } from '../commands/toggle-theme-command';

export function noopStub(newTheme: AppThemeEnum) {}

// TODO: get this working, errors currently with 'could not establish conn'
function toggleThemeHandler(newTheme: AppThemeEnum) {
  chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
    const message: ToggleThemeCommand = new ToggleThemeCommand(newTheme);
    for (let tabIndex = 0; tabIndex < tabs.length; ++tabIndex) {
      chrome.tabs.sendMessage(tabs[tabIndex].id, message);
    }
  });
}
