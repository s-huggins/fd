import { useEffect } from 'react';
import { Message } from '../common/messages/message';
import { TooltipRequestMessage } from '../common/messages/tooltip-request';

export const useMessenger = (
  messageHandler: (message: Message) => void,
  messageFilter?: (message: Message) => boolean
) => {
  useEffect(() => {
    console.log('using effect...');
    const messageCallback = (message: Message) => {
      console.log(message);
      console.log(TooltipRequestMessage.isTooltipRequestMessage(message));
      if (!messageFilter || messageFilter(message)) {
        messageHandler(message);
      }
    };
    chrome.runtime.onMessage.addListener(messageCallback);
    return () => chrome.runtime.onMessage.removeListener(messageCallback);
  }, []);
};
