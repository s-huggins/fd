import { AppThemeEnum } from '../../../context/app-theme.enum';
import { Message } from '../message';

const MESSAGE_ID: string = 'TOGGLE_THEME_COMMAND';

export class ToggleThemeCommand extends Message {
  public static isToggleThemeCommand(message: Message): message is ToggleThemeCommand {
    return message.id === MESSAGE_ID;
  }

  constructor(public readonly newTheme: AppThemeEnum) {
    super();
  }

  public readonly id = MESSAGE_ID;
}
