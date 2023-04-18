import { Message } from '../message';

const MESSAGE_ID: string = 'TOGGLE_EXTENSION_COMMAND';

export class ToggleExtensionCommand extends Message {
  public static isToggleExtensionCommand(message: Message): message is ToggleExtensionCommand {
    return message.id === MESSAGE_ID;
  }

  constructor(public readonly newExtensionActiveState: boolean) {
    super();
  }

  public readonly id = MESSAGE_ID;
}
