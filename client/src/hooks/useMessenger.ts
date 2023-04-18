import { useEffect } from 'react';
import { Message } from '../common/messages/message';

export const useMessenger = (
  messageHandler?: <T extends Message>(message: T) => void,
  messageFilter?: <T extends Message>(message: T) => boolean
) => {
  useEffect(() => {
    const messageCallback = <T extends Message>(message: T) => {
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

  const sendMessage = <T extends Message>(message: T) => {
    chrome.runtime.sendMessage(message);
  };

  return { sendMessage };
};
