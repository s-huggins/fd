import { OpenTooltipCommand } from '../common/messages/commands/open-tooltip-command';
import { ToggleExtensionCommand } from '../common/messages/commands/toggle-extension-command';
import { ToggleThemeCommand } from '../common/messages/commands/toggle-theme-command';
import { toggleExtensionHandler } from '../common/messages/handlers/toggle-extension-handler';
import { noopStub as toggleThemeHandler } from '../common/messages/handlers/toggle-theme-handler';
import { Message } from '../common/messages/message';
import { AppThemeEnum } from '../context/app-theme.enum';
import { ExtensionStorage } from '../storage/extension-storage';
import { EXTENSION_ENABLED_KEY, EXTENSION_THEME_KEY } from '../storage/keys';
import { FRONTDOOR_CONTEXT_MENU_ITEM_ID } from './context-menu';

chrome.runtime.onInstalled.addListener(async () => {
  await ExtensionStorage.set(EXTENSION_ENABLED_KEY, false);
  await ExtensionStorage.set(EXTENSION_THEME_KEY, AppThemeEnum.Dark);
});

chrome.contextMenus.onClicked.addListener(async event => {
  if (event.menuItemId === FRONTDOOR_CONTEXT_MENU_ITEM_ID) {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab && event.selectionText) {
      chrome.tabs.sendMessage(activeTab.id, new OpenTooltipCommand(event.selectionText));
    }
  }
});

chrome.runtime.onMessage.addListener(async (message: Message) => {
  if (ToggleExtensionCommand.isToggleExtensionCommand(message)) {
    toggleExtensionHandler(message.newExtensionActiveState);
  } else if (ToggleThemeCommand.isToggleThemeCommand(message)) {
    toggleThemeHandler(message.newTheme);
  }
});
