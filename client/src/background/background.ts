import { EXTENSION_ENABLED } from '../storage/keys';
import { Storage } from '../storage/storage';

chrome.runtime.onInstalled.addListener(async details => {
  await Storage.setIfNotExists(EXTENSION_ENABLED, false);
});
