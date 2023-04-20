import { OpenTooltipCommand } from '../common/messages/commands/open-tooltip-command';
import { ToggleExtensionCommand } from '../common/messages/commands/toggle-extension-command';
import { Message } from '../common/messages/message';
import { ExtensionStorage } from '../storage/extension-storage';
import { EXTENSION_ENABLED_KEY } from '../storage/keys';
import { FRONTDOOR_CONTEXT_MENU_ITEM_ID, toggleContextMenu } from './context-menu';

chrome.runtime.onInstalled.addListener(async details => {
  await ExtensionStorage.setIfNotExists(EXTENSION_ENABLED_KEY, false);
});

chrome.contextMenus.onClicked.addListener(async event => {
  if (event.menuItemId === FRONTDOOR_CONTEXT_MENU_ITEM_ID) {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab && event.selectionText) {
      chrome.tabs.sendMessage(activeTab.id, new OpenTooltipCommand(event.selectionText));
    }
  }
});

chrome.runtime.onMessage.addListener((message: Message) => {
  if (ToggleExtensionCommand.isToggleExtensionCommand(message)) {
    toggleExtension(message.newExtensionActiveState);
  }
});

function toggleExtension(setActive: boolean): void {
  toggleContextMenu(setActive);
}
