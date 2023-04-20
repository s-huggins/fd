import { toggleContextMenu } from '../../../background/context-menu';

export function toggleExtensionHandler(setActive: boolean): void {
  toggleContextMenu(setActive);
}
