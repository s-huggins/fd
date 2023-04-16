import { TooltipRequestMessage } from '../common/messages/tooltip-request';
import { EXTENSION_ENABLED } from '../storage/keys';
import { Storage } from '../storage/storage';

chrome.runtime.onInstalled.addListener(async details => {
  await Storage.setIfNotExists(EXTENSION_ENABLED, false);

  chrome.contextMenus.create({
    title: 'Frontdoor "%s"',
    id: 'frontDoor',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async event => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (activeTab && event.selectionText) {
    chrome.tabs.sendMessage(activeTab.id, new TooltipRequestMessage(event.selectionText));
  }
});
