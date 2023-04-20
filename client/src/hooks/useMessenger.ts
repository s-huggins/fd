import { useEffect } from 'react';
import { Message } from '../common/messages/message';

export const useMessenger = <T extends Message>(
  messageHandler?: (message: T) => void,
  messageFilter?: (message: T) => boolean
) => {
  useEffect(() => {
    const messageCallback = (message: T) => {
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
