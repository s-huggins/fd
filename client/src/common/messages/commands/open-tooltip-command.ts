import { Message } from '../message';

const MESSAGE_ID: string = 'OPEN_TOOLTIP_COMMAND';

/**
 * Command sent from background.ts to contentScript.ts to open the Frontdoor tooltip.
 */
export class OpenTooltipCommand extends Message {
  public static isOpenTooltipCommand(message: Message): message is OpenTooltipCommand {
    return message.id === MESSAGE_ID;
  }

  constructor(public readonly selectionText: string) {
    super();
  }

  public readonly id = MESSAGE_ID;
}
