import { useEffect } from 'react';
import { Message } from '../common/messages/message';

/**
 * Hook to obtain the app messaging system.
 * This hook can be used to
 *    1. subscribe to and react to messages,
 *    2. dispatch messages to background.ts
 * @param messageHandler Handler to react to a message
 * @param messageFilter Filter callback to select messages to run the handler against
 * @returns The messenger function to dispatch messages.
 */
export const useMessenger = <T extends Message>(
  messageHandler?: (message: T) => void,
  messageFilter?: (message: T) => boolean
) => {
  useEffect(() => {
    const messageCallback = (message: T) => {
      // run message handler if this message passes the filter
      if (!messageFilter || messageFilter(message)) {
        messageHandler(message);
      }
    };
    if (messageHandler) {
      chrome.runtime.onMessage.addListener(messageCallback);
    }
    return () => {
      if (messageHandler) {
        chrome.runtime.onMessage.removeListener(messageCallback);
      }
    };
  }, []);

  const sendMessage = (message: T) => {
    chrome.runtime.sendMessage(message);
  };

  return { sendMessage };
};
