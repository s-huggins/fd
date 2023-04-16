import { Message } from './message';

const MESSAGE_ID: string = 'TOOLTIP_REQUEST';

export class TooltipRequestMessage extends Message {
  public static isTooltipRequestMessage(message: Message): message is TooltipRequestMessage {
    return message.id === MESSAGE_ID;
  }

  constructor(public readonly selectionText: string) {
    super();
  }

  public readonly id = MESSAGE_ID;
}
