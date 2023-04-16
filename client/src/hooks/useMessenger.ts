import { useEffect } from 'react';
import { Message } from '../common/messages/message';

export const useMessenger = (
  messageHandler: (message: Message) => void,
  messageFilter?: (message: Message) => boolean
) => {
  useEffect(() => {
    const messageCallback = (message: Message) => {
      if (!messageFilter || messageFilter(message)) {
        messageHandler(message);
      }
    };
    chrome.runtime.onMessage.addListener(messageCallback);
    return () => chrome.runtime.onMessage.removeListener(messageCallback);
  }, []);
};
