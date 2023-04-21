import { Message } from '../message';

const MESSAGE_ID: string = 'TOGGLE_EXTENSION_COMMAND';

/**
 * Command sent from popup.ts to background.ts to perform any setup/teardown associated with
 * toggling the extension.
 */
export class ToggleExtensionCommand extends Message {
  public static isToggleExtensionCommand(message: Message): message is ToggleExtensionCommand {
    return message.id === MESSAGE_ID;
  }

  constructor(public readonly newExtensionActiveState: boolean) {
    super();
  }

  public readonly id = MESSAGE_ID;
}
