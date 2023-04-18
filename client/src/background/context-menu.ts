export const FRONTDOOR_CONTEXT_MENU_ITEM_ID: string = 'frontdoor';

function createContextMenu(): void {
  chrome.contextMenus.create({
    title: 'Frontdoor "%s"',
    id: FRONTDOOR_CONTEXT_MENU_ITEM_ID,
    contexts: ['selection']
  });
}

function removeContextMenu(): void {
  chrome.contextMenus.remove(FRONTDOOR_CONTEXT_MENU_ITEM_ID);
}

export function toggleContextMenu(setActive: boolean): void {
  if (setActive) {
    createContextMenu();
  } else {
    removeContextMenu();
  }
}
